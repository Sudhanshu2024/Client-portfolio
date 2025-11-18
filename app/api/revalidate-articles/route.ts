import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/directus';

export async function POST(request: NextRequest) {
  try {
    let body: { slug?: string; secret?: string } = {};
    
    try {
      body = await request.json();
    } catch {
     
    }

   
    revalidatePath('/blog');
  
    if (body.slug) {
      revalidatePath(`/blog/${body.slug}`);
      return NextResponse.json({ 
        revalidated: true, 
        message: `Blog post "${body.slug}" and listing page revalidated successfully`,
        timestamp: new Date().toISOString()
      });
    }

   
    try {
      const posts = await getBlogPosts();
      const revalidatedPaths: string[] = ['/blog'];
      
      if (Array.isArray(posts)) {
        posts.forEach((post) => {
          if (post?.slug) {
            revalidatePath(`/blog/${post.slug}`);
            revalidatedPaths.push(`/blog/${post.slug}`);
          }
        });
      }
      
      return NextResponse.json({ 
        revalidated: true, 
        message: 'All blog pages revalidated successfully',
        paths: revalidatedPaths,
        count: revalidatedPaths.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      
      revalidatePath('/blog/[slug]', 'page');
      return NextResponse.json({ 
        revalidated: true, 
        message: 'Blog listing page revalidated (could not fetch individual posts)',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error revalidating blog pages:', error);
    return NextResponse.json(
      { 
        message: 'Error revalidating blog pages',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}


export async function GET() {
  return NextResponse.json({
    message: 'Use POST to revalidate blog pages',
    endpoint: '/api/revalidate-articles',
    docs: 'https://nextjs.org/docs/app/guides/incremental-static-regeneration#on-demand-revalidation-with-revalidatepath'
  });
}


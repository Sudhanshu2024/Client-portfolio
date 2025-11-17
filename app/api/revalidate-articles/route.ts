import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/directus';

/**
 * On-demand ISR endpoint for revalidating blog pages.
 * 
 * This endpoint invalidates the cache for:
 * - /blog (blog listing page)
 * - /blog/[slug] (individual blog post pages)
 * 
 * Usage:
 * POST /api/revalidate-articles
 * 
 * Optional body parameters:
 * - slug: Revalidate a specific blog post (e.g., { "slug": "my-post" })
 * - secret: Secret token for authentication (set REVALIDATE_SECRET env var)
 * 
 * Reference: https://nextjs.org/docs/app/guides/incremental-static-regeneration#on-demand-revalidation-with-revalidatepath
 */
export async function POST(request: NextRequest) {
  try {
    let body: { slug?: string; secret?: string } = {};
    
    try {
      body = await request.json();
    } catch {
      // Body is optional
    }

    // Optional: Validate secret token for security
    // Uncomment and set REVALIDATE_SECRET in your environment variables
    // const secret = body.secret || request.headers.get('x-revalidate-secret');
    // if (secret !== process.env.REVALIDATE_SECRET) {
    //   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    // }

    // Always revalidate the blog listing page
    revalidatePath('/blog');
    
    // If a specific slug is provided, revalidate that post
    if (body.slug) {
      revalidatePath(`/blog/${body.slug}`);
      return NextResponse.json({ 
        revalidated: true, 
        message: `Blog post "${body.slug}" and listing page revalidated successfully`,
        timestamp: new Date().toISOString()
      });
    }

    // Otherwise, revalidate all blog post pages
    // Fetch all blog posts to revalidate each individual path
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
      // If fetching posts fails, still revalidate the listing page
      // and use the pattern for dynamic routes
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

// Optional: Allow GET requests for easy testing (remove in production)
export async function GET() {
  return NextResponse.json({
    message: 'Use POST to revalidate blog pages',
    endpoint: '/api/revalidate-articles',
    docs: 'https://nextjs.org/docs/app/guides/incremental-static-regeneration#on-demand-revalidation-with-revalidatepath'
  });
}


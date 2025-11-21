import { getBlogPost, getBlogPosts } from '@/lib/directus';
import BlogContent from './BlogContent';
import { notFound } from 'next/navigation';
import BlogGrid from '@/components/BlogGrid';
import type { Metadata } from 'next';


const baseUrl = 'https://parth-k.vercel.app';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Parth Koshti';
const authorName = 'Parth Koshti';
const publisherName = 'Parth Koshti';

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = post.preview || `Read ${post.title} on ${siteName}`;
  
  
  const keywords = Array.isArray(post.tags) && post.tags.length > 0
    ? post.tags.map((tag: unknown) => String(tag))
    : ['blog', 'web development', 'technology', 'programming'];

 
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  const publishedTime = post.date_published 
    ? new Date(post.date_published).toISOString()
    : undefined;

  return {
    title: post.title,
    description: description,
    keywords: keywords,
    authors: [{ name: authorName }],
    publisher: publisherName,
    robots: {
      index: true,
      follow: true,
      
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,

    },
    openGraph: {
      title: post.title,
      description: description,
      url: postUrl,
      siteName: siteName,
      type: 'article',
      locale: 'en_US',
      publishedTime: publishedTime,
      authors: [authorName],
      images: post.thumbnail ? [
        {
          url: post.thumbnail,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
    alternates: {
      canonical: postUrl,
    },
   
    other: {
      'article:published_time': publishedTime || '',
      'article:author': authorName,
      ...(Array.isArray(post.tags) && post.tags.length > 0 && {
        'article:tag': post.tags.map((tag: unknown) => String(tag)).join(', '),
      }),
    },
  };
}


export const dynamic = "force-static";


export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
 
  const { slug } = await props.params;


  const post = await getBlogPost(slug);
  const allPosts = await getBlogPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background py-16">
      <BlogContent post={post} />

      {/* Related posts */}
      <div className="mt-16">
        <BlogGrid
          posts={related}
          title="More thoughts."
          showViewAll
          maxPosts={2}
          columnsClass="grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
          viewAllHref="/blog"
          viewAllText="Read all"
        />
      </div>
    </main>
  );
}

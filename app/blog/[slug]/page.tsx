import { getBlogPost, getBlogPosts } from '@/lib/directus';
import BlogContent from './BlogContent';
import { notFound } from 'next/navigation';
import BlogGrid from '@/components/BlogGrid';

// ISR: Blog posts change periodically, revalidate every 60 seconds
export const revalidate = 60;

// Force static generation for all blog post slugs
export const dynamic = "force-static";

// Pre-generate all blog post pages at build time
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  // ✅ Unwrap the params promise FIRST
  const { slug } = await props.params;

  // ✅ Now use slug safely
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

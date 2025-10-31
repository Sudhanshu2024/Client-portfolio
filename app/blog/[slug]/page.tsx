import { getBlogPost, getBlogPosts } from '@/lib/directus';
import BlogContent from './BlogContent';
import { notFound } from 'next/navigation';
import BlogGrid from '@/components/BlogGrid';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  const allPosts = await getBlogPosts();
  const related = allPosts.filter(p => p.slug !== params.slug).slice(0, 2);

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

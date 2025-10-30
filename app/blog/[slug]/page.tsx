import { getBlogPost } from '@/lib/directus';
import BlogContent from './BlogContent';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background py-16">
      <BlogContent post={post} />
    </main>
  );
}

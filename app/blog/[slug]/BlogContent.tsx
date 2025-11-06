// app/blog/[slug]/BlogContent.tsx
// SERVER COMPONENT

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { BlogAnimation } from './BlogAnimation';
import { markdownToHtml } from '@/lib/markdown';

export default async function BlogContent({ post }: { post: any }) {
  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/blog"
          className={cn(
            'inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300',
            'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
          )}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  // ✅ Convert MARKDOWN → HTML here
  const html = await markdownToHtml(post.body || "");

  return (
    <BlogAnimation>
      <article className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {post.date_published
                ? format(new Date(post.date_published), 'MMMM dd, yyyy')
                : 'No date'}
            </div>

            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.thumbnail && (
          <div className="mb-12">
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* ✅ Actual Markdown-rendered Content */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20"
          dangerouslySetInnerHTML={{ __html: html }}
        />

      </article>
    </BlogAnimation>
  );
}

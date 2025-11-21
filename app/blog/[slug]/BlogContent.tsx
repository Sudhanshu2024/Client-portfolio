import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { BlogAnimation } from './BlogAnimation';
import { RenderMDX } from "@/lib/mdx";

// Sanitize content to prevent MDX parsing errors
function sanitizeContent(content: string): string {
  if (!content) return '';

  // Replace problematic patterns that break MDX
  return content
    .replace(/\s<(\d+)/g, ' &lt;$1')
    .replace(/(\d+)>\s/g, '$1&gt; ')
    .replace(/<(\/?[a-zA-Z][a-zA-Z0-9]*)/g, '<$1')
    .replace(/\[([^\]]+)$/gm, '\\[$1')
    .replace(/^([^\[]+)\]/gm, '$1\\]');
}

export default async function BlogContent({ post }: { post: any }) {
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-3">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center text-sm hover:underline"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Sanitize the content before rendering
  const sanitizedBody = sanitizeContent(post.body || '');

  return (
    <BlogAnimation>
      <article className="min-h-screen py-12 sm:py-16 md:py-20">
        {/* Narrow content container */}
        <div className="max-w-2xl mx-auto px-6 sm:px-8">

          {/* Back Button */}
          <div className="mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Subtitle/Preview if available */}
            {post.preview && (
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed">
                {post.preview}
              </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {post.date_published && (
                <time dateTime={post.date_published}>
                  {format(new Date(post.date_published), 'MMMM d, yyyy')}
                </time>
              )}

              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <>
                  <span>·</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.thumbnail && (
            <div className="mb-12 -mx-6 sm:-mx-8">
              <div className="relative w-full aspect-video rounded-none sm:rounded-lg overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Content with improved code styles */}
          <div className={`prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-base prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-foreground prose-a:underline prose-a:decoration-muted-foreground 
            prose-a:underline-offset-4 hover:prose-a:decoration-foreground prose-a:transition-colors
            prose-strong:font-semibold prose-strong:text-foreground
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:my-2
            prose-blockquote:border-l-2 prose-blockquote:border-border 
            prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
            prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 
            prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-img:rounded-lg prose-img:my-8 prose-hr:border-border prose-hr:my-8
            prose-code:bg-gray-100 prose-code:text-gray-800 dark:prose-code:bg-gray-800 dark:prose-code:text-gray-100
            prose-pre:bg-gray-100 prose-pre:text-gray-800 dark:prose-pre:bg-gray-800 dark:prose-pre:text-gray-100
          `}
          >
            {sanitizedBody ? (
              <RenderMDX source={sanitizedBody} />
            ) : (
              <p className="text-muted-foreground">No content available.</p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </BlogAnimation>
  );
}

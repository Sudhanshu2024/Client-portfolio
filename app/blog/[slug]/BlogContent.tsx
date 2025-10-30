// app/blog/[slug]/BlogContent.tsx
// SERVER COMPONENT - Remove 'use client'

import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { BlogAnimation } from './BlogAnimation';

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
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {post.date_published
                ? format(new Date(post.date_published), 'MMMM dd, yyyy')
                : 'No date'}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              5 min read
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Your Name
            </div>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.preview}
          </p>
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

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {post.body ? (
            <MDXRemote
              source={post.body}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          ) : (
            <p>No content available.</p>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </BlogAnimation>
  );
}
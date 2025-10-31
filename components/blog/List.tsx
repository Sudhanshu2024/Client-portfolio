'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { BlogPost } from '@/lib/directus';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const params = useSearchParams();
  const tag = params.get('tag');

  const filtered = tag
    ? posts.filter(p => Array.isArray(p.tags) && p.tags.includes(tag))
    : posts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filtered.map((post) => (
        <article key={post.id} className="group bg-card rounded-xl overflow-hidden border border-border card-hover">
          <Link href={`/blog/${post.slug || post.id}`}>
            {/* Optional image */}
            {post.thumbnail ? (
              <div className="relative h-48">
                <Image src={post.thumbnail} alt={post.title} fill className="object-cover" />
              </div>
            ) : (
              <div className="h-2 bg-foreground w-24 ml-6 mt-6 rounded" />
            )}

            <div className="p-6">
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(post.date_published), 'MMM dd, yyyy')}
              </div>
              <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-foreground transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3">{post.preview}</p>
              <div className="mt-4 inline-flex items-center text-foreground font-medium group-hover:translate-x-1 transition-transform">
                Read More
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

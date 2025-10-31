'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { BlogPost } from '@/lib/directus';

interface BlogGridProps {
  posts: BlogPost[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  maxPosts?: number;
  viewAllHref?: string;
  viewAllText?: string;
  columnsClass?: string; // override grid columns
}

export default function BlogGrid({
  posts,
  title = "Latest Blog Posts",
  subtitle,
  showViewAll = true,
  maxPosts = 6,
  viewAllHref = "/blog",
  viewAllText = "View All Posts",
  columnsClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}: BlogGridProps) {
  const displayedPosts = posts.slice(0, maxPosts);

  return (
    <section className="section-padding bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-2">{title}</h2>
          {subtitle && (
            <p className="text-base text-muted-foreground">{subtitle}</p>
          )}
        </motion.div>

        <div className={`grid ${columnsClass} gap-8 items-stretch`}>
          {displayedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="card-hover bg-card rounded-xl overflow-hidden border border-border h-full flex flex-col min-h-[320px]">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.thumbnail || '/api/placeholder/400/250'}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(post.date_published), 'MMM dd, yyyy')}
                    </div>
                    <h3 className="text-xl font-semibold mb-0 line-clamp-2 group-hover:text-foreground transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href={viewAllHref} className="inline-flex items-center text-foreground hover:opacity-80">
              {viewAllText}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

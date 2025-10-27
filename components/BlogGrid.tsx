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
  showViewAll?: boolean;
  maxPosts?: number;
}

export default function BlogGrid({ 
  posts, 
  title = "Latest Blog Posts",
  showViewAll = true,
  maxPosts = 6
}: BlogGridProps) {
  const displayedPosts = posts.slice(0, maxPosts);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, design, and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="card-hover bg-card rounded-xl overflow-hidden shadow-md border border-border">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.thumbnail || '/api/placeholder/400/250'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(post.date_created), 'MMM dd, yyyy')}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {showViewAll && posts.length > maxPosts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className={cn(
                "inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              )}
            >
              View All Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

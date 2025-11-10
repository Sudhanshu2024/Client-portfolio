import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { getBlogPosts } from '@/lib/directus';
import BlogTagFilter from '@/components/blog/TagFilter';
import { cn } from '@/lib/utils';

const FALLBACK_BLOG_POSTS: any[] = [];

async function BlogGrid({ selectedTag }: { selectedTag?: string }) {
  let blogPosts = FALLBACK_BLOG_POSTS;
  
  try {
    const directusPosts = await getBlogPosts();
    if (directusPosts.length > 0) {
      blogPosts = directusPosts;
    }
  } catch (error) {
    console.log('Using fallback blog posts');
  }

  const filteredPosts = selectedTag && selectedTag !== 'all'
    ? blogPosts.filter((p: any) => Array.isArray(p.tags) && p.tags.includes(selectedTag))
    : blogPosts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPosts.map((post) => (
        <article key={post.id} className="group h-full">
          <Link href={`/blog/${post.slug}`}>
            <div className="card-hover flex h-full flex-col bg-card rounded-xl overflow-hidden shadow-md border border-border">
              {/* Image */}
              {post.thumbnail && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(post.date_published), 'MMM dd, yyyy')}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{post.preview}</p>
                
                <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform mt-auto">
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

async function BlogTagBar() {
  const posts = await getBlogPosts();
  const tags = Array.from(new Set(posts.flatMap((p: any) => Array.isArray(p.tags) ? p.tags : []))).sort();
  return (
    <section className="bg-background pt-4 pb-8">
      <div className="container">
        <BlogTagFilter tags={tags} />
      </div>
    </section>
  );
}

export default async function BlogPage({ searchParams }: { searchParams?: Promise<{ tag?: string }> }) {
  const params = await searchParams;
  const selectedTag = params?.tag;
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-accent/20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                My <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Thoughts, tutorials, and insights about web development, design, and technology. 
                Join me on my journey of continuous learning and sharing knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Tag Filter at top */}
        <Suspense>
          {/* no heavy fallback needed here */}
          <BlogTagBar />
        </Suspense>

        {/* Blog Posts Grid */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl overflow-hidden shadow-md">
                    <div className="h-48 bg-muted animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-4 bg-muted rounded w-24 mb-3 animate-pulse"></div>
                      <div className="h-6 bg-muted rounded w-full mb-3 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-4 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            }>
              <BlogGrid selectedTag={selectedTag} />
            </Suspense>
          </div>
        </section>

        {/* Newsletter Section */}
        {/* <section className="section-padding bg-background">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Stay Updated
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to my newsletter to get notified about new posts and updates. 
                No spam, just quality content delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium transition-all duration-300",
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  )}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}

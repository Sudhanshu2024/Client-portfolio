import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { getBlogPosts } from '@/lib/directus';
import BlogTagFilter from '@/components/blog/TagFilter';
import BlogList from '@/components/blog/List';

async function BlogSection() {
  const posts = await getBlogPosts();
  const allTags = Array.from(
    new Set(posts.flatMap(p => Array.isArray(p.tags) ? p.tags : []))
  ).sort();
  return (
    <section className="section-padding bg-muted/30">
      <div className="container space-y-8">
        <BlogTagFilter tags={allTags} />
        <BlogList posts={posts} />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero 
          name="Your Name"
          title="Full Stack Developer"
          description="I create beautiful, functional, and user-centered digital experiences that bring ideas to life."
          ctaText="Read the Blog"
          ctaLink="/blog"
          secondaryCtaText="Hire Me"
          secondaryCtaLink="/hire"
        />
        
        <Suspense fallback={
          <section className="section-padding bg-muted/30">
            <div className="container">
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded w-96 mx-auto mb-8"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-card rounded-xl overflow-hidden shadow-md">
                        <div className="h-48 bg-muted"></div>
                        <div className="p-6">
                          <div className="h-4 bg-muted rounded w-24 mb-3"></div>
                          <div className="h-6 bg-muted rounded w-full mb-3"></div>
                          <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                          <div className="h-4 bg-muted rounded w-20"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        }>
          <BlogSection />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

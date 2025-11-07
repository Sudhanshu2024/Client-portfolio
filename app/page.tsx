import { Suspense } from 'react';
import Hero from '@/components/Hero';
import { getBlogPosts, getAssetUrl } from '@/lib/directus';
import HomeIntro from '@/components/HomeIntro';
import BlogList from '@/components/blog/List';
import BlogGrid from '@/components/BlogGrid';

async function BlogSection() {
  const posts = (await getBlogPosts()).slice(0, 4);
  return (
    <>
      <BlogGrid
        posts={posts}
        title="Thoughts"
        subtitle="Some of them."
        showViewAll={true}
        maxPosts={4}
        columnsClass="grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
        viewAllHref="/blog"
        viewAllText="Read all"
      />
    </>
  );
}

export default async function HomePage() {
  const heroImage = getAssetUrl('1a90cbf3-aa45-49c6-abc8-3cd748fe436a');
  return (
    <div className="min-h-screen">
      <main>
        <Hero 
          name="Parth Koshti"
          title=""
          description="Welcome to my Personal space on the Internet."
          ctaText="Read the Blog"
          ctaLink="/blog"
          secondaryCtaText="Hire Me"
          secondaryCtaLink="/hire"
          imageUrl={heroImage}
        />

        {/* Intro section below Hero */}
        <HomeIntro />
        
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
    </div>
  );
}

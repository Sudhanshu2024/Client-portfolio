import { Suspense } from 'react';
import Hero from '@/components/Hero';
import { getBlogPosts, getAssetUrl } from '@/lib/directus';
import HomeIntro from '@/components/HomeIntro';
import BlogList from '@/components/blog/List';
import BlogGrid from '@/components/BlogGrid';
import type { Metadata } from 'next';


export const revalidate = 60;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio';
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Personal portfolio showcasing projects and blog posts';

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  keywords: ['portfolio', 'web development', 'nextjs', 'react', 'typescript', 'developer', 'programming'],
  authors: [{ name: 'Parth Koshti' }],
  creator: 'Parth Koshti',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: siteName,
    description: siteDescription,
    siteName: siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
  },
  alternates: {
    canonical: baseUrl,
  },
};

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

import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BlogGrid from '@/components/BlogGrid';
import ProjectCarousel from '@/components/ProjectCarousel';
import Footer from '@/components/Footer';
import { getBlogPosts, getProjects } from '@/lib/directus';
import { sampleBlogPosts, sampleProjects } from '@/lib/sample-data';

// Fallback data for when Directus is not available
const FALLBACK_BLOG_POSTS = sampleBlogPosts;
const FALLBACK_PROJECTS = sampleProjects;

async function BlogSection() {
  let blogPosts = FALLBACK_BLOG_POSTS;
  
  try {
    const directusPosts = await getBlogPosts();
    if (directusPosts.length > 0) {
      blogPosts = directusPosts;
    }
  } catch (error) {
    console.log('Using fallback blog posts');
  }

  return <BlogGrid posts={blogPosts} maxPosts={6} />;
}

async function ProjectsSection() {
  let projects = FALLBACK_PROJECTS;
  
  try {
    const directusProjects = await getProjects();
    if (directusProjects.length > 0) {
      projects = directusProjects;
    }
  } catch (error) {
    console.log('Using fallback projects');
  }

  return <ProjectCarousel projects={projects} />;
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
          ctaText="View Projects"
          ctaLink="/projects"
          secondaryCtaText="Read Blog"
          secondaryCtaLink="/blog"
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
        
        <Suspense fallback={
          <section className="section-padding bg-background">
            <div className="container">
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded w-96 mx-auto mb-16"></div>
                  <div className="h-96 bg-muted rounded-2xl"></div>
                </div>
              </div>
            </div>
          </section>
        }>
          <ProjectsSection />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

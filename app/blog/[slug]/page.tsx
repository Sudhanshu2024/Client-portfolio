import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBlogPost, getBlogPosts } from '@/lib/directus';
import { sampleBlogPosts } from '@/lib/sample-data';
import { cn } from '@/lib/utils';

const FALLBACK_BLOG_POSTS = sampleBlogPosts;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function BlogPostContent({ slug }: { slug: string }) {
  let post = null;
  
  try {
    post = await getBlogPost(slug);
  } catch (error) {
    console.log('Error fetching blog post, using fallback');
  }

  // If no post found from Directus, try to find in fallback data
  if (!post) {
    post = FALLBACK_BLOG_POSTS.find(p => p.slug === slug) || null;
  }

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
            "inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          )}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Blog
        </Link>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {format(new Date(post.date_created), 'MMMM dd, yyyy')}
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
          {post.description}
        </p>
      </motion.header>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
          <Image
            src={post.thumbnail || '/api/placeholder/800/400'}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="prose prose-lg max-w-none"
      >
        <div className="text-muted-foreground leading-relaxed space-y-6">
          <p>
            {post.content || `This is a sample blog post content. In a real implementation, 
            this would be the actual content fetched from your Directus CMS. The content 
            would be stored as rich text or markdown and rendered appropriately.`}
          </p>
          
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modern web development requires understanding multiple technologies</li>
            <li>User experience should be at the center of every design decision</li>
            <li>Continuous learning is essential in the fast-paced tech industry</li>
            <li>Collaboration and communication skills are as important as technical skills</li>
          </ul>
          
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 pt-8 border-t border-border"
      >
        <h3 className="text-lg font-semibold mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['Web Development', 'Next.js', 'React', 'TypeScript', 'Tutorial'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </article>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          <Suspense fallback={
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-24 mb-8"></div>
                <div className="h-12 bg-muted rounded w-full mb-6"></div>
                <div className="h-4 bg-muted rounded w-32 mb-8"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-8"></div>
                <div className="h-64 bg-muted rounded-2xl mb-12"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            </div>
          }>
            <BlogPostContent slug={params.slug} />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

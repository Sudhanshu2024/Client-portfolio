import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, ExternalLink, Github, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProject, getProjects } from '@/lib/directus';
import { sampleProjects } from '@/lib/sample-data';
import { cn } from '@/lib/utils';

const FALLBACK_PROJECTS = sampleProjects;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

async function ProjectContent({ slug }: { slug: string }) {
  let project = null;
  
  try {
    project = await getProject(slug);
  } catch (error) {
    console.log('Error fetching project, using fallback');
  }

  // If no project found from Directus, try to find in fallback data
  if (!project) {
    project = FALLBACK_PROJECTS.find(p => p.slug === slug) || null;
  }

  if (!project) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/projects"
          className={cn(
            "inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          )}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-6xl mx-auto">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link
          href="/projects"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Projects
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
          {project.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {format(new Date(project.date_created), 'MMMM dd, yyyy')}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Completed Project
          </div>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
                "bg-background border border-border hover:bg-accent hover:text-accent-foreground",
                "shadow-md hover:shadow-lg hover:-translate-y-0.5"
              )}
            >
              <Github className="mr-2 w-4 h-4" />
              View Code
            </a>
          )}
          
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              )}
            >
              <ExternalLink className="mr-2 w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
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
            src={project.image || '/api/placeholder/800/400'}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Project Details */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">About This Project</h2>
            <div className="text-muted-foreground leading-relaxed space-y-6">
              <p>
                {project.content || `This is a sample project description. In a real implementation, 
                this would be the actual project content fetched from your Directus CMS. The content 
                would include detailed information about the project, challenges faced, solutions 
                implemented, and lessons learned.`}
              </p>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Responsive design that works on all devices</li>
                <li>Modern user interface with smooth animations</li>
                <li>Optimized performance and loading times</li>
                <li>Accessibility features for better user experience</li>
                <li>Scalable architecture for future enhancements</li>
              </ul>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">Challenges & Solutions</h3>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Technologies */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <h3 className="text-xl font-semibold mb-4">Project Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium">Completed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">3 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Team Size</span>
                <span className="font-medium">Solo Project</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">Web Application</span>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <h3 className="text-xl font-semibold mb-4">Related Projects</h3>
            <div className="space-y-3">
              {FALLBACK_PROJECTS.slice(0, 3).map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.slug}`}
                  className="block p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <h4 className="font-medium mb-1">{relatedProject.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedProject.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          <Suspense fallback={
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-24 mb-8"></div>
                <div className="h-12 bg-muted rounded w-full mb-6"></div>
                <div className="h-4 bg-muted rounded w-32 mb-8"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-8"></div>
                <div className="h-64 bg-muted rounded-2xl mb-12"></div>
                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                  <div className="space-y-8">
                    <div className="h-32 bg-muted rounded-xl"></div>
                    <div className="h-40 bg-muted rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          }>
            <ProjectContent slug={params.slug} />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

'use client';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProjects } from '@/lib/directus';
import { sampleProjects } from '@/lib/sample-data';
import { cn } from '@/lib/utils';

const FALLBACK_PROJECTS = sampleProjects;

async function ProjectsGrid() {
  let projects = FALLBACK_PROJECTS;
  
  try {
    const directusProjects = await getProjects();
    if (directusProjects.length > 0) {
      projects = directusProjects;
    }
  } catch (error) {
    console.log('Using fallback projects');
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.article
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="card-hover bg-card rounded-xl overflow-hidden shadow-md border border-border">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image || '/api/placeholder/400/250'}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Overlay Actions */}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    aria-label="View GitHub repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-blue-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(project.date_created), 'MMM dd, yyyy')}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
              
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform"
              >
                View Project
                <ExternalLink className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-accent/20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                My <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A collection of projects that showcase my skills and passion for creating 
                innovative digital solutions. Each project represents a unique challenge 
                and learning opportunity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
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
                      <div className="flex gap-2 mb-4">
                        <div className="h-6 bg-muted rounded w-16 animate-pulse"></div>
                        <div className="h-6 bg-muted rounded w-20 animate-pulse"></div>
                      </div>
                      <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            }>
              <ProjectsGrid />
            </Suspense>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-background">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Interested in Working Together?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                I'm always excited to take on new challenges and collaborate on interesting projects. 
                Let's discuss how we can bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/about"
                  className={cn(
                    "inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-all duration-300",
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  )}
                >
                  Learn More About Me
                </Link>
                <a
                  href="mailto:your@email.com"
                  className={cn(
                    "inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-all duration-300",
                    "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
                    "shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  )}
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

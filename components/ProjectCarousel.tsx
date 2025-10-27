'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project } from '@/lib/directus';

interface ProjectCarouselProps {
  projects: Project[];
  title?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ProjectCarousel({
  projects,
  title = "Featured Projects",
  autoPlay = true,
  autoPlayInterval = 5000
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, projects.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
    setIsPlaying(false); // Stop auto-play when user interacts
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
    setIsPlaying(false); // Stop auto-play when user interacts
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false); // Stop auto-play when user interacts
  };

  if (projects.length === 0) {
    return (
      <section className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-muted-foreground">No projects available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background">
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
            A showcase of my recent work and side projects.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="relative h-full">
                  <Image
                    src={projects[currentIndex].image || '/api/placeholder/800/500'}
                    alt={projects[currentIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Project Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-2xl">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        {projects[currentIndex].title}
                      </h3>
                      <p className="text-lg text-gray-200 mb-6 line-clamp-3">
                        {projects[currentIndex].description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {projects[currentIndex].technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <Link
                          href={`/projects/${projects[currentIndex].slug}`}
                          className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                          View Project
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Link>
                        
                        {projects[currentIndex].github_url && (
                          <a
                            href={projects[currentIndex].github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-black/50 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-black/70 transition-colors"
                          >
                            <Github className="mr-2 w-4 h-4" />
                            GitHub
                          </a>
                        )}
                        
                        {projects[currentIndex].live_url && (
                          <a
                            href={projects[currentIndex].live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            Live Demo
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {projects.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {projects.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Play/Pause Button */}
          {projects.length > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

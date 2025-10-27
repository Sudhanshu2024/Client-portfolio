'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  name?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function Hero({
  name = "Your Name",
  title = "Full Stack Developer",
  description = "I create beautiful, functional, and user-centered digital experiences that bring ideas to life.",
  ctaText = "View Projects",
  ctaLink = "/projects",
  secondaryCtaText = "Download CV",
  secondaryCtaLink = "/cv.pdf"
}: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Hi, I'm{' '}
                <span className="gradient-text">{name}</span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground"
              >
                {title}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={ctaLink}
                className={cn(
                  "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                  "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                )}
              >
                {ctaText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              
              <Link
                href={secondaryCtaLink}
                className={cn(
                  "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
                  "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
                  "shadow-md hover:shadow-lg hover:-translate-y-0.5"
                )}
              >
                <Download className="mr-2 w-4 h-4" />
                {secondaryCtaText}
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              {/* Placeholder for profile image or illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">
                    {name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 right-10 w-16 h-16 bg-blue-500/30 rounded-lg backdrop-blur-sm"
              />
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-10 left-10 w-12 h-12 bg-purple-500/30 rounded-full backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

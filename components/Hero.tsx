'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
  imageUrl?: string | null;
}

export default function Hero({
  name = "Your Name",
  title = "Full Stack Developer",
  description = "I create beautiful, functional, and user-centered digital experiences that bring ideas to life.",
  ctaText = "View Projects",
  ctaLink = "/projects",
  secondaryCtaText = "Download CV",
  secondaryCtaLink = "/cv.pdf",
  imageUrl,
}: HeroProps) {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-background pt-20 sm:pt-20 md:pt-24 pb-12 sm:pb-12 md:pb-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8 flex flex-col justify-center"
          >
            <div className="space-y-3 md:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight"
              >
                Hi, I'm {name}
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-muted-foreground"
              >
                {title}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href={ctaLink}
                className={cn(
                  "inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-md font-medium transition-colors text-sm sm:text-base",
                  "border border-border bg-background text-foreground hover:bg-accent"
                )}
              >
                {ctaText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              
              <Link
                href={secondaryCtaLink}
                className={cn(
                  "inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-md font-medium transition-colors text-sm sm:text-base",
                  "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <Download className="mr-2 w-4 h-4" />
                {secondaryCtaText}
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex items-center justify-center"
          >
            {imageUrl ? (
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-border">
                <Image src={imageUrl} alt={name} fill className="object-cover" />
              </div>
            ) : (
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-dashed border-border bg-muted/20" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
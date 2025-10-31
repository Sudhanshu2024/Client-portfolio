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
    <section className="min-h-[80vh] flex items-center justify-center bg-background">
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
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
              >
                Hi, I'm {name}
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-medium text-muted-foreground"
              >
                {title}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href={ctaLink}
                className={cn(
                  "inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium transition-colors",
                  "border border-border bg-background text-foreground hover:bg-accent"
                )}
              >
                {ctaText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              
              <Link
                href={secondaryCtaLink}
                className={cn(
                  "inline-flex items-center justify-center px-5 py-2.5 rounded-md font-medium transition-colors",
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                <Download className="mr-2 w-4 h-4" />
                {secondaryCtaText}
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <div className="hidden lg:block">
            {imageUrl ? (
              <div className="relative w-full h-96 lg:h-[520px] rounded-xl overflow-hidden border border-border">
                <Image src={imageUrl} alt={name} fill className="object-cover" />
              </div>
            ) : (
              <div className="relative w-full h-96 lg:h-[520px] rounded-xl overflow-hidden border border-dashed border-border" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

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
  name = "Parth Koshti",
  title = "",
  description = "Welcome to my Personal space on the Internet.",
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
          >
            <div className="space-y-6 md:space-y-8 flex flex-col justify-center">
              <div className="space-y-3 md:space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight">
                    Hi, I'm {name}
                  </span>
                </motion.h1>
                
                {title && (
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-muted-foreground">
                      {title}
                    </span>
                  </motion.h2>
                )}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  {description}
                </span>
              </motion.p>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full flex items-center justify-center">
              {imageUrl ? (
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-border">
                  <Image src={imageUrl} alt={name} fill className="object-cover" />
                </div>
              ) : (
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-dashed border-border bg-muted/20" />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Rss } from 'lucide-react';
import { getAssetUrl } from '@/lib/directus';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Customize these to your handles/links
  const XHandle = 'parthK'; // e.g., your X/Twitter handle
  const GithubHandle = 'ParthKoshti'; // e.g., your GitHub handle
  const links = {
    x: `https://x.com/${XHandle}`,
    github: `https://github.com/${GithubHandle}`,
    linkedin: 'https://linkedin.com/in/your-handle',
    consultation: '/hire',
  } as const;

  // Use the same image as the Hero section
  const heroAvatarUrl = getAssetUrl('1a90cbf3-aa45-49c6-abc8-3cd748fe436a') || '/avatar.png';

  return (
    <footer className="bg-background border-t border-border">
      <div className="container">
        <div className="py-12 md:py-14">
          {/* Bio */}
          <div className="max-w-3xl mx-auto flex items-start gap-4">
            <div className="shrink-0">
              <img
                src={heroAvatarUrl}
                alt="Avatar"
                width={56}
                height={56}
                className="rounded-full object-cover grayscale"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Hi ツ I am Parth Koshti and here I document my journey and share my
              thoughts. From India, living in Bengaluru.
            </p>
          </div>

          {/* Social buttons */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href={links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm hover:bg-muted/50"
            >
              <Twitter className="w-4 h-4" /> {XHandle}
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm hover:bg-muted/50"
            >
              <Github className="w-4 h-4" /> {GithubHandle}
            </a>

            {/* Small round icons */}
            {/* <a
              href={links.rss}
              className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted/50"
              aria-label="RSS"
            >
              <Rss className="w-4 h-4" />
            </a> */}
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted/50"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Consultation link */}
          <div className="mt-8 flex justify-center">
            <Link
              href={links.consultation}
              className="inline-flex items-center gap-2 text-sm text-foreground"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground" />
              <span className="border-b border-muted-foreground/50 pb-0.5">
                I am available for consultation
              </span>
            </Link>
          </div>

          {/* Copyright line */}
          <div className="mt-8 text-center text-muted-foreground">
            <p className="text-sm">
              © {currentYear} Parth Koshti · If you are reading this – have a great day ツ
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

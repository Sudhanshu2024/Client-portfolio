'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Email', href: 'mailto:your@email.com', icon: Mail },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="font-bold text-xl gradient-text">Portfolio</span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                A passionate developer creating beautiful, functional, and user-centered digital experiences.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-lg bg-background border border-border",
                      "flex items-center justify-center text-muted-foreground",
                      "hover:text-primary hover:border-primary transition-colors"
                    )}
                    aria-label={item.name}
                  >
                    <item.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Get In Touch</h3>
              <div className="space-y-3">
                <a
                  href="mailto:your@email.com"
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  your@email.com
                </a>
                <p className="text-muted-foreground text-sm">
                  Available for freelance work and collaboration opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Your Name. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>using Next.js & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

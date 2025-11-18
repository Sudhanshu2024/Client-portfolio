import AboutContent from '@/components/AboutContent';
import type { Metadata } from 'next';

// SSG: Pure static content, no user data or dynamic content
export const dynamic = "force-static";
export const revalidate = false;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio';

export const metadata: Metadata = {
  title: `About | ${siteName}`,
  description: 'Learn more about me, my skills, experience, and passion for web development and technology.',
  keywords: ['about', 'developer', 'web development', 'skills', 'experience', 'portfolio'],
  openGraph: {
    title: `About | ${siteName}`,
    description: 'Learn more about me, my skills, experience, and passion for web development and technology.',
    url: `${baseUrl}/about`,
    siteName: siteName,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: `About | ${siteName}`,
    description: 'Learn more about me, my skills, experience, and passion for web development and technology.',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

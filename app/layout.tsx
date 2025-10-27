import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Personal portfolio showcasing projects and blog posts',
  keywords: ['portfolio', 'web development', 'nextjs', 'react', 'typescript'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-portfolio.vercel.app',
    title: process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Personal portfolio showcasing projects and blog posts',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Personal portfolio showcasing projects and blog posts',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

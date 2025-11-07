import type { Metadata } from 'next';
import { Poppins, Raleway } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

// Move font declarations here - at module scope
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-alt'
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-sans'
});

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} ${raleway.variable} antialiased font-sans`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Newsletter />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
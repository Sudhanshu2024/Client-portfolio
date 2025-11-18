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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio';
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Personal portfolio showcasing projects and blog posts';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ['portfolio', 'web development', 'nextjs', 'react', 'typescript'],
  authors: [{ name: 'Parth Koshti' }],
  creator: 'Parth Koshti',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: siteName,
    description: siteDescription,
    siteName: siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
  },
  alternates: {
    canonical: baseUrl,
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
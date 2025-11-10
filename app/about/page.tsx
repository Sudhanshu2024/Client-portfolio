import AboutContent from '@/components/AboutContent';

// SSG: Pure static content, no user data or dynamic content
export const dynamic = "force-static";
export const revalidate = false;

export default function AboutPage() {
  return <AboutContent />;
}

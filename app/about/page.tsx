"use client";
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import PolaroidSection from '@/components/PolaroidSection';

export default function AboutPage() {
  // const skills = [
  //   { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  //   { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'] },
  //   { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'] },
  // ];

  // const experience = [
  //   {
  //     title: 'Senior Frontend Developer',
  //     company: 'Tech Company',
  //     period: '2022 - Present',
  //     description: 'Leading frontend development initiatives and mentoring junior developers.',
  //   },
  //   {
  //     title: 'Full Stack Developer',
  //     company: 'Startup Inc.',
  //     period: '2020 - 2022',
  //     description: 'Developed full-stack applications using modern web technologies.',
  //   },
  //   {
  //     title: 'Frontend Developer',
  //     company: 'Digital Agency',
  //     period: '2018 - 2020',
  //     description: 'Created responsive web applications and collaborated with design teams.',
  //   },
  // ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-accent/20">
          <div className="container">
          <div className="flex justify-center">
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="space-y-6 max-w-2xl"
  >
    <h1 className="text-4xl sm:text-5xl font-bold text-center">
      About <span className="gradient-text">Me</span>
    </h1>

    <div className="text-center space-y-6 text-lg text-muted-foreground leading-relaxed">
      <p>Hello,<span className="font-bold"> I'm Parth Koshti. </span> A software developer, RevOps expert, community builder and an avid traveller.</p>

      <p>I have a degree in Mechanical Engineering from <span className="font-bold">Purdue University </span>, which led me to design cool automation projects for <span className="font-bold">Mercedes </span> and <span className="font-bold">Toyota </span>. That was before I realized I enjoyed sales and business development more and decided to sell automation projects to Fortune 500.</p>

      <p>After that, I switched to marketing and growth strategy at a MarTech startup in Boston.</p>

      <p>These days, I use all this experience to help companies improve their operations and grow their businesses via RevOps and automation.</p>

      <p>And <span className="underline">build software products.</span></p>
    </div>
  </motion.div>
</div>

          </div>
        </section>

        {/* Polaroid Photos Section */}
        <PolaroidSection />
        
      </main>
    </div>
  );
}

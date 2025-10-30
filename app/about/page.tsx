"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, Mail, MapPin, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'] },
  ];

  const experience = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Leading frontend development initiatives and mentoring junior developers.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc.',
      period: '2020 - 2022',
      description: 'Developed full-stack applications using modern web technologies.',
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2018 - 2020',
      description: 'Created responsive web applications and collaborated with design teams.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-accent/20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h1 className="text-4xl sm:text-5xl font-bold">
                  About <span className="gradient-text">Me</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate full-stack developer with over 5 years of experience creating 
                  digital experiences that are both beautiful and functional. I love turning complex 
                  problems into simple, elegant solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/cv.pdf"
                    className={cn(
                      "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                      "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    )}
                  >
                    <Download className="mr-2 w-4 h-4" />
                    Download CV
                  </a>
                  <a
                    href="mailto:your@email.com"
                    className={cn(
                      "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
                      "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
                      "shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    )}
                  >
                    <Mail className="mr-2 w-4 h-4" />
                    Get In Touch
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-6xl font-bold">YN</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comprehensive overview of the technologies and tools I work with.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 shadow-md border border-border"
                >
                  <h3 className="text-xl font-semibold mb-4">{skill.category}</h3>
                  <div className="space-y-2">
                    {skill.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                      >
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="section-padding bg-background">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Work Experience</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                My professional journey and the roles that shaped my expertise.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-xl p-6 shadow-md border border-border card-hover"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-primary font-medium">{job.company}</p>
                      </div>
                      <div className="flex items-center text-muted-foreground mt-2 md:mt-0">
                        <Calendar className="w-4 h-4 mr-2" />
                        {job.period}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{job.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Personal Info Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">Let's Work Together</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:your@email.com"
                    className={cn(
                      "inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-all duration-300",
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                      "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    )}
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Send Message
                  </a>
                  <a
                    href="/projects"
                    className={cn(
                      "inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-all duration-300",
                      "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
                      "shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    )}
                  >
                    View My Work
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

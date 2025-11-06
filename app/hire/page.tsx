import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

export const revalidate = 60;

export default function HirePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        <section className="section-padding bg-gradient-to-br from-background via-background to-accent/20">
          <div className="container max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Hire Me</h1>
            <p className="text-lg text-muted-foreground mb-8">
              I’m available for freelance work, consulting, and long-term engagements.
              Tell me about your project and I’ll get back within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:your@email.com"
                className={cn(
                  'inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-all duration-300',
                  'bg-primary text-primary-foreground hover:bg-primary/90',
                  'shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                )}
              >
                Email Me
              </a>
              <a
                href="/about"
                className={cn(
                  'inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-all duration-300',
                  'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
                  'shadow-md hover:shadow-lg hover:-translate-y-0.5'
                )}
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}






import { Asterisk } from 'lucide-react';

export default function HomeIntro() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-background">
              <Asterisk className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5">
            I like creating things.
            <br />
            Mostly on the internet.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            I am an Indiehacker, running multiple profitable software products with
            no external investments.
          </p>
        </div>
      </div>
    </section>
  );
}



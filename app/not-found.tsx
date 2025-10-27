import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-9xl font-bold gradient-text">404</h1>
            <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className={cn(
                "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              )}
            >
              <Home className="mr-2 w-4 h-4" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className={cn(
                "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300",
                "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
                "shadow-md hover:shadow-lg hover:-translate-y-0.5"
              )}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

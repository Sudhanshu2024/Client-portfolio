'use client';

import { useState } from 'react';
import { Coffee } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Hook up your email provider here
    // For now, just clear the input
    setEmail('');
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div
          className="mx-auto max-w-3xl rounded-2xl border border-border p-8 md:p-10 text-center shadow-sm
                     bg-black text-white dark:bg-white dark:text-black"
        >
          <div className="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-current/30">
            <Coffee className="h-5 w-5" />
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Want updates from me?</h2>
          <p className="opacity-80 mb-8 max-w-xl mx-auto">
            I occasionally send out an email with updates about my startup journey
            or when I have an interesting story to share.
          </p>

          <form onSubmit={onSubmit} className="mx-auto flex max-w-lg items-center gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="flex-1 bg-transparent border-0 border-b outline-none focus:ring-0
                         placeholder:opacity-60
                         border-white/40 text-white
                         dark:border-black/40 dark:text-black"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md border transition-colors
                         border-white/40 hover:bg-white hover:text-black
                         dark:border-black/40 dark:hover:bg-black dark:hover:text-white"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}



'use client';

import { useState, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BlogTagFilterProps {
  tags: string[];
}

export default function BlogTagFilter({ tags }: BlogTagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams.get('tag') || 'all';

  const effectiveTags = useMemo(() => ['all', ...tags], [tags]);

  function setTag(tag: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === 'all') {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {effectiveTags.map((tag) => (
        <button
          key={tag}
          onClick={() => setTag(tag)}
          className={cn(
            'px-3 py-1 rounded-full text-sm border transition-colors',
            selected === tag
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'
          )}
        >
          {tag === 'all' ? 'All' : tag}
        </button>
      ))}
    </div>
  );
}


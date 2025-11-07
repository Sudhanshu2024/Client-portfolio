// lib/mdx.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { mdxComponents } from '@/mdx-components';

export async function RenderMDX({ source }: { source: string }) {
  try {
    return (
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }]
            ],
            format: 'md', // Use 'md' for more forgiving parsing
            development: false,
          },
        }}
      />
    );
  } catch (error) {
    console.error('MDX rendering error:', error);
    return (
      <div className="border border-destructive/50 bg-destructive/10 rounded-lg p-4 my-4">
        <p className="text-sm text-destructive-foreground">
          <strong>Error rendering content:</strong> There was an issue parsing this blog post. 
          Please check the content format.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-2 text-xs overflow-x-auto">
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
        )}
      </div>
    );
  }
}
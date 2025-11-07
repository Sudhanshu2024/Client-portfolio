import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import { mdxComponents } from "@/mdx-components";

export function RenderMDX({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypePrism,
          ],
        },
      }}
    />
  );
}

import Image from "next/image";
import Link from "next/link";

export const mdxComponents = {
  // ✅ Image Support (required for remote URLs in Markdown)
  img: (props: any) => {
    const { src, alt, ...rest } = props;

    // Next.js Image requires width/height OR fill.
    // We set a safe default for MDX-generated images.
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={900}
        height={600}
        className="rounded-lg my-6"
        {...rest}
      />
    );
  },

  // ✅ Anchor tag support (all markdown links use this)
  a: (props: any) => {
    const { href, children, ...rest } = props;

    // External links open in a new tab
    const isExternal = href?.startsWith("http");

    return (
      <Link
        href={href}
        {...rest}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="underline text-primary hover:text-primary/80 transition-colors"
      >
        {children}
      </Link>
    );
  },

  // ✅ Example custom component inside MDX
  Callout: ({ children }: { children: React.ReactNode }) => (
    <div className="p-4 my-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/30 rounded">
      {children}
    </div>
  ),
};

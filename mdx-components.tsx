import Image from "next/image";
import Link from "next/link";

export const mdxComponents = {
  img: (props: any) => (
    <Image
      {...props}
      alt={props.alt || ""}
      width={800}
      height={500}
      className="rounded-lg"
    />
  ),
  a: (props: any) => (
    <Link {...props} className="underline text-primary" />
  ),

  // Example custom component
  Callout: (props: any) => (
    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
      {props.children}
    </div>
  ),
};

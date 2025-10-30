// Directus REST helpers using native fetch to support ISR and tokens


// Define the schema for our collections (minimal fields we use)
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  preview: string; // short description
  body: string; // MDX/Markdown
  date_published: string;
  status: 'published' | 'draft';
  tags: string[];
}



const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;

function authHeaders() {
  return DIRECTUS_TOKEN
    ? ({ Authorization: `Bearer ${DIRECTUS_TOKEN}` } as Record<string, string>)
    : ({} as Record<string, string>);
}

// Helper functions for fetching data
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // console.log("🔍 Fetching from:", `${DIRECTUS_URL}/items/Blog`);
    // console.log("🔍 Token present:", !!DIRECTUS_TOKEN);

    const params = new URLSearchParams({
      fields: [
        'id',
        'title',
        'slug',
        'preview',
        'body',
        'date_published',
        'status',
        'tags',
        'date_created',
        'date_updated',
        'keywords',
        'seo_interface',
        'seo_analyzer'
      ].join(','),
      sort: '-date_published',
      filter: JSON.stringify({ status: { _eq: 'published' } }),
      limit: '50'
    });

    

    const res = await fetch(`${DIRECTUS_URL}/items/Blog?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {})
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("❌ Directus fetch failed:", res.status, await res.text());
      throw new Error(`Directus error: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Directus response:", data);

    const items: BlogPost[] = (data?.data || []).map((p: any) => ({
      ...p,
      thumbnail: p?.thumbnail
        ? (p.thumbnail.startsWith('http')
            ? p.thumbnail
            : `${DIRECTUS_URL}/assets/${p.thumbnail}`)
        : null,
    }));

    return items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string) {
  const url = `${DIRECTUS_URL}/items/Blog?filter[slug][_eq]=${encodeURIComponent(slug)}&fields=*,tags.*`;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (DIRECTUS_TOKEN) {
      headers["Authorization"] = `Bearer ${DIRECTUS_TOKEN}`;
    }

    const res = await fetch(url, {
      headers,
      next: { revalidate: 60 }, // ISR: revalidate every 60s
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ Directus fetch failed: ${res.status} - ${errorText}`);
      throw new Error(`Directus error: ${res.status}`);
    }

    const data = await res.json();

    if (!data?.data?.length) {
      console.warn("⚠️ No blog post found for slug:", slug);
      return null;
    }

    const post = data.data[0];

    // Resolve image URLs (like you did in getBlogPosts)
    return {
      ...post,
      thumbnail: post?.thumbnail
        ? post.thumbnail.startsWith("http")
          ? post.thumbnail
          : `${DIRECTUS_URL}/assets/${post.thumbnail}`
        : null,
    };
  } catch (error) {
    console.error("💥 Error fetching single blog post:", error);
    return null;
  }
}
// Project helpers removed per new requirements

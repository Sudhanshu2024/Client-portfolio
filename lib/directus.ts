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
  thumbnail?: string | null;
}



const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;

// Optional mapping: blog slug -> Directus file id for thumbnail
export const BLOG_THUMBNAIL_FILE_IDS: Record<string, string> = {"my-preferred-tech-stack-in-2025": "1a90cbf3-aa45-49c6-abc8-3cd748fe436a",};

// Default thumbnail file id (used when a slug doesn't have a specific mapping)
export const DEFAULT_BLOG_THUMBNAIL_FILE_ID = 'fafde1a9-aaf3-4412-8f9a-6767b7bc5cbe';

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

    const items: BlogPost[] = (data?.data || []).map((p: any) => {
      const mappedId = BLOG_THUMBNAIL_FILE_IDS[p.slug] || DEFAULT_BLOG_THUMBNAIL_FILE_ID;
      const mappedUrl = mappedId ? getAssetUrl(mappedId) : null;
      const apiUrl = p?.thumbnail
        ? (p.thumbnail.startsWith('http') ? p.thumbnail : `${DIRECTUS_URL}/assets/${p.thumbnail}`)
        : null;
      return {
        ...p,
        thumbnail: mappedUrl || apiUrl,
      } as BlogPost;
    });

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
    // Attach thumbnail for individual blog pages using mapping/default if available
    const mappedId = BLOG_THUMBNAIL_FILE_IDS[slug] || DEFAULT_BLOG_THUMBNAIL_FILE_ID;
    const mappedUrl = mappedId ? getAssetUrl(mappedId) : null;
    const apiUrl = post?.thumbnail
      ? (post.thumbnail.startsWith("http") ? post.thumbnail : `${DIRECTUS_URL}/assets/${post.thumbnail}`)
      : null;
    return { ...post, thumbnail: mappedUrl || apiUrl };
  } catch (error) {
    console.error("💥 Error fetching single blog post:", error);
    return null;
  }
}
// Fetch a hero image from the `library` collection in Directus.
// It tries common field names that might store a file id.
export async function getLibraryHeroImage(): Promise<string | null> {
  if (!DIRECTUS_URL) return null;
  try {
    const params = new URLSearchParams({
      fields: ['*'].join(','),
      sort: '-date_created',
      limit: '1',
    });
    const res = await fetch(`${DIRECTUS_URL}/items/library?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {}),
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error('❌ Directus library fetch failed:', res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const item = data?.data?.[0];
    if (!item) return null;

    const candidateId = item.image || item.file || item.asset || item.thumbnail || item.hero;
    if (typeof candidateId === 'string' && candidateId.length > 10) {
      return `${DIRECTUS_URL}/assets/${candidateId}`;
    }
    return null;
  } catch (e) {
    console.error('Error fetching library hero image:', e);
    return null;
  }
}

// Fetch a file from Directus `/files` by folder name and file title.
// This is useful when you know the folder (e.g., "Personal Site") and a specific file title (e.g., "Headshot Choice").
export async function getHeroImageByFolderAndTitle(folderName: string, fileTitle: string): Promise<string | null> {
  if (!DIRECTUS_URL) return null;
  try {
    // 1) Resolve folder id by name
    const folderRes = await fetch(
      `${DIRECTUS_URL}/folders?filter[name][_eq]=${encodeURIComponent(folderName)}&limit=1`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {}),
        },
        next: { revalidate: 60 },
      }
    );
    if (!folderRes.ok) {
      console.error('❌ Directus folder fetch failed:', folderRes.status, await folderRes.text());
      return null;
    }
    const folderData = await folderRes.json();
    const folderId = folderData?.data?.[0]?.id;
    if (!folderId) return null;

    // 2) Find file within that folder by title or filename_download
    const filesUrl = `${DIRECTUS_URL}/files?` +
      new URLSearchParams({
        limit: '1',
        fields: 'id,title,filename_download,folder',
        // We use a logical OR: title equals OR filename_download equals
        // Directus filter for OR: { _or: [ {title: {_eq: fileTitle}}, {filename_download: {_eq: fileTitle}} ] }
        filter: JSON.stringify({
          _and: [
            { folder: { _eq: folderId } },
            { _or: [
              { title: { _eq: fileTitle } },
              { filename_download: { _eq: fileTitle } }
            ]}
          ]
        })
      }).toString();

    const fileRes = await fetch(filesUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...(DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {}),
      },
      next: { revalidate: 60 },
    });
    if (!fileRes.ok) {
      console.error('❌ Directus file fetch failed:', fileRes.status, await fileRes.text());
      return null;
    }
    const fileData = await fileRes.json();
    const file = fileData?.data?.[0];
    if (!file?.id) return null;

    return `${DIRECTUS_URL}/assets/${file.id}`;
  } catch (e) {
    console.error('Error fetching hero image by folder/title:', e);
    return null;
  }
}

// If you already know a Directus file id, build the public asset URL
export function getAssetUrl(fileId: string | null | undefined): string | null {
  if (!fileId || !DIRECTUS_URL) return null;
  return `${DIRECTUS_URL}/assets/${fileId}`;
}

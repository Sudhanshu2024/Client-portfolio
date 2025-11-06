
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  preview: string; 
  body: string; 
  date_published: string;
  status: 'published' | 'draft';
  tags: string[];
  thumbnail?: string | null;
}

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;

// Default thumbnail file id (used as fallback when no thumbnail is set)
export const DEFAULT_BLOG_THUMBNAIL_FILE_ID = 'fafde1a9-aaf3-4412-8f9a-6767b7bc5cbe';

function authHeaders() {
  return DIRECTUS_TOKEN
    ? ({ Authorization: `Bearer ${DIRECTUS_TOKEN}` } as Record<string, string>)
    : ({} as Record<string, string>);
}

// Helper to process thumbnail field from Directus
function processThumbnail(thumbnailField: any): string | null {
  if (!thumbnailField) {
    // Use default thumbnail if none provided
    return getAssetUrl(DEFAULT_BLOG_THUMBNAIL_FILE_ID);
  }

  // If thumbnail is a file object (with nested data)
  if (typeof thumbnailField === 'object' && thumbnailField.id) {
    return getAssetUrl(thumbnailField.id);
  }

  // If thumbnail is just a file ID string
  if (typeof thumbnailField === 'string') {
    // Check if it's already a full URL
    if (thumbnailField.startsWith('http')) {
      return thumbnailField;
    }
    // Otherwise treat it as a file ID
    return getAssetUrl(thumbnailField);
  }

  // Fallback to default
  return getAssetUrl(DEFAULT_BLOG_THUMBNAIL_FILE_ID);
}

// Helper functions for fetching data
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
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
        'seo_analyzer',
        'thumbnail.*' // Fetch thumbnail with all its fields
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
      console.error(" Directus fetch failed:", res.status, await res.text());
      throw new Error(`Directus error: ${res.status}`);
    }

    const data = await res.json();
    console.log(" Directus response:", data);

    const items: BlogPost[] = (data?.data || []).map((p: any) => ({
      ...p,
      thumbnail: processThumbnail(p.thumbnail),
    }));

    return items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string) {
  const url = `${DIRECTUS_URL}/items/Blog?filter[slug][_eq]=${encodeURIComponent(slug)}&fields=*,tags.*,thumbnail.*`;

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
      console.error(` Directus fetch failed: ${res.status} - ${errorText}`);
      throw new Error(`Directus error: ${res.status}`);
    }

    const data = await res.json();

    if (!data?.data?.length) {
      console.warn(" No blog post found for slug:", slug);
      return null;
    }

    const post = data.data[0];
    return {
      ...post,
      thumbnail: processThumbnail(post.thumbnail),
    };
  } catch (error) {
    console.error(" Error fetching single blog post:", error);
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
      console.error(' Directus library fetch failed:', res.status, await res.text());
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
      console.error(' Directus folder fetch failed:', folderRes.status, await folderRes.text());
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
      console.error(' Directus file fetch failed:', fileRes.status, await fileRes.text());
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
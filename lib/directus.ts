import { createDirectus, rest, readItems, readItem } from '@directus/sdk';

// Define the schema for our collections
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail: string;
  date_created: string;
  date_updated: string;
  status: 'published' | 'draft';
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  date_created: string;
  date_updated: string;
  status: 'published' | 'draft';
}

export interface Schema {
  blogs: BlogPost[];
  projects: Project[];
}

// Create Directus client
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

export const directus = createDirectus<Schema>(directusUrl)
  .with(rest());

// Helper functions for fetching data
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await directus.request(
      readItems('blogs', {
        filter: {
          status: {
            _eq: 'published'
          }
        },
        sort: ['-date_created'],
        limit: 6
      })
    );
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await directus.request(
      readItems('blogs', {
        filter: {
          slug: {
            _eq: slug
          },
          status: {
            _eq: 'published'
          }
        },
        limit: 1
      })
    );
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await directus.request(
      readItems('projects', {
        filter: {
          status: {
            _eq: 'published'
          }
        },
        sort: ['-date_created'],
        limit: 10
      })
    );
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const projects = await directus.request(
      readItems('projects', {
        filter: {
          slug: {
            _eq: slug
          },
          status: {
            _eq: 'published'
          }
        },
        limit: 1
      })
    );
    return projects[0] || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

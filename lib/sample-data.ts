import { BlogPost, Project } from './directus';

// Sample blog posts for development
export const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Modern Web Applications with Next.js 14',
    slug: 'building-modern-web-applications-nextjs-14',
    description: 'Learn how to leverage the latest features of Next.js 14 to build fast, scalable web applications with the App Router.',
    content: 'This is a comprehensive guide to building modern web applications using Next.js 14...',
    thumbnail: '/api/placeholder/400/250',
    date_created: '2024-01-15T10:00:00Z',
    date_updated: '2024-01-15T10:00:00Z',
    status: 'published'
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS for Rapid UI Development',
    slug: 'mastering-tailwind-css-rapid-ui-development',
    description: 'Discover advanced techniques and best practices for using Tailwind CSS to create beautiful, responsive user interfaces.',
    content: 'Tailwind CSS has revolutionized how we approach styling in modern web development...',
    thumbnail: '/api/placeholder/400/250',
    date_created: '2024-01-10T14:30:00Z',
    date_updated: '2024-01-10T14:30:00Z',
    status: 'published'
  },
  {
    id: '3',
    title: 'Headless CMS Integration with Directus',
    slug: 'headless-cms-integration-directus',
    description: 'A complete guide to integrating Directus CMS with your Next.js application for content management.',
    content: 'Directus provides a powerful headless CMS solution that integrates seamlessly with modern frameworks...',
    thumbnail: '/api/placeholder/400/250',
    date_created: '2024-01-05T09:15:00Z',
    date_updated: '2024-01-05T09:15:00Z',
    status: 'published'
  },
  {
    id: '4',
    title: 'TypeScript Best Practices for React Development',
    slug: 'typescript-best-practices-react-development',
    description: 'Essential TypeScript patterns and practices that will make your React applications more robust and maintainable.',
    content: 'TypeScript brings type safety and better developer experience to React development...',
    thumbnail: '/api/placeholder/400/250',
    date_created: '2024-01-01T16:45:00Z',
    date_updated: '2024-01-01T16:45:00Z',
    status: 'published'
  },
  {
    id: '5',
    title: 'Performance Optimization Techniques for Web Apps',
    slug: 'performance-optimization-techniques-web-apps',
    description: 'Learn proven strategies to optimize your web applications for better performance and user experience.',
    content: 'Performance optimization is crucial for delivering great user experiences...',
    thumbnail: '/api/placeholder/400/250',
    date_created: '2023-12-28T11:20:00Z',
    date_updated: '2023-12-28T11:20:00Z',
    status: 'published'
  },
  {
    id: '6',
    title: 'Deploying Next.js Applications to Vercel',
    slug: 'deploying-nextjs-applications-vercel',
    description: 'Step-by-step guide to deploying your Next.js applications to Vercel with optimal configuration.',
    content: 'Vercel provides seamless deployment for Next.js applications with built-in optimizations...',
    thumbnail: '/api/placeholder/400/250',
    date_created: '2023-12-25T13:10:00Z',
    date_updated: '2023-12-25T13:10:00Z',
    status: 'published'
  }
];

// Sample projects for development
export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description: 'A full-stack e-commerce solution built with Next.js, Stripe, and PostgreSQL.',
    content: 'This project showcases a complete e-commerce platform with user authentication, payment processing, and admin dashboard...',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    github_url: 'https://github.com/username/ecommerce-platform',
    live_url: 'https://ecommerce-demo.vercel.app',
    date_created: '2024-01-20T10:00:00Z',
    date_updated: '2024-01-20T10:00:00Z',
    status: 'published'
  },
  {
    id: '2',
    title: 'Task Management App',
    slug: 'task-management-app',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    content: 'Built with modern web technologies, this app provides a seamless task management experience...',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
    github_url: 'https://github.com/username/task-manager',
    live_url: 'https://taskmanager-demo.vercel.app',
    date_created: '2024-01-15T14:30:00Z',
    date_updated: '2024-01-15T14:30:00Z',
    status: 'published'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    slug: 'weather-dashboard',
    description: 'A beautiful weather dashboard with location-based forecasts and interactive maps.',
    content: 'This dashboard provides comprehensive weather information with an intuitive user interface...',
    image: '/api/placeholder/600/400',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3'],
    github_url: 'https://github.com/username/weather-dashboard',
    live_url: 'https://weather-demo.vercel.app',
    date_created: '2024-01-10T09:15:00Z',
    date_updated: '2024-01-10T09:15:00Z',
    status: 'published'
  },
  {
    id: '4',
    title: 'Portfolio Website',
    slug: 'portfolio-website',
    description: 'A responsive portfolio website showcasing projects and blog posts with CMS integration.',
    content: 'This portfolio website demonstrates modern web development practices and design principles...',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'Directus', 'Framer Motion', 'Tailwind CSS'],
    github_url: 'https://github.com/username/portfolio',
    live_url: 'https://portfolio-demo.vercel.app',
    date_created: '2024-01-05T16:45:00Z',
    date_updated: '2024-01-05T16:45:00Z',
    status: 'published'
  },
  {
    id: '5',
    title: 'Social Media Analytics Tool',
    slug: 'social-media-analytics-tool',
    description: 'A comprehensive analytics tool for tracking social media performance across multiple platforms.',
    content: 'This tool provides detailed insights into social media performance with customizable dashboards...',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'D3.js', 'Express.js', 'MySQL', 'Redis'],
    github_url: 'https://github.com/username/social-analytics',
    live_url: 'https://social-analytics-demo.vercel.app',
    date_created: '2024-01-01T11:20:00Z',
    date_updated: '2024-01-01T11:20:00Z',
    status: 'published'
  }
];

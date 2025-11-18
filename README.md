# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 14, Tailwind CSS, and Directus CMS. Features a clean design, smooth animations, and dynamic content management.

## 🚀 Features

- **Modern Design**: Clean, minimalist design with smooth animations
- **Responsive Layout**: Works perfectly on all devices
- **Dynamic Content**: Blog posts and projects managed through Directus CMS
- **Fast Performance**: Optimized with Next.js 14 App Router and ISR
- **SEO Optimized**: Built-in SEO features and meta tags
- **Dark Mode Ready**: Prepared for dark mode implementation
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **CMS**: Directus
- **Language**: TypeScript
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-nextjs-directus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
   NEXT_PUBLIC_SITE_NAME="Your Portfolio"
   NEXT_PUBLIC_SITE_DESCRIPTION="Personal portfolio showcasing projects and blog posts"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Directus CMS Setup

### Option 1: Use Sample Data (Development)
The application includes sample data that will be used when Directus is not available. This allows you to develop and test the application without setting up Directus.

### Option 2: Set Up Directus (Production)
1. **Install Directus**
   ```bash
   npm create directus-project@latest my-directus-project
   cd my-directus-project
   npm run dev
   ```

2. **Create Collections**
   - Create a `blogs` collection with fields:
     - `title` (String)
     - `slug` (String, unique)
     - `description` (Text)
     - `content` (Text)
     - `thumbnail` (File)
     - `date_created` (DateTime)
     - `date_updated` (DateTime)
     - `status` (String, choices: published/draft)

   - Create a `projects` collection with fields:
     - `title` (String)
     - `slug` (String, unique)
     - `description` (Text)
     - `content` (Text)
     - `image` (File)
     - `technologies` (JSON)
     - `github_url` (String, optional)
     - `live_url` (String, optional)
     - `date_created` (DateTime)
     - `date_updated` (DateTime)
     - `status` (String, choices: published/draft)

3. **Configure Permissions**
   - Set public read access for both collections
   - Ensure the `status` field filters for published items

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

### Environment Variables for Production
```env
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-instance.com
NEXT_PUBLIC_SITE_NAME="Your Portfolio"
NEXT_PUBLIC_SITE_DESCRIPTION="Personal portfolio showcasing projects and blog posts"
```

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── projects/          # Project pages
│   │   └── [slug]/        # Dynamic project pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable components
│   ├── Navbar.tsx         # Navigation component
│   ├── Hero.tsx           # Hero section
│   ├── BlogGrid.tsx       # Blog posts grid
│   ├── ProjectCarousel.tsx # Projects carousel
│   └── Footer.tsx          # Footer component
├── lib/                   # Utility functions
│   ├── directus.ts        # Directus client configuration
│   ├── sample-data.ts     # Sample data for development
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript type definitions
```

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `app/page.tsx` - Hero section content
- `app/about/page.tsx` - About page content
- `components/Navbar.tsx` - Social links
- `components/Footer.tsx` - Contact information

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Customize component styles in individual component files

### Content
- Add your blog posts and projects through Directus CMS
- Update sample data in `lib/sample-data.ts` for development

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Directus](https://directus.io/) - Headless CMS
- [Lucide](https://lucide.dev/) - Icon library

---


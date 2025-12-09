# Portfolio

A modern, dynamic portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features automatic GitHub project integration, dark mode support, and a contact form.

## Features

- **Multi-Theme System** - 5 color themes (Cyan, Purple, Emerald, Orange, Blue) with light/dark mode
- **AI Chat Assistant** - Claude-powered chat to answer questions about experience and skills
- **Interactive Terminal UI** - Terminal-style sections with collapsible windows
- **Resume Modal** - Theme-synchronized resume viewer with PDF download
- **Dynamic GitHub Integration** - Automatically fetches and displays your GitHub repositories
- **Responsive Design** - Mobile-first, fully responsive layout with optimized mobile icons
- **Floating Action Buttons** - Scroll-to-top and chat buttons with smooth animations
- **Contact Form** - Built-in contact form with API route
- **SEO Optimized** - Structured data, meta tags, Open Graph, and Twitter cards
- **PWA Ready** - Installable on mobile with custom app icons
- **Type Safe** - Built with TypeScript

## Tech Stack

- **Framework:** Next.js 16.0 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.0
- **Content:** MDX
- **Icons:** React Icons (Feather, Simple Icons)
- **Fonts:** JetBrains Mono
- **AI Chat:** Claude API integration
- **Analytics:** Vercel Analytics & Speed Insights
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### 1. Update GitHub Username

Edit `lib/github.ts` and change the USERNAME constant:

```typescript
const USERNAME = 'your-github-username';
```

### 2. Update Personal Information

Edit the metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Full Stack Developer",
  description: "Your custom description",
};
```

### 3. Add Blog Posts

Create new `.mdx` files in the `posts/` directory:

```mdx
---
title: "Your Post Title"
date: "2025-01-15"
description: "A brief description"
tags: ["tag1", "tag2"]
---

# Your content here
```

### 4. Configure Contact Form

The contact form API route is at `app/api/contact/route.ts`. Currently, it logs submissions to the console. To actually send emails, integrate with a service like:

- [Resend](https://resend.com/)
- [SendGrid](https://sendgrid.com/)
- [Nodemailer](https://nodemailer.com/)

Example with Resend:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'contact@yourdomain.com',
  to: 'your-email@example.com',
  subject: `Portfolio Contact: ${name}`,
  html: `<p>${message}</p>`,
});
```

### 5. Customize Colors

The color scheme uses Tailwind's default colors. To customize:

- Edit the CSS custom properties in `app/globals.css`
- Or add a `tailwind.config.ts` file with your theme

### 6. Featured Projects

By default, the portfolio shows your 6 most starred repositories. To customize this logic, edit the `getFeaturedRepos()` function in `lib/github.ts`.

You can also tag specific repos as featured by adding topics to them on GitHub:
- Add the `featured` or `portfolio` topic to repos you want to showcase

## Project Structure

```
portfolio/
├── app/
│   ├── blog/              # Blog pages
│   ├── api/contact/       # Contact form API
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── Contact.tsx        # Contact form
│   ├── Footer.tsx         # Footer component
│   ├── Hero.tsx           # Hero section
│   ├── Navigation.tsx     # Navigation bar
│   ├── ProjectCard.tsx    # Project card
│   ├── Projects.tsx       # Projects section
│   ├── ThemeProvider.tsx  # Dark mode context
│   └── ThemeToggle.tsx    # Theme toggle button
├── lib/
│   ├── blog.ts            # Blog utilities
│   └── github.ts          # GitHub API integration
├── types/
│   └── github.ts          # TypeScript types
└── posts/                 # MDX blog posts
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy!

Vercel automatically detects Next.js and configures everything.

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Install the [Next.js Runtime](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/)

### Environment Variables

If you add external services (like email), create a `.env.local` file:

```env
RESEND_API_KEY=your_api_key_here
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT License - feel free to use this for your own portfolio!

## Support

For issues or questions, please open an issue on GitHub.

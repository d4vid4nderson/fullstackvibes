# Portfolio Project - Development Guide

## Project Overview
A modern, interactive portfolio website built with Next.js showcasing three private enterprise applications (init_VUE, leg_VUE, sp_VUE). Features a multi-theme color system with light/dark mode support and creative UI interactions.

## Tech Stack
- **Framework**: Next.js 16.0.3 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Icons**: react-icons (Feather Icons, Simple Icons)
- **Fonts**: JetBrains Mono (monospace)
- **Deployment**: Static export ready

## Theme System
The portfolio features a comprehensive theming system with 5 color themes and light/dark mode support.

### Available Themes
1. **Cyan** (Default)
   - Primary: `#06b6d4`
   - Secondary: `#14b8a6`
   - Tertiary: `#0891b2`
   - Light mode background: `#cffafe`

2. **Purple**
   - Primary: `#a855f7`
   - Secondary: `#8b5cf6`
   - Tertiary: `#7c3aed`
   - Light mode background: `#f3e8ff`

3. **Emerald**
   - Primary: `#10b981`
   - Secondary: `#059669`
   - Tertiary: `#34d399`
   - Light mode background: `#d1fae5`

4. **Orange**
   - Primary: `#f97316`
   - Secondary: `#fb923c`
   - Tertiary: `#ea580c`
   - Light mode background: `#ffedd5`

5. **Blue (Hyperdrive)**
   - Primary: `#3b82f6`
   - Secondary: `#60a5fa`
   - Tertiary: `#2563eb`
   - Light mode background: `#dbeafe`

### Dark Mode
- Background: `#0f0f0f` (consistent across all themes)
- Footer: `#0a0a0a`
- Cards: `#1a1a1a`
- Text: White, gray-300, gray-400

### Theme Implementation
Themes use CSS custom properties defined in `app/globals.css`:
```css
[data-theme="cyan"] {
  --accent-primary: #06b6d4;
  --accent-secondary: #14b8a6;
  --accent-tertiary: #0891b2;
  --accent-light: #67e8f9;
  --accent-dark: #0e7490;
}

/* Light mode backgrounds only apply when not in dark mode */
:root:not(.dark)[data-theme="cyan"] {
  --background: #cffafe;
}

/* Dark mode overrides to maintain consistent dark background */
.dark[data-theme="cyan"] {
  --background: #0f0f0f;
}
```

### Theme Switching
- Theme state managed in `components/ThemeProvider.tsx`
- Persisted to localStorage: `mode` and `colorTheme`
- Accessible via navigation dropdown
- Prevents white flash on load with blocking script in `app/layout.tsx`

## Key Features

### 1. Hero Section
- Interactive avatar image (rotates on hover, 400px size)
- **Easter Egg Navigation**: Hidden navigation revealed on hover
  - Default: `<>Full Stack Vibes`
  - On Hover: `< Home | Projects | Resume | Contact | Themes > Full Stack Vibes`
  - Navigation order: Home | Projects | Resume | Contact | Themes
  - Equal spacing: 28px (`left-7` and `ml-7`) on both sides
  - Current translation: `translate-x-[437px]`
  - Smooth 500ms animation
- **Fixed Terminal Intro**: Static welcome message with scrollable command history (48px height)
- CTA buttons with theme-aware glow effects
- Animated background orbs

### 2. Theme Dropdown (Desktop)
- Hover-based dropdown in navigation
- Sun/Moon icons for light/dark mode toggle
- Color swatches showing all 5 themes
- Positioned with `top-full pt-2` for continuous hover area

### 3. Projects Section
Three private enterprise applications with custom project cards:

#### init_VUE (Initiative Tracking Platform)
- **Language**: Go
- **Tech**: Go, HTMX, Tailwind CSS, JavaScript, Docker, Claude AI, Playwright
- **Features**: Multi-level approval workflow, real-time health monitoring, budget tracking, executive dashboard, Gantt charts
- **Topics**: `['golang', 'htmx', 'tailwindcss', 'javascript', 'docker', 'claude', 'playwright']`

#### leg_VUE (Legislative Tracking Platform)
- **Language**: Python
- **Tech**: Python, React, FastAPI, Tailwind CSS, PostgreSQL, Docker, Claude AI, Playwright
- **Features**: Automated tracking of federal/state legislation, AI-powered analysis with Azure OpenAI, 20,000+ documents across 6 states
- **Topics**: `['python', 'react', 'fastapi', 'tailwindcss', 'docker', 'claude', 'playwright', 'postgresql', 'typescript']`

#### sp_VUE (SharePoint Testing Platform)
- **Language**: Go
- **Tech**: Go, Tailwind CSS, JavaScript, Docker, Claude AI, Playwright
- **Features**: Automated SharePoint testing, broken link detection, accessibility compliance (WCAG), multi-format reporting
- **Topics**: `['golang', 'htmx', 'tailwindcss', 'javascript', 'docker', 'claude', 'playwright']`

### 4. Project Cards
- Displays first 6 technology icons from topics array
- Click to open detailed modal
- Theme-aware gradient border effect on hover
- Tech badge icons with tooltips
- Stats: language, stars, forks
- All hover effects use theme CSS variables

### 5. Project Modals
- Full project descriptions
- Key features (8 per project)
- Core capabilities (5 per project)
- Tech stack with icons
- "Also includes" section for additional technologies
- Privacy note for confidential projects
- Z-index: `z-[9999]` to prevent overlay issues

### 6. Footer
- Claude Code logo with theme-aware gradient (using SVG mask technique)
- Social links (GitHub, Email) with theme-aware hover glow
- Heart icon with theme color
- Copyright notice
- Built with Next.js & Tailwind CSS

### 7. Resume Modal
- Standalone HTML page at `/public/resume.html` displayed in modal iframe
- Syncs with portfolio theme colors via postMessage
- Light/dark mode toggle within modal
- PDF download button in modal header
- Matches portfolio visual style (JetBrains Mono, gradients, terminal aesthetics)

### 8. Favicons
- **Browser favicon**: Cyan-to-fuchsia gradient, PNG format (16x16, 32x32)
- **Mobile app icons**: Separate design for home screen (180x180, 192x192, 512x512)
- PNG used instead of SVG for better gradient rendering and compatibility
- Files: `favicon.png`, `favicon_mobile.png`, `apple-touch-icon.png`, `icon-*.png`

## File Structure

```
portfolio/
├── app/
│   ├── page.tsx              # Main homepage
│   ├── layout.tsx            # Root layout with theme script
│   └── globals.css           # Global styles & theme definitions
├── components/
│   ├── Hero.tsx              # Hero section with easter egg nav & theme dropdown
│   ├── Projects.tsx          # Projects grid
│   ├── ProjectCard.tsx       # Individual project card (theme-aware)
│   ├── ProjectModal.tsx      # Detailed project modal
│   ├── InteractiveImage.tsx  # Rotating avatar (400px)
│   ├── Footer.tsx            # Footer with Claude Code logo (theme-aware)
│   ├── Contact.tsx           # Contact form section
│   ├── ScrollToTop.tsx       # Scroll to top button (theme-aware)
│   └── ThemeProvider.tsx     # Theme context provider
├── lib/
│   └── github.ts             # GitHub API & custom project data
├── types/
│   └── github.ts             # TypeScript types
├── public/
│   ├── claude_code.svg       # Claude Code creature logo
│   ├── playwright.svg        # Playwright logo
│   ├── resume.html           # Standalone resume page
│   └── [other icons]         # Tech stack logos
└── package.json
```

## Important Implementation Details

### Custom Icons
Since Playwright icon doesn't exist in react-icons, we use a custom SVG component:

```typescript
const PlaywrightIcon = ({ className }: { className?: string }) => (
  <Image src="/playwright.svg" alt="Playwright" width={24} height={24} className={className} />
);
```

### Icon Mapping System
Located in `ProjectCard.tsx` - maps topic strings to icon components:
```typescript
const iconMap: { [key: string]: React.ComponentType } = {
  'golang': SiGo,
  'python': SiPython,
  'playwright': PlaywrightIcon,
  // ... etc
};
```

### Easter Egg Navigation
Located in `Hero.tsx`:
- Default state: Brackets tight together `<>Full Stack Vibes`
- Hover state: Brackets expand with navigation appearing between
- Navigation menu order: Home | Projects | Resume | Contact | Themes
- Mobile: Traditional navigation always visible (top-right)
- Desktop: Hidden until hover, auto-expands on page load for 2 seconds
- Spacing: `left-7` (28px) from opening bracket, `ml-7` (28px) before closing bracket
- Translation: `translate-x-[437px]` for closing bracket movement

### Theme-Aware CSS Classes
Custom utility classes in `app/globals.css`:
```css
.text-accent { color: var(--accent-primary); }
.bg-accent { background-color: var(--accent-primary); }
.bg-gradient-accent-to-r {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
}
.hover-accent:hover { color: var(--accent-light); }
.hover-glow-accent:hover { filter: drop-shadow(0 0 8px var(--accent-primary)); }
```

### Claude Code Logo in Footer
Uses SVG mask technique to apply theme-aware gradient:
```typescript
<span className="inline-block" style={{
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
  WebkitMask: 'url(/claude_code.svg) no-repeat center',
  mask: 'url(/claude_code.svg) no-repeat center',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  width: '24px',
  height: '24px'
}} />
```

### Preventing White Flash on Page Load
Blocking script in `app/layout.tsx` applies theme before render:
```typescript
<script dangerouslySetInnerHTML={{
  __html: `
    (function() {
      try {
        const mode = localStorage.getItem('mode') || 'dark';
        const theme = localStorage.getItem('colorTheme') || 'cyan';
        if (mode === 'dark') {
          document.documentElement.classList.add('dark');
        }
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  `,
}} />
```

### Project Data Storage
Custom projects defined in `lib/github.ts`:
- `customProjects` array contains init_VUE, leg_VUE, sp_VUE
- Each has: id, name, description, topics, language
- Modal content in `ProjectModal.tsx` > `getProjectDetails()`

## Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Recent Changes

1. **Multi-Theme System**: Implemented 5 color themes with light/dark mode support
2. **Theme Dropdown**: Added visual theme selector to navigation with hover behavior
3. **Light Mode Backgrounds**: Theme-specific background colors for light mode only
4. **Theme-Aware Components**: Updated all components to use CSS variables
5. **Resume Page**: Created standalone HTML resume matching portfolio style
6. **Navigation Updates**: Added Resume link, reordered to Home | Projects | Resume | Contact | Themes
7. **Fixed Terminal**: Restructured terminal with static intro and scrollable history
8. **Headshot Size**: Increased from 320px to 400px
9. **Modal Z-Index**: Increased to z-[9999] to prevent overlay issues
10. **Dark Mode Default**: Prevents white flash on page load
11. **Resume Theme Sync**: Resume modal now syncs colors with portfolio theme via postMessage
12. **Favicon Update**: New gradient favicon (cyan-to-fuchsia), PNG format for better compatibility
13. **Mobile App Icons**: Separate mobile-specific favicon for home screen icons
14. **Floating Buttons**: Clean scale animation, scroll-to-top emerges from chat button, bounce easing
15. **Mobile Hero Layout**: Left-justified terminal text, responsive photo sizes (150/175/200px)
16. **Project Modal Headers**: Title bar shows path to README.md with `$ cat ./README.md` command
17. **Consistent Stoplight Buttons**: All terminal stoplight buttons are w-3 h-3 (12px) across all screens

## Known Issues/Notes

- Multiple dev servers may be running (kill with `lsof -ti:3000 | xargs kill`)
- Hard refresh (Cmd+Shift+R) may be needed to see changes
- Playwright icon not in react-icons library - using custom SVG
- Projects are private - no GitHub links, using `#` placeholders
- Navigation translation value may need adjustment based on font rendering

## CSS Specificity Notes

For theme backgrounds:
- Use `:root:not(.dark)[data-theme="..."]` for light mode backgrounds
- Use `.dark[data-theme="..."]` for dark mode overrides
- Dark mode backgrounds should always be `#0f0f0f` regardless of theme
- Light mode backgrounds change based on theme

## Next Steps / TODO

- [ ] Add contact form functionality
- [ ] Implement actual email sending
- [ ] Add more projects if needed
- [ ] Consider adding blog section
- [ ] Add analytics
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Accessibility audit
- [ ] Performance optimization

## Git Information

Current directory: `/Users/david.anderson/Downloads/portfolio`
Repository initialized with initial commit

## Contact

- GitHub: https://github.com/d4vid4nderson
- Portfolio showcases work from David Anderson

---

**Last Updated**: 2025-12-09
**Next.js Version**: 16.0.7
**Node Version**: Check with `node -v`

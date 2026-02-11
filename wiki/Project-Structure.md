# Project Structure

Understanding the organization and architecture of the FullStackVibes codebase.

## 📁 Directory Structure

```
fullstackvibes/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Homepage (main entry)
│   ├── layout.tsx               # Root layout with providers
│   ├── globals.css              # Global styles & theme definitions
│   ├── favicon.ico              # Browser favicon
│   ├── icon.png                 # App icons (192x192, 512x512)
│   ├── apple-icon.png           # Apple touch icon (180x180)
│   └── opengraph-image.tsx      # Dynamic OG image generator
│
├── components/                   # React components
│   ├── Hero.tsx                 # Terminal interface (main feature)
│   ├── Projects.tsx             # Projects grid section
│   ├── ProjectCard.tsx          # Individual project card
│   ├── ProjectModal.tsx         # Project detail modal
│   ├── CareerTimeline.tsx       # Backend career timeline
│   ├── FrontendCareerTimeline.tsx  # Frontend career timeline
│   ├── Contact.tsx              # Contact form section
│   ├── Footer.tsx               # Site footer with logo
│   ├── ResumeModal.tsx          # Resume modal with iframe
│   ├── EasterEggsModal.tsx      # Easter eggs reference modal
│   ├── InteractiveImage.tsx     # Rotating avatar image
│   ├── ScrollToTop.tsx          # Scroll to top button
│   ├── ScrollToTopOnLoad.tsx    # Page load scroll reset
│   ├── FloatingButtons.tsx      # AI chat + scroll buttons
│   ├── AIChat.tsx               # AI chatbot interface
│   ├── BackgroundOrbs.tsx       # Animated background
│   ├── PersistentControls.tsx   # Theme/view mode toggles
│   ├── ThemeProvider.tsx        # Theme context provider
│   ├── ChatContext.tsx          # AI chat context provider
│   ├── TerminalContext.tsx      # Terminal state provider
│   ├── ViewModeProvider.tsx     # Frontend/backend view provider
│   ├── StructuredData.tsx       # SEO structured data
│   ├── FrontendHero.tsx         # Frontend view hero
│   ├── FrontendProjects.tsx     # Frontend view projects
│   └── ProjectTimeline.tsx      # Project timeline component
│
├── lib/                         # Utility functions & data
│   ├── github.ts               # GitHub API & project data
│   ├── ai-context.ts           # AI chatbot context
│   └── utils.ts                # Utility functions
│
├── types/                       # TypeScript type definitions
│   └── github.ts               # GitHub API types
│
├── public/                      # Static assets
│   ├── resume.html             # Standalone resume page
│   ├── Headshot_updated.jpg    # Profile photo
│   ├── claude_code.svg         # Claude Code logo
│   ├── playwright.svg          # Playwright icon
│   ├── fsv.ai                  # AI context file
│   ├── favicon-16x16.png       # Small favicon
│   ├── favicon-32x32.png       # Large favicon
│   ├── apple-touch-icon.png    # iOS home screen icon
│   └── [tech-icons].svg        # Technology logos
│
├── .next/                       # Next.js build output (gitignored)
├── node_modules/                # Dependencies (gitignored)
│
├── package.json                 # Project dependencies & scripts
├── package-lock.json            # Dependency lock file
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── .gitignore                   # Git ignore rules
├── .eslintrc.json               # ESLint configuration
├── README.md                    # Project README
└── CLAUDE.md                    # Development guide for Claude
```

---

## 📄 Key Files Explained

### `app/page.tsx`

**Purpose:** Homepage component - main entry point

**Content:**
- Imports and renders all major sections
- Hero (terminal)
- Career timeline
- Projects
- Contact form

**Structure:**
```tsx
export default function Home() {
  return (
    <main>
      <Hero />
      <CareerTimeline />
      <Projects />
      <Contact />
    </main>
  );
}
```

### `app/layout.tsx`

**Purpose:** Root layout with global setup

**Responsibilities:**
- HTML document structure
- Meta tags and SEO
- Font loading (JetBrains Mono)
- Theme/view mode providers
- Background orbs
- Floating buttons
- Analytics

**Provider Hierarchy:**
```
ThemeProvider
  → ViewModeProvider
    → ChatProvider
      → TerminalProvider
        → ScrollToTopOnLoad
        → BackgroundOrbs
        → Children
        → Footer
        → FloatingButtons
        → AIChat
```

### `app/globals.css`

**Purpose:** Global styles, theme definitions, Tailwind setup

**Sections:**
1. **Tailwind Directives** - @tailwind base/components/utilities
2. **Theme Variables** - CSS custom properties for 6 themes
3. **Utility Classes** - Theme-aware utilities (.text-accent, etc.)
4. **Base Styles** - Scrollbar, selection, etc.
5. **Animations** - Custom keyframes

**Theme Structure:**
```css
[data-theme="cyan"] { /* Light mode colors */ }
.dark[data-theme="cyan"] { /* Dark mode colors */ }
:root:not(.dark)[data-theme="cyan"] { /* Light background */ }
```

### `components/Hero.tsx`

**Purpose:** Main terminal interface component (1,443 lines!)

**State Management:**
- Command input
- Command history (string | ReactNode)[]
- Terminal states (career, projects, contact)
- Modal visibility
- Navigation expansion
- Theme menu

**Key Functions:**
- `handleCommand()` - Process terminal commands
- `getCommandMessage()` - Get command output
- `executeCommandAction()` - Execute command actions
- `handleThemeSelection()` - Switch themes

**Command Categories:**
- Navigation (projects, career, contact, resume)
- Social (github, linkedin)
- Display (light, dark, theme)
- AI (ai, chat, claude)
- Utility (clear, reset, help)
- Info (bio, stats, stack, ai)
- Career (hire, status, skills)
- Easter eggs (konami, 42, matrix, etc.)
- Unix (ls, pwd, whoami, ping, etc.)

### `components/ThemeProvider.tsx`

**Purpose:** Theme context and state management

**State:**
- `mode`: 'light' | 'dark'
- `colorTheme`: 'cyan' | 'purple' | 'emerald' | 'orange' | 'blue' | 'lockheed'

**Functions:**
- `toggleMode()` - Switch light/dark
- `setMode()` - Set specific mode
- `setColorTheme()` - Change color theme

**Persistence:**
- Reads from localStorage on mount
- Saves to localStorage on change
- Prevents flash with `mounted` state

### `components/ProjectModal.tsx`

**Purpose:** Detailed project view modal

**Data Structure:**
```typescript
interface ProjectDetails {
  description: string;
  features: string[];
  capabilities: string[];
  techStack: string[];
  alsoIncludes: string[];
}
```

**Function:**
- `getProjectDetails(id)` - Returns project-specific content

**Projects:**
- init_VUE - Initiative tracking
- leg_VUE - Legislative tracking
- sp_VUE - SharePoint testing

### `lib/github.ts`

**Purpose:** GitHub API integration and project data

**Exports:**
- `fetchGitHubRepos()` - Fetch public repos (unused currently)
- `customProjects` - Array of private project data

**Project Structure:**
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
}
```

### `public/resume.html`

**Purpose:** Standalone resume page loaded in modal iframe

**Features:**
- Receives theme updates via postMessage
- Responds to print command
- Self-contained HTML with inline styles
- Theme-aware CSS variables
- Print stylesheet

**Communication:**
```javascript
window.addEventListener('message', (event) => {
  if (event.data.type === 'setTheme') {
    // Update CSS variables
  }
  if (event.data.type === 'print') {
    window.print();
  }
});
```

---

## 🔧 Configuration Files

### `next.config.ts`

**Configuration:**
```typescript
const nextConfig = {
  output: 'export',           // Static export
  images: {
    unoptimized: true,       // For static export
  },
};
```

**Purpose:**
- Static site generation
- Image optimization settings
- Build configuration

### `tailwind.config.ts`

**Configuration:**
- Content paths for Tailwind scanning
- Theme extensions (animations, colors)
- Plugin configurations
- Dark mode class strategy

**Custom Additions:**
- Bounce animation for scroll-to-top
- Custom font family (JetBrains Mono)

### `tsconfig.json`

**Configuration:**
- Strict mode enabled
- Path aliases (`@/*` → `./`)
- React JSX transform
- ES module interop

---

## 🎯 Component Patterns

### Context Providers

**ThemeProvider:**
```typescript
const { mode, colorTheme, setMode, setColorTheme } = useTheme();
```

**ChatProvider:**
```typescript
const { isChatOpen, setIsChatOpen } = useChatContext();
```

**TerminalProvider:**
```typescript
const {
  careerState,
  projectsState,
  contactState,
  restoreTerminal,
  heroMessages,
  addHeroMessage,
  clearHeroMessages
} = useTerminal();
```

**ViewModeProvider:**
```typescript
const { viewMode, toggleViewMode } = useViewMode();
```

### Modal Pattern

All modals follow this structure:

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/80" />

      {/* Modal Content */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl">
          {/* Header with close button */}
          {/* Content */}
        </div>
      </div>
    </div>
  );
}
```

### Custom Hooks

**useTheme:**
- Manages theme state
- Persists to localStorage
- Applies classes to documentElement

**useTerminal:**
- Manages terminal section states
- Provides message queue for Hero
- Restores closed terminals

**useViewMode:**
- Switches between frontend/backend views
- Persists preference
- Updates data-view-mode attribute

---

## 🎨 Styling Architecture

### Global Styles

**Location:** `app/globals.css`

**Sections:**
1. Tailwind imports
2. CSS Variables (theme colors)
3. Utility classes
4. Base element styles
5. Custom animations

### Theme Variables

Each theme defines:
```css
--accent-primary
--accent-secondary
--accent-tertiary
--accent-light
--accent-dark
--background (light mode only)
```

### Utility Classes

**Theme-aware:**
```css
.text-accent
.bg-accent
.bg-accent-dark
.border-accent
.bg-gradient-accent-to-r
.hover-accent
.hover-glow-accent
```

**Standard:**
```css
.gradient-text (multi-color gradient)
```

### Tailwind Classes

Used extensively throughout:
- Spacing: `p-4`, `m-2`, `gap-3`
- Layout: `flex`, `grid`, `absolute`
- Colors: `bg-white`, `text-gray-600`
- Dark mode: `dark:bg-[#0f0f0f]`
- Responsive: `sm:`, `md:`, `lg:`

---

## 📊 State Flow

### Theme State

1. User selects theme
2. ThemeProvider updates state
3. State saved to localStorage
4. CSS attribute updated: `data-theme`
5. CSS variables apply globally
6. Components re-render with new colors

### Terminal State

1. User types command
2. Hero component processes command
3. Command added to history
4. Action executed (scroll, open modal, etc.)
5. Terminal state updated if needed
6. Auto-reset after 20s

### Modal State

1. User triggers modal (command or button)
2. Parent component state: `setShowModal(true)`
3. Modal renders (if isOpen)
4. User closes modal
5. Parent state: `setShowModal(false)`
6. Modal unmounts

---

## 🔌 Integration Points

### GitHub API (Optional)

**File:** `lib/github.ts`
**Function:** `fetchGitHubRepos(username)`
**Currently:** Using static `customProjects` data

### AI Chat (Optional)

**Files:**
- `components/AIChat.tsx` - UI
- `lib/ai-context.ts` - System prompt

**Integration:** Ready for Anthropic Claude API

### Analytics (Optional)

**Services:**
- Vercel Analytics
- Vercel Speed Insights

**Location:** `app/layout.tsx`

---

## 🧪 Testing Structure

Currently no formal test files, but testable architecture:

**Potential test files:**
```
__tests__/
├── components/
│   ├── Hero.test.tsx
│   ├── ProjectCard.test.tsx
│   └── ThemeProvider.test.tsx
├── lib/
│   └── github.test.ts
└── utils/
    └── helpers.test.ts
```

**Testing Tools:**
- Jest
- React Testing Library
- Playwright for E2E

---

## 📦 Build Output

### Development Build

```bash
npm run dev
```

**Output:**
- `.next/` directory
- Hot reload enabled
- Source maps included

### Production Build

```bash
npm run build
```

**Output:**
- `out/` directory (static export)
- Optimized HTML, CSS, JS
- Compressed images
- Minified bundles

**Files Generated:**
```
out/
├── index.html           # Homepage
├── _next/
│   ├── static/          # Static assets
│   └── chunks/          # JS chunks
├── favicon.ico
├── icon-192.png
├── apple-touch-icon.png
└── [images, fonts, etc.]
```

---

## 🔍 Finding Things

### Need to find...

**A terminal command?**
→ Search `components/Hero.tsx` for `case 'command-name':`

**A theme color?**
→ Check `app/globals.css` for `[data-theme="theme-name"]`

**Project data?**
→ Look in `lib/github.ts` customProjects array

**Easter egg?**
→ Search `components/Hero.tsx` or `components/EasterEggsModal.tsx`

**A component?**
→ Check `components/` directory

**Type definition?**
→ Look in `types/` directory

**Configuration?**
→ Root-level config files (`*.config.ts`)

---

## 💡 Best Practices

### Component Organization

1. **Imports** at top (React, Next, external, internal, types)
2. **Types/Interfaces** after imports
3. **Component function** with props destructuring
4. **State hooks** at beginning of component
5. **useEffect hooks** after state
6. **Helper functions** before return
7. **JSX** in return statement

### File Naming

- **Components:** PascalCase (`Hero.tsx`)
- **Utilities:** camelCase (`github.ts`)
- **Types:** camelCase (`github.ts`)
- **Config:** kebab-case (`next.config.ts`)

### Import Aliases

Use `@/` for absolute imports:
```typescript
import { Hero } from '@/components/Hero';
import { fetchRepos } from '@/lib/github';
```

---

**Next:** Read the [Development Guide](Development-Guide) to learn how to customize and contribute! 🚀

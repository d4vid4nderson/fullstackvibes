# Development Guide

Learn how to customize, extend, and contribute to the FullStackVibes portfolio.

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- Code editor (VS Code recommended)
- Terminal/command line

### Initial Setup

```bash
# Clone repository
git clone https://github.com/d4vid4nderson/fullstackvibes.git
cd fullstackvibes

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🎯 Common Customizations

### Adding a New Terminal Command

**Location:** `components/Hero.tsx`

**Step 1:** Add case in `executeCommandAction()`:

```typescript
case 'your-command':
  setCommandHistory(prev => [...prev,
    '',
    '🎯 Your command output here!',
    '',
    '   Add multiple lines if needed',
    '   Use empty strings for spacing',
    ''
  ]);
  break;
```

**Step 2:** (Optional) Add to help command:

```typescript
case 'help':
  setCommandHistory(prev => [...prev,
    // ... existing help text
    '  your-command - Description of your command',
  ]);
  break;
```

**Step 3:** (Optional) Add to Easter Eggs modal:

```typescript
// components/EasterEggsModal.tsx
{
  category: '🎯 Your Category',
  commands: [
    { cmd: 'your-command', desc: 'What it does' },
  ],
}
```

**Step 4:** (Optional) Add to command hints:

```tsx
// At bottom of Hero.tsx
<button onClick={() => handleCommand('your-command', true)}>
  your-command
</button>
```

### Adding a New Theme

**Step 1:** Define colors in `app/globals.css`:

```css
/* Your Theme */
[data-theme="your-theme"] {
  --accent-primary: #your-color;
  --accent-secondary: #your-color;
  --accent-tertiary: #your-color;
  --accent-light: #your-color;
  --accent-dark: #your-color;
}

/* Light mode background */
:root:not(.dark)[data-theme="your-theme"] {
  --background: #your-light-bg;
}

/* Dark mode keeps consistent background */
.dark[data-theme="your-theme"] {
  --background: #0f0f0f;
}
```

**Step 2:** Update TypeScript types in `components/ThemeProvider.tsx`:

```typescript
type ColorTheme = 'cyan' | 'purple' | 'emerald' | 'orange' | 'blue' | 'lockheed' | 'your-theme';
```

**Step 3:** Add theme option in `components/Hero.tsx`:

```typescript
const THEME_OPTIONS = [
  // ... existing themes
  {
    key: 'your-theme',
    name: 'Your Theme Name',
    description: 'Your theme description',
    tagline: 'Your catchy tagline!'
  },
];
```

**Step 4:** Add color swatches in theme dropdown:

```tsx
{theme.key === 'your-theme' && (
  <>
    <div className="w-5 h-5 rounded-full bg-[#color1]"></div>
    <div className="w-5 h-5 rounded-full bg-[#color2]"></div>
    <div className="w-5 h-5 rounded-full bg-[#color3]"></div>
  </>
)}
```

### Creating a New Component

**Example:** Creating a new modal component

```tsx
'use client';

import { FiX } from 'react-icons/fi';

interface YourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function YourModal({ isOpen, onClose }: YourModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-white/10 rounded-2xl w-full max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-white/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Modal Title
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
              aria-label="Close"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Your content here */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Adding a New Project

**Location:** `lib/github.ts`

```typescript
export const customProjects: Project[] = [
  // ... existing projects
  {
    id: 'your-project-id',
    name: 'Your Project Name',
    description: 'Brief description of your project',
    topics: ['go', 'react', 'docker', 'ai', 'etc'],
    language: 'Go', // or Python, TypeScript, etc.
    stargazers_count: 0,
    forks_count: 0,
  },
];
```

**Then add details in `components/ProjectModal.tsx`:**

```typescript
function getProjectDetails(projectId: string): ProjectDetails {
  switch (projectId) {
    // ... existing cases
    case 'your-project-id':
      return {
        description: 'Full project description here',
        features: [
          'Feature 1',
          'Feature 2',
          // ... 8 total features
        ],
        capabilities: [
          'Capability 1',
          'Capability 2',
          // ... 5 total capabilities
        ],
        techStack: ['Go', 'React', 'Docker'],
        alsoIncludes: ['Additional tech', 'More tools'],
      };
    // ...
  }
}
```

---

## 🎨 Styling Guidelines

### Using Theme Colors

**DO:** Use CSS variables for theme-aware colors:
```tsx
<div className="text-accent bg-accent/10 border-accent">
  Theme-aware content
</div>
```

**DON'T:** Hard-code colors:
```tsx
<div className="text-cyan-500 bg-cyan-100">
  This won't change with theme!
</div>
```

### Custom Utility Classes

Available theme utilities in `app/globals.css`:

```css
.text-accent           /* Primary theme color */
.bg-accent            /* Background primary */
.bg-accent-dark       /* Background dark shade */
.border-accent        /* Border primary */
.bg-gradient-accent-to-r  /* 3-color gradient */
.hover-accent         /* Hover text effect */
.hover-glow-accent    /* Hover glow effect */
.gradient-text        /* Multi-color gradient text */
```

### Dark Mode Styling

Always provide dark mode alternatives:

```tsx
<div className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white">
  Content adapts to theme
</div>
```

### Responsive Design

Use Tailwind breakpoints:

```tsx
<div className="text-sm sm:text-base lg:text-lg">
  Scales with screen size
</div>
```

**Breakpoints:**
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+
- `2xl:` - 1536px+

---

## 🔧 Working with Context

### Using ThemeProvider

```tsx
'use client';

import { useTheme } from '@/components/ThemeProvider';

export function YourComponent() {
  const { mode, colorTheme, setMode, setColorTheme } = useTheme();

  return (
    <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      Toggle {mode} mode
    </button>
  );
}
```

### Using TerminalContext

```tsx
'use client';

import { useTerminal } from '@/components/TerminalContext';

export function YourComponent() {
  const { addHeroMessage, restoreTerminal } = useTerminal();

  const handleAction = () => {
    addHeroMessage('✅ Action completed!');
    restoreTerminal('career');
  };

  return <button onClick={handleAction}>Do Something</button>;
}
```

### Creating New Context

```tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface YourContextType {
  value: string;
  setValue: (value: string) => void;
}

const YourContext = createContext<YourContextType | undefined>(undefined);

export function YourProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState('');

  return (
    <YourContext.Provider value={{ value, setValue }}>
      {children}
    </YourContext.Provider>
  );
}

export function useYourContext() {
  const context = useContext(YourContext);
  if (!context) {
    throw new Error('useYourContext must be used within YourProvider');
  }
  return context;
}
```

---

## 📝 Code Style

### Component Structure

```tsx
'use client'; // If using hooks or browser APIs

import { useState, useEffect } from 'react';
import { ExternalLib } from 'external-lib';
import { InternalComponent } from '@/components/InternalComponent';
import { useCustomHook } from '@/hooks/useCustomHook';

interface ComponentProps {
  prop1: string;
  prop2?: number; // Optional prop
}

export function YourComponent({ prop1, prop2 = 0 }: ComponentProps) {
  // 1. State hooks
  const [state, setState] = useState('');

  // 2. Context hooks
  const { value } = useCustomHook();

  // 3. useEffect hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // 4. Helper functions
  const handleAction = () => {
    // Logic
  };

  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Naming Conventions

**Components:** PascalCase
```typescript
export function ProjectCard() { }
```

**Functions:** camelCase
```typescript
const handleCommand = () => { };
```

**Constants:** UPPER_SNAKE_CASE or camelCase
```typescript
const THEME_OPTIONS = [];
const defaultTheme = 'cyan';
```

**Types/Interfaces:** PascalCase
```typescript
interface ProjectDetails { }
type ColorTheme = 'cyan' | 'purple';
```

### TypeScript Best Practices

**DO:** Define prop types
```typescript
interface Props {
  title: string;
  count?: number;
}

function Component({ title, count = 0 }: Props) { }
```

**DO:** Use type unions
```typescript
type Status = 'pending' | 'success' | 'error';
```

**DO:** Type function parameters
```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { };
```

**DON'T:** Use `any`
```typescript
// Bad
const data: any = {};

// Good
interface Data {
  name: string;
  value: number;
}
const data: Data = { name: '', value: 0 };
```

---

## 🧪 Testing

### Setting Up Jest

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**jest.config.js:**
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
```

### Example Component Test

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCard } from '@/components/ProjectCard';

describe('ProjectCard', () => {
  const mockProject = {
    id: 'test',
    name: 'Test Project',
    description: 'Test description',
    // ... other props
  };

  it('renders project name', () => {
    render(<ProjectCard project={mockProject} onOpenModal={() => {}} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('calls onOpenModal when clicked', () => {
    const handleClick = jest.fn();
    render(<ProjectCard project={mockProject} onOpenModal={handleClick} />);

    fireEvent.click(screen.getByRole('article'));
    expect(handleClick).toHaveBeenCalledWith('test');
  });
});
```

---

## 🔍 Debugging

### Development Tools

**React DevTools:**
- Install browser extension
- Inspect component tree
- View props and state
- Track re-renders

**Next.js Debug Mode:**
```bash
NODE_OPTIONS='--inspect' npm run dev
```

Then open `chrome://inspect` in Chrome.

### Common Issues

**White flash on page load:**
- Theme blocking script may be missing in `app/layout.tsx`
- Check localStorage is accessible
- Verify CSS variables are defined

**Terminal commands not working:**
- Check `handleCommand()` function in Hero.tsx
- Verify case statement for command
- Check for typos in command name

**Theme not applying:**
- Verify CSS variables in globals.css
- Check data-theme attribute on html element
- Ensure component uses theme-aware classes

**Modal z-index issues:**
- Use z-[9999] for modals
- Check for conflicting fixed/sticky elements
- Verify backdrop covers full viewport

---

## 📊 Performance Optimization

### Image Optimization

Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority // For above-fold images
  quality={90}
/>
```

### Code Splitting

Use dynamic imports for large components:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { loading: () => <p>Loading...</p> }
);
```

### Memoization

Use React.memo for expensive components:

```tsx
import { memo } from 'react';

export const ExpensiveComponent = memo(function ExpensiveComponent(props) {
  // Component logic
});
```

---

## 🚀 Building for Production

### Build Command

```bash
npm run build
```

**Output:** `out/` directory with static files

### Build Optimization

The build process:
1. Type checks TypeScript
2. Lints code with ESLint
3. Compiles and bundles code
4. Optimizes images
5. Generates static HTML
6. Minifies CSS and JS
7. Creates service worker (if configured)

### Verifying Build

```bash
# Serve the static build locally
npx serve out

# Or use Next.js start (requires build first)
npm run start
```

---

## 🤝 Contributing Guidelines

### Branching Strategy

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/your-feature-name

# Create pull request on GitHub
```

### Commit Messages

Use conventional commits:

```
feat: add new terminal command
fix: resolve theme switching bug
docs: update README with examples
style: format code with prettier
refactor: simplify command handling
test: add unit tests for ThemeProvider
chore: update dependencies
```

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Run linter: `npm run lint`
5. Build successfully: `npm run build`
6. Push to your fork
7. Open pull request with description

---

## 📚 Additional Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

### Tools

- [VS Code](https://code.visualstudio.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Community

- [GitHub Issues](https://github.com/d4vid4nderson/fullstackvibes/issues)
- [GitHub Discussions](https://github.com/d4vid4nderson/fullstackvibes/discussions)

---

**Next:** Learn how to [Deploy](Deployment-Guide) your customized version to production! 🚀

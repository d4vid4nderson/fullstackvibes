# Theme System

FullStackVibes features a comprehensive theming system with 6 unique color themes and light/dark mode support. Every theme is carefully crafted with pop culture references and custom color palettes.

## 🎨 Available Themes

### 1. Water of Life (Cyan) - **Default**

**Reference:** Dune's "Water of Life" - the transformative spice melange essence

**Tagline:** "He who controls the Spice controls the universe!"

**Colors:**
- Primary: `#06b6d4` (Cyan-500)
- Secondary: `#14b8a6` (Teal-500)
- Tertiary: `#0891b2` (Cyan-600)
- Light: `#67e8f9` (Cyan-300)
- Dark: `#0e7490` (Cyan-700)

**Light Mode Background:** `#cffafe` (Cyan-100) - Resembling the desert sky of Arrakis

**Best For:** Clean, professional look with oceanic vibes

---

### 2. One Ring (Gold/Amber)

**Reference:** Lord of the Rings - The One Ring to rule them all

**Tagline:** "One theme to rule them all!"

**Colors:**
- Primary: `#eab308` (Yellow-500)
- Secondary: `#f59e0b` (Amber-500)
- Tertiary: `#ea580c` (Orange-600)
- Light: `#fde047` (Yellow-300)
- Dark: `#a16207` (Yellow-700)

**Light Mode Background:** `#fef3c7` (Amber-100) - Golden light of the Elven realms

**Best For:** Warm, regal, eye-catching appearance

**Fun Fact:** The gradient mimics the golden glow of the One Ring when heated.

---

### 3. Bag End (Emerald)

**Reference:** The Hobbit - Bilbo Baggins' cozy home in The Shire

**Tagline:** "There and back again!"

**Colors:**
- Primary: `#10b981` (Emerald-500)
- Secondary: `#059669` (Emerald-600)
- Tertiary: `#34d399` (Emerald-400)
- Light: `#6ee7b7` (Emerald-300)
- Dark: `#047857` (Emerald-700)

**Light Mode Background:** `#d1fae5` (Emerald-100) - The rolling green hills of the Shire

**Best For:** Peaceful, natural, growth-oriented aesthetic

---

### 4. Arrakis (Orange)

**Reference:** Dune - The desert planet where spice is harvested

**Tagline:** "Fear is the mind-killer... but this theme is fire!"

**Colors:**
- Primary: `#f97316` (Orange-500)
- Secondary: `#fb923c` (Orange-400)
- Tertiary: `#ea580c` (Orange-600)
- Light: `#fdba74` (Orange-300)
- Dark: `#c2410c` (Orange-700)

**Light Mode Background:** `#ffedd5` (Orange-100) - Burning sands of Arrakis

**Best For:** Bold, energetic, attention-grabbing design

**Fun Fact:** The orange tones represent the desert sands and the spice melange.

---

### 5. Saber Battle (Blue)

**Reference:** Star Wars - Lightsaber duels between Jedi and Sith

**Tagline:** "Choose your side!"

**Colors:**
- Primary: `#3b82f6` (Blue-500) - Jedi blue
- Secondary: `#60a5fa` (Blue-400) - Light side
- Tertiary: `#2563eb` (Blue-600) - Deep Jedi blue
- Light: `#93c5fd` (Blue-300)
- Dark: `#1e40af` (Blue-700)

**Light Mode Background:** `#dbeafe` (Blue-100) - The light side of the Force

**Best For:** Classic, trustworthy, tech-focused appearance

**Easter Egg:** The gradient transitions from blue (Jedi) through fuchsia to red (Sith)

---

### 6. Skunk Works (Stealth Gray)

**Reference:** Lockheed Martin's legendary Advanced Development Programs division

**Tagline:** "Innovation at the speed of need!"

**Colors (Light Mode):**
- Primary: `#2a2a2a` (Dark Gray)
- Secondary: `#3f3f3f` (Mid-Dark Gray)
- Tertiary: `#595959` (Medium Gray)
- Light: `#737373` (Light Gray)
- Dark: `#0a0a0a` (Nearly Black)

**Colors (Dark Mode):**
- Primary: `#a8a8a8` (Light Gray)
- Secondary: `#8c8c8c` (Mid Gray)
- Tertiary: `#707070` (Medium Gray)
- Light: `#c4c4c4` (Bright Gray)
- Dark: `#545454` (Dark Gray)

**Light Mode Background:** Maintains dark `#0f0f0f` for stealth aesthetic

**Best For:** Sleek, classified, military-grade appearance

**Special Features:**
- Stealth mode activation message with plane emoji
- Warning messages when switching to light mode
- Success messages when re-engaging dark mode

**Unique Behavior:** This theme has special terminal messages:

**Deactivating Stealth (→ Light Mode):**
```
⚠️  STEALTH SYSTEMS DEACTIVATING
   RADAR SIGNATURE: EXPOSED | EMISSIONS: ACTIVE | THREAT LEVEL: HIGH
```

**Re-engaging Stealth (→ Dark Mode):**
```
✅ STEALTH SYSTEMS ONLINE
   RADAR SIGNATURE: MINIMAL | EMISSIONS: SUPPRESSED | STATUS: DARK
```

---

## 🌓 Light & Dark Mode

All 6 themes support both light and dark modes, giving you 12 total appearance options!

### Dark Mode (Default)
- Background: `#0f0f0f` (Almost black) - consistent across all themes
- Cards: `#1a1a1a` (Very dark gray)
- Text: White, gray-300, gray-400
- Footer: `#0a0a0a` (Darker than background)

### Light Mode
- Background: Theme-specific (cyan-100, amber-100, emerald-100, etc.)
- Cards: White with subtle borders
- Text: Gray-900, gray-700, gray-600
- Footer: Slightly darker than background

### Mode Persistence
Your mode preference (light/dark) is saved to `localStorage` and persists across sessions. No more being blinded by unexpected light mode!

---

## 🎯 How to Change Themes

### Method 1: Terminal Command
```bash
> theme
```
Type `theme` or `themes` in the terminal to open the theme selection menu. Then type a number (1-6) to select your theme.

### Method 2: Navigation Dropdown (Desktop)
1. Hover over `<>Full Stack Vibes` to reveal navigation
2. Hover over "Themes"
3. Click any theme from the dropdown with color swatches

### Method 3: Click Navigation (Mobile)
1. Tap `<>FullStackVibes` to expand navigation
2. Click "Themes" (opens modal on mobile)
3. Select your theme

---

## 🔧 Technical Implementation

### CSS Custom Properties

Themes use CSS variables defined in `app/globals.css`:

```css
/* Example: Cyan theme */
[data-theme="cyan"] {
  --accent-primary: #06b6d4;
  --accent-secondary: #14b8a6;
  --accent-tertiary: #0891b2;
  --accent-light: #67e8f9;
  --accent-dark: #0e7490;
}

/* Light mode background (only applies when not in dark mode) */
:root:not(.dark)[data-theme="cyan"] {
  --background: #cffafe;
}

/* Dark mode background override */
.dark[data-theme="cyan"] {
  --background: #0f0f0f;
}
```

### Theme Utility Classes

Custom Tailwind utilities for theme-aware styling:

```css
.text-accent { color: var(--accent-primary); }
.bg-accent { background-color: var(--accent-primary); }
.bg-accent-dark { background-color: var(--accent-dark); }
.border-accent { border-color: var(--accent-primary); }

.bg-gradient-accent-to-r {
  background: linear-gradient(
    135deg,
    var(--accent-primary),
    var(--accent-secondary),
    var(--accent-tertiary)
  );
}

.hover-accent:hover { color: var(--accent-light); }
.hover-glow-accent:hover {
  filter: drop-shadow(0 0 8px var(--accent-primary));
}
```

### Theme Context

Managed by `ThemeProvider.tsx`:

```typescript
type Mode = 'light' | 'dark';
type ColorTheme = 'cyan' | 'purple' | 'emerald' | 'orange' | 'blue' | 'lockheed';

const { mode, colorTheme, setMode, setColorTheme } = useTheme();
```

### Storage

Theme preferences persist in `localStorage`:
- `mode`: 'light' | 'dark'
- `colorTheme`: 'cyan' | 'purple' | 'emerald' | 'orange' | 'blue' | 'lockheed'

### Preventing Flash

Blocking script in `app/layout.tsx` applies theme before hydration:

```javascript
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

This prevents the white flash on page load!

---

## 🎨 Theme Animation

When switching themes, there's a smooth flash animation:

1. Document brightness increases to 1.3
2. Saturation increases to 1.5
3. Theme switches at 250ms
4. Properties return to normal at 500ms
5. Transition removed after completion

**Code:**
```typescript
document.documentElement.style.transition = 'filter 0.5s ease-in-out';
document.documentElement.style.filter = 'brightness(1.3) saturate(1.5)';

setTimeout(() => {
  setColorTheme(themeKey);
}, 250);

setTimeout(() => {
  document.documentElement.style.filter = 'brightness(1) saturate(1)';
}, 500);
```

---

## 🎯 Theme-Aware Components

All major components use theme variables:

### Hero Section
- Avatar border: `bg-gradient-accent-to-r`
- Command prompt: `text-accent`
- Metrics badges: `bg-accent/10 border-accent/20`

### Project Cards
- Tech badges: `text-accent`
- Hover border: `hover:border-accent`
- Card glow: `shadow-accent-primary/50`

### Career Timeline
- Git commit circles: `bg-accent-dark`
- Branch lines: `border-accent-primary/50`
- Active state: `shadow-accent-primary/50`

### Footer
- Claude Code logo: Uses SVG mask with `bg-gradient-accent-to-r`
- Social icons: `hover-glow-accent`
- Heart icon: `text-accent`

### Buttons
- Primary: `bg-accent hover:bg-accent-dark`
- Secondary: `border-accent text-accent hover:bg-accent hover:text-white`

---

## 🌈 Creating Custom Themes

Want to add your own theme? Here's how:

### Step 1: Add CSS Variables

In `app/globals.css`:

```css
[data-theme="your-theme"] {
  --accent-primary: #your-color;
  --accent-secondary: #your-color;
  --accent-tertiary: #your-color;
  --accent-light: #your-color;
  --accent-dark: #your-color;
}

:root:not(.dark)[data-theme="your-theme"] {
  --background: #your-light-bg;
}

.dark[data-theme="your-theme"] {
  --background: #0f0f0f;
}
```

### Step 2: Update TypeScript Types

In `components/ThemeProvider.tsx`:

```typescript
type ColorTheme = 'cyan' | 'purple' | 'emerald' | 'orange' | 'blue' | 'lockheed' | 'your-theme';
```

### Step 3: Add Theme Option

In `components/Hero.tsx`:

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

### Step 4: Add Color Swatches (Optional)

In `components/Hero.tsx` theme dropdown, add the color circles:

```tsx
{theme.key === 'your-theme' && (
  <>
    <div className="w-5 h-5 rounded-full bg-[#color1]"></div>
    <div className="w-5 h-5 rounded-full bg-[#color2]"></div>
    <div className="w-5 h-5 rounded-full bg-[#color3]"></div>
  </>
)}
```

---

## 🎭 Theme Philosophy

### Why These Themes?

Each theme was chosen for specific reasons:

1. **Pop Culture References** - Instant emotional connection
2. **Color Psychology** - Each palette evokes different feelings
3. **Accessibility** - All themes meet WCAG contrast guidelines
4. **Brand Identity** - Professional yet playful
5. **User Choice** - Let visitors customize their experience

### Theme Design Principles

1. **Consistency** - All themes use the same CSS variable names
2. **Accessibility** - Sufficient contrast in both light and dark modes
3. **Gradients** - Three-color gradients for visual interest
4. **Cohesion** - Themes feel related but distinct
5. **Performance** - CSS variables for instant switching

---

## 📊 Theme Usage Analytics

Want to know which themes are most popular? Consider adding analytics:

```typescript
// Track theme changes
const handleThemeChange = (theme: ColorTheme) => {
  setColorTheme(theme);

  // Optional: Track with your analytics service
  analytics.track('Theme Changed', {
    theme: theme,
    previousTheme: colorTheme
  });
};
```

---

## 🎨 Theme Showcase

### Color Palette Comparison

| Theme | Primary | Secondary | Tertiary | Vibe |
|-------|---------|-----------|----------|------|
| **Water of Life** | Cyan | Teal | Deep Cyan | Oceanic, Cool |
| **One Ring** | Gold | Amber | Orange | Regal, Warm |
| **Bag End** | Emerald | Green | Light Green | Natural, Peaceful |
| **Arrakis** | Orange | Light Orange | Dark Orange | Energetic, Bold |
| **Saber Battle** | Blue | Light Blue | Deep Blue | Classic, Tech |
| **Skunk Works** | Dark Gray | Mid Gray | Medium Gray | Stealth, Military |

---

## 💡 Theme Tips

1. **Try Them All** - Each theme completely changes the feel of the site
2. **Match Your Mood** - Different themes for different times
3. **Light Mode** - Don't forget to try light mode with each theme!
4. **Mobile Testing** - Themes look different on various screen sizes
5. **Dark Mode Default** - Site loads in dark mode to prevent flash
6. **Persistence** - Your choice is saved and remembered
7. **Easter Eggs** - Some themes have special features (looking at you, Skunk Works)

---

## 🔮 Future Theme Ideas

Potential themes for future updates:

- **Matrix Green** - Green monochrome with falling code effect
- **Cyberpunk Pink/Blue** - Neon cyberpunk aesthetics
- **Monokai** - Developer favorite code editor theme
- **Dracula** - Dark purple vampire theme
- **Nord** - Cool arctic color palette
- **Tokyo Night** - Japanese city lights at night

**Want to suggest a theme?** Open an issue on [GitHub](https://github.com/d4vid4nderson/fullstackvibes/issues)!

---

**Next:** Explore the [Features Documentation](Features-Documentation) for detailed information about all interactive features! ✨

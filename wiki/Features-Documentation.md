# Features Documentation

Comprehensive documentation of all interactive features, components, and functionality in the FullStackVibes portfolio.

## 🖥️ Interactive Terminal Interface

The centerpiece of the portfolio is a fully functional terminal interface that responds to 30+ commands.

### Terminal Components

**Header Bar:**
- Three traffic light buttons (red, yellow, green)
- Username display: `david@fullstackvibes:~`

**Terminal Content:**
- Whoami section with name, role, and bio
- Interactive headshot with gradient border (150px-200px responsive)
- Key metrics badges ($400K+ saved, 6 AI apps, 12+ years)
- Tech stack display
- Scrollable command history (max-height: 256px desktop, 384px mobile)
- Active command input with cursor
- Clickable command hints

### Command History

**Features:**
- Displays last executed commands and their outputs
- Scrolls automatically to show latest output
- Supports both string and React element rendering
- Auto-resets after 20 seconds of inactivity with fade animation
- Conditional styling for warnings (⚠️) and success (✅) messages

**Special Message Types:**
- **Warning Messages** - Red background with red border (e.g., stealth deactivation)
- **Success Messages** - Green background with green border (e.g., stealth activation)
- **Regular Output** - Gray text

### Command Input

**Behavior:**
- Auto-focuses on component mount
- Executes command on Enter key
- Supports fuzzy matching for typos
- Clears after each command
- Shows placeholder: "type your command to begin."

### Command Execution Modes

**Immediate Mode:**
- User types command and presses Enter
- Command executes instantly

**Delayed Mode:**
- User clicks command hint button
- Message displays immediately
- Action executes after 1-second delay
- Better UX for clicked commands

---

## 🎨 Multi-Theme System

### 6 Color Themes

1. **Water of Life** (Cyan) - Default
2. **One Ring** (Gold/Amber)
3. **Bag End** (Emerald)
4. **Arrakis** (Orange)
5. **Saber Battle** (Blue)
6. **Skunk Works** (Stealth Gray)

### Theme Features

- CSS custom properties for dynamic theming
- Light/dark mode support for all themes
- Smooth transition animations
- LocalStorage persistence
- No flash on page load
- Theme-aware components

### Theme Selection UI

**Desktop:**
- Hover dropdown from navigation
- Visual color swatches (3 circles per theme)
- Theme name and description
- Instant preview on click

**Terminal:**
- Type `theme` command
- Shows numbered list with descriptions
- Type number 1-6 to select
- Animated activation sequence

---

## 🎯 Navigation System

### Hidden Navigation Easter Egg (Desktop)

**Default State:**
```
<>Full Stack Vibes
```

**Hover State:**
```
< Home | Projects | Resume | Contact | Themes >Full Stack Vibes
```

**Features:**
- Auto-expands on page load for 2 seconds
- Smooth 500ms animation
- Equal 28px spacing on both sides
- Dropdown theme selector

**Navigation Links:**
- Home - Scrolls to top
- Career - Scrolls to career section, restores terminal if closed
- Projects - Scrolls to projects section, restores terminal if closed
- Resume - Opens resume modal
- Contact - Scrolls to contact section, restores terminal if closed
- Themes - Hover dropdown with theme selector

### Mobile Navigation

**Tap-to-Reveal:**
- Tap `<>FullStackVibes` to expand navigation
- Shows: Career | Projects | Resume | Contact
- Title contracts to "FSV" when expanded
- Smooth slide animation

---

## 📊 Career Timeline (Backend View)

### Git-Style Timeline

Designed to look like `git log --graph` output with professional experience as commits.

**Components:**
- Git commit circles (12px diameter)
- Connecting branch lines
- Expandable role cards
- Skills badges
- Achievement lists

**Interactivity:**
- Click any circle to expand/collapse role
- Smooth height transitions
- Skills display with icon badges
- Key achievements as bullet points

**Visual Design:**
- Uses `bg-accent-dark` for active circles
- White icons on filled circles
- Theme-aware colors throughout
- Responsive spacing

---

## 💼 Projects Section

### Project Cards

**Three Featured Projects:**
1. **init_VUE** - Initiative Tracking Platform (Go)
2. **leg_VUE** - Legislative Tracking Platform (Python)
3. **sp_VUE** - SharePoint Testing Platform (Go)

**Card Features:**
- Language badge with icon
- GitHub stats (stars, forks) - private repo placeholders
- Tech stack icons (first 6 technologies)
- Hover effects with theme-aware border glow
- Click to open detailed modal

**Tech Stack Icons:**
Custom icon mapping system:
- Go, Python, React, TypeScript, JavaScript
- FastAPI, PostgreSQL, Docker
- Tailwind CSS, HTMX
- Claude AI (custom), Playwright (custom)

### Project Modal

**Header:**
- Project name and description
- README.md style title bar: `$ cat ./README.md`
- Close button (X icon)

**Content Sections:**
1. **Overview** - Detailed project description
2. **Key Features** - 8 main features per project
3. **Core Capabilities** - 5 core technical capabilities
4. **Tech Stack** - Technology badges with icons
5. **Also Includes** - Additional technologies
6. **Privacy Note** - For confidential projects

**Styling:**
- Z-index: 9999 for proper layering
- Backdrop blur
- Responsive padding
- Theme-aware colors

---

## 📄 Resume Modal

### Features

- Full HTML resume displayed in iframe
- Theme synchronization via postMessage
- Light/dark mode toggle within modal
- PDF download button (triggers print dialog)
- Theme colors update in real-time

### Resume Sections

1. Contact information
2. Professional summary
3. Skills (Languages, Frameworks, AI/ML, DevOps)
4. Work experience
5. Personal projects
6. Education

### Theme Sync Implementation

**Parent to iframe:**
```typescript
iframeRef.current.contentWindow.postMessage({
  type: 'setTheme',
  mode: mode,
  colors: themeColors[colorTheme]
}, '*');
```

**Print Functionality:**
```typescript
iframeRef.current.contentWindow.postMessage({
  type: 'print'
}, '*');
```

---

## 🥚 Easter Eggs Modal

### Features

- Opens with `eastereggs` command
- Organized into 5 categories
- Clickable command cards
- Click card → closes modal + runs command
- Hover effects on cards

### Categories

1. 🦨 **Skunk Works** - Lockheed aircraft commands
2. 🎮 **Gaming & Pop Culture** - Konami, Matrix, Hitchhiker's Guide
3. ☕ **Developer Humor** - Coffee, Vim, sudo commands
4. 🖥️ **Unix Commands** - ls, pwd, whoami, ping, etc.
5. 📊 **Career Info** - hire, status, skills commands

### Command Cards

**Structure:**
- Command name in accent color
- Description text
- Hover: Border changes to accent color
- Hover: Background lightens slightly
- Click: Executes command automatically

---

## 🤖 AI Chat Assistant

### Features

- Floating chat button (bottom-right)
- Opens chat sidebar
- Powered by Claude (anthropic)
- Persists conversation history
- Typing indicators
- Markdown message rendering

### Access Methods

1. Type `ai`, `chat`, `claude`, or `bot` in terminal
2. Click floating chat button
3. Use `/ai` or `/chat` slash commands

### Chat UI

- Message bubbles (user vs assistant)
- Timestamp on messages
- Auto-scroll to latest
- Input field at bottom
- Send button
- Close button

---

## 🔘 Floating Action Buttons

### Buttons

**AI Chat Button:**
- Always visible
- Opens AI chat sidebar
- Smooth scale animation
- Theme-aware accent color

**Scroll to Top Button:**
- Appears after scrolling down 400px
- Emerges from chat button location
- Smooth scale animation with bounce easing
- Returns to chat button position when hidden

### Animation Details

- Entry: `scale-0` → `scale-100`
- Timing: 300ms duration
- Easing: Bounce for scroll-to-top
- Position: Fixed bottom-right with responsive spacing

---

## 📱 Responsive Design

### Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile Optimizations

**Hero Terminal:**
- Headshot sizes: 150px (mobile) → 175px (tablet) → 200px (desktop)
- Terminal text left-justified
- Photo above content on mobile
- Reduced padding and margins

**Navigation:**
- Tap-to-reveal instead of hover
- Compact command layout
- Vertical button stacking

**Timeline:**
- Smaller commit circles
- Reduced spacing
- Simplified branch graphics

**Modals:**
- Full-screen on mobile
- Reduced padding
- Scrollable content

---

## 🎭 Animations & Transitions

### Theme Switching

```css
filter: brightness(1.3) saturate(1.5);
transition: filter 0.5s ease-in-out;
```

**Sequence:**
1. Flash effect (250ms)
2. Theme change
3. Return to normal (500ms)

### Terminal History

- Fade in: New commands slide in
- Fade out: Auto-reset after 20s
- Duration: 500ms
- Easing: ease-out

### Navigation

- Expand: 500ms ease-in-out
- Bracket translation
- Menu opacity fade
- Smooth width transition

### Hover Effects

- Project cards: Border glow
- Buttons: Scale + glow
- Links: Underline slide
- Icons: Drop shadow

### Scroll Animations

- Scroll to top: Smooth scroll behavior
- Section navigation: 100ms delay for terminal restore

---

## 🌐 SEO Features

### Metadata

- Dynamic title and description
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Canonical URLs
- Robots.txt directives

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "David Anderson",
  "jobTitle": "Solutions Architect",
  ...
}
```

### Image Optimization

- Next.js Image component
- Responsive images
- WebP format support
- Lazy loading
- Priority loading for hero

---

## ⚡ Performance Features

### Static Export

- Pre-rendered at build time
- No server required
- Fast CDN delivery
- Instant page loads

### Code Splitting

- Route-based splitting
- Component lazy loading
- Dynamic imports for modals

### Optimization

- Minified CSS/JS
- Tree shaking
- Dead code elimination
- Image optimization

### Caching

- LocalStorage for theme preferences
- Service worker ready
- Cache-Control headers

---

## 🔧 Developer Features

### TypeScript

- Full type safety
- Interface definitions
- Type inference
- Strict mode enabled

### Component Architecture

- Functional components
- Custom hooks
- Context providers
- Separation of concerns

### State Management

- React Context API
- LocalStorage persistence
- Multiple providers
- Clean state updates

### Error Handling

- Try-catch blocks
- Graceful fallbacks
- Console logging
- User-friendly errors

---

## 🎯 Accessibility Features

### Keyboard Navigation

- Tab through all interactive elements
- Enter to activate buttons
- Escape to close modals
- Focus visible indicators

### ARIA Labels

- Descriptive button labels
- Modal role attributes
- Navigation landmarks
- Live region announcements

### Color Contrast

- WCAG AA compliance
- Sufficient contrast ratios
- Dark mode alternatives
- Colorblind-friendly palettes

### Screen Readers

- Semantic HTML
- Alt text for images
- Descriptive link text
- Proper heading hierarchy

---

## 📱 Cross-Browser Support

### Tested Browsers

- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS/iOS)
- Samsung Internet
- Opera

### Fallbacks

- CSS custom property support detection
- LocalStorage availability check
- Graceful degradation
- Progressive enhancement

---

## 🔒 Security Features

### Content Security

- No inline scripts (except theme blocker)
- Sanitized user inputs
- No eval() usage
- Safe external links (target="_blank" with noopener)

### Data Privacy

- No analytics tracking (optional)
- LocalStorage only for preferences
- No cookies
- No third-party trackers

---

## 🎨 Design System

### Typography

- Font: JetBrains Mono (monospace)
- Weights: 400, 500, 600, 700
- Responsive sizing
- Line height optimization

### Spacing

- 4px base unit
- Consistent padding/margin
- Responsive breakpoints
- Grid-based layouts

### Colors

- Theme-based palettes
- Grayscale neutrals
- Semantic colors (success, warning, error)
- Alpha transparency support

### Components

- Reusable button styles
- Consistent card design
- Unified modal patterns
- Standard icon sizing

---

**Next:** Learn about the [Project Structure](Project-Structure) to understand how the code is organized! 📁

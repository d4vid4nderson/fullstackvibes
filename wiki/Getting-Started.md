# Getting Started

This guide will help you clone, install, and run the FullStackVibes portfolio locally on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

Check your versions:
```bash
node -v
npm -v
git --version
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/d4vid4nderson/fullstackvibes.git
cd fullstackvibes
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16.0.7
- React 19
- TypeScript 5
- Tailwind CSS 4.0
- react-icons
- Other dependencies

### 3. Run the Development Server

```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

### 4. Open in Browser

Navigate to `http://localhost:3000` in your web browser. You should see the terminal interface with the hero section.

## Available Scripts

### Development

```bash
npm run dev
```
Starts the Next.js development server with Turbopack for fast refresh.

### Build

```bash
npm run build
```
Creates an optimized production build of the application.

### Start Production Server

```bash
npm run start
```
Runs the production build locally (requires running `npm run build` first).

### Lint

```bash
npm run lint
```
Runs ESLint to check for code quality issues.

### Type Check

```bash
npx tsc --noEmit
```
Checks TypeScript types without building.

## Project Structure Overview

```
fullstackvibes/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx          # Terminal interface
│   ├── Projects.tsx      # Projects section
│   ├── ThemeProvider.tsx # Theme management
│   └── ...
├── lib/                   # Utilities and helpers
├── public/               # Static assets
├── types/                # TypeScript definitions
└── package.json          # Dependencies
```

## Environment Setup

This project doesn't require environment variables for basic functionality. However, if you want to enable the AI chat feature, you'll need to set up:

```bash
# Create .env.local file
NEXT_PUBLIC_AI_ENABLED=true
# Add your AI API keys if implementing chat
```

## Common Issues

### Port 3000 Already in Use

If port 3000 is occupied, you can:

**Option 1:** Kill the process using port 3000
```bash
lsof -ti:3000 | xargs kill
```

**Option 2:** Use a different port
```bash
npm run dev -- -p 3001
```

### Module Not Found Errors

If you encounter module errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

If you encounter build errors:
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Type Errors

If TypeScript shows errors:
```bash
# Check types explicitly
npx tsc --noEmit
```

## Hot Reload Not Working?

If changes aren't appearing:
1. Hard refresh the browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. Restart the dev server: Stop (`Ctrl + C`) and run `npm run dev` again
3. Clear browser cache
4. Check console for errors

## Next Steps

Once you have the project running:

1. **[Explore Features](Features-Documentation)** - Learn about all the interactive features
2. **[Try Terminal Commands](Terminal-Commands-Reference)** - Type `help` in the terminal
3. **[Discover Easter Eggs](Easter-Eggs-Guide)** - Find hidden surprises
4. **[Customize Themes](Theme-System)** - Try different color themes
5. **[Read Development Guide](Development-Guide)** - Learn how to customize and contribute

## Getting Help

If you encounter issues not covered here:

1. Check the [Project Structure](Project-Structure) page
2. Review the [Development Guide](Development-Guide)
3. Open an issue on [GitHub](https://github.com/d4vid4nderson/fullstackvibes/issues)
4. Contact: david4nderson@pm.me

---

**Ready to explore?** Head to the [Features Documentation](Features-Documentation) to learn about all the cool features! 🚀

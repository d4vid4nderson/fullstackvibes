'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';
import { ResumeModal } from './ResumeModal';

// Theme options for dropdown
const THEME_OPTIONS: { key: 'cyan' | 'purple' | 'emerald' | 'orange' | 'blue'; name: string }[] = [
  {
    key: 'cyan',
    name: 'Water of Life',
  },
  {
    key: 'purple',
    name: 'One Ring',
  },
  {
    key: 'emerald',
    name: 'Bag End',
  },
  {
    key: 'orange',
    name: 'Arrakis',
  },
  {
    key: 'blue',
    name: 'Saber Battle',
  },
];

const STATS = [
  { value: '$400K+', label: 'Cost Savings', href: '#career' },
  { value: '6', label: 'AI Apps Shipped', href: '#projects' },
  { value: '12+', label: 'Years Experience', href: '#career' },
];

export function FrontendHero() {
  const { setColorTheme } = useTheme();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [navWidth, setNavWidth] = useState(0);
  const navMenuRef = useRef<HTMLDivElement>(null);

  // Measure nav width for animation
  useEffect(() => {
    if (!navMenuRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setNavWidth(entry.contentRect.width);
      }
    });

    observer.observe(navMenuRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto-expand navigation on page load, hold for 2 seconds, then collapse
  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setIsNavExpanded(true);
    }, 100);

    const collapseTimer = setTimeout(() => {
      setIsNavExpanded(false);
    }, 2100);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(collapseTimer);
    };
  }, []);

  const navSpacing = 28;
  const navShift = navWidth + navSpacing;
  const closingTransformStyle = { '--nav-shift': `${navShift}px` } as React.CSSProperties;

  return (
    <section className="relative min-h-screen bg-[var(--background)]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.12] blur-3xl"
          style={{
            background: `radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)`,
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.06] blur-3xl"
          style={{
            background: `radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)`,
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-[0.03] blur-3xl"
          style={{
            background: `conic-gradient(from 0deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary), var(--accent-primary))`,
            animation: 'spin 20s linear infinite',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Full Stack Vibes with hidden navigation easter egg - desktop only */}
        <nav className="absolute top-12 left-4 sm:left-6 lg:left-8 group/nav cursor-pointer hidden md:block" aria-label="Main navigation">
          <div className="flex items-center text-accent dark:text-accent font-mono text-lg">
            <div className="flex items-center relative gap-0">
              {/* Opening bracket stays in place */}
              <span>&lt;</span>

              {/* Hidden navigation - appears between brackets on hover */}
              <div
                ref={navMenuRef}
                className={`absolute left-7 flex items-center divide-x divide-gray-300 dark:divide-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-500 ease-in-out pr-7 ${
                  isNavExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto`}
              >
                <a href="/" className="px-3 whitespace-nowrap hover-accent hover-glow-accent transition-all focus:outline-none focus:text-accent">
                  Home
                </a>
                <a href="#career" className="px-3 whitespace-nowrap hover-accent hover-glow-accent transition-all focus:outline-none focus:text-accent">
                  Career
                </a>
                <a href="#projects" className="px-3 whitespace-nowrap hover-accent hover-glow-accent transition-all focus:outline-none focus:text-accent">
                  Projects
                </a>
                <button onClick={() => setShowResumeModal(true)} className="px-3 whitespace-nowrap hover-accent hover-glow-accent transition-all focus:outline-none focus:text-accent">
                  Resume
                </button>
                <a href="#contact" className="px-3 whitespace-nowrap hover-accent hover-glow-accent transition-all focus:outline-none focus:text-accent">
                  Contact
                </a>
                <div className="relative group/themes px-3">
                  <button className="hover-accent hover-glow-accent transition-all whitespace-nowrap">
                    Themes
                  </button>
                  {/* Theme Selection Dropdown */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 opacity-0 pointer-events-none group-hover/themes:opacity-100 group-hover/themes:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-300 dark:border-white/10 p-4 min-w-[300px]">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Select Theme</h3>
                      <div className="flex flex-col gap-2">
                        {THEME_OPTIONS.map((theme) => (
                          <button
                            key={theme.key}
                            onClick={() => setColorTheme(theme.key)}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors text-left"
                          >
                            <div className="flex gap-1">
                              {theme.key === 'cyan' && (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-[#06b6d4] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#0ea5e9] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#3b82f6] border border-gray-300 dark:border-white/20"></div>
                                </>
                              )}
                              {theme.key === 'purple' && (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-[#eab308] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#f59e0b] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#ea580c] border border-gray-300 dark:border-white/20"></div>
                                </>
                              )}
                              {theme.key === 'emerald' && (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-[#4ade80] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#22c55e] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#15803d] border border-gray-300 dark:border-white/20"></div>
                                </>
                              )}
                              {theme.key === 'orange' && (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-[#f97316] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#fb923c] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#ea580c] border border-gray-300 dark:border-white/20"></div>
                                </>
                              )}
                              {theme.key === 'blue' && (
                                <>
                                  <div className="w-5 h-5 rounded-full bg-[#3b82f6] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#c026d3] border border-gray-300 dark:border-white/20"></div>
                                  <div className="w-5 h-5 rounded-full bg-[#ef4444] border border-gray-300 dark:border-white/20"></div>
                                </>
                              )}
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {theme.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing bracket and text move together to the right */}
              <div
                className={`flex items-center transition-all duration-500 ease-in-out ${
                  isNavExpanded ? 'translate-x-[var(--nav-shift)]' : ''
                } group-hover/nav:translate-x-[var(--nav-shift)]`}
                style={closingTransformStyle}
              >
                <span className="transition-all duration-500 ease-in-out">&gt;</span>
                <span className={`whitespace-nowrap transition-all duration-500 ease-in-out ${isNavExpanded ? 'ml-3' : 'ml-0 group-hover/nav:ml-3'}`}>Full Stack Vibes</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile site title with simplified nav */}
        <nav className="absolute top-12 left-4 md:hidden" aria-label="Mobile navigation">
          <div className="text-accent dark:text-accent font-mono text-base">
            <span>&lt;&gt;</span>
            <span className="ml-1">Full Stack Vibes</span>
          </div>
          {/* Mobile nav links - always visible below logo */}
          <div className="flex items-center gap-3 mt-2 text-sm">
            <a href="#career" className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">
              Career
            </a>
            <a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">
              Projects
            </a>
            <button
              onClick={() => setShowResumeModal(true)}
              className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
            >
              Resume
            </button>
            <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">
              Contact
            </a>
          </div>
        </nav>

        {/* Hero content grid - vertically centered */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-8 lg:mt-0 lg:min-h-[calc(100vh-200px)]">
          {/* Left column - Text content */}
          <div className="order-2 lg:order-1">
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              David Anderson
            </h1>

            {/* Role */}
            <p className="text-xl sm:text-2xl text-accent font-medium mb-6">
              Solutions Architect & AI Developer
            </p>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-xl">
              I build enterprise tools that actually work. Over a decade of connecting systems,
              automating workflows, and shipping software people want to use.
            </p>

            {/* Stats row - clickable */}
            <div className="flex flex-wrap gap-6 mb-8">
              {STATS.map((stat) => (
                <a
                  key={stat.label}
                  href={stat.href}
                  className="group p-3 -m-3 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500 group-hover:text-accent/70 transition-colors flex items-center gap-1">
                    {stat.label}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                View Projects
                <FiArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent/30 hover:border-accent bg-transparent hover:bg-accent/5 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all"
              >
                <FiDownload className="w-4 h-4" />
                Resume
              </button>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://github.com/d4vid4nderson"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/d4v1d4nd3rs0n"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:david4nderson@pm.me"
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                aria-label="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right column - Photo and tech stack */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end">
            {/* Headshot */}
            <div className="relative mb-8">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full p-[7px] bg-gradient-accent-to-r group cursor-pointer">
                <div className="relative rounded-full overflow-hidden w-full h-full bg-white dark:bg-[#0f0f0f]">
                  <Image
                    src="/Headshot_updated.jpg"
                    alt="David Anderson"
                    fill
                    className="object-cover rounded-full transition-transform duration-300 ease-out group-hover:scale-110"
                    priority
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
    </section>
  );
}

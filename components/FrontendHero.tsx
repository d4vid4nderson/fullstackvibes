'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight, FiTerminal, FiSun, FiMoon } from 'react-icons/fi';
import { SiGo, SiPython, SiTypescript, SiReact, SiNextdotjs, SiFastapi, SiPostgresql, SiDocker } from 'react-icons/si';
import { useTheme } from './ThemeProvider';
import { useViewMode } from './ViewModeProvider';
import { ResumeModal } from './ResumeModal';

const TECH_STACK = [
  { icon: SiGo, name: 'Go', color: '#00ADD8' },
  { icon: SiPython, name: 'Python', color: '#3776AB' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { icon: SiReact, name: 'React', color: '#61DAFB' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
  { icon: SiFastapi, name: 'FastAPI', color: '#009688' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
];

const STATS = [
  { value: '$400K+', label: 'Cost Savings', description: 'Annual impact delivered' },
  { value: '6', label: 'AI Apps', description: 'Production applications' },
  { value: '12+', label: 'Years', description: 'Building solutions' },
];

export function FrontendHero() {
  const { mode, setMode } = useTheme();
  const { toggleViewMode } = useViewMode();
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-screen headshot on the right */}
      <div className="absolute inset-0 lg:left-1/3">
        <Image
          src="/david-headshot-square.jpg"
          alt="David Anderson"
          fill
          className="object-cover object-top"
          priority
        />

        {/* Dark gradient overlay from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/70 to-[var(--background)]/20 lg:via-transparent lg:to-transparent" />

        {/* Animated lens flare effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary lens flare - moves diagonally */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl animate-lens-flare-1"
            style={{
              background: `radial-gradient(circle, var(--accent-primary) 0%, var(--accent-secondary) 30%, transparent 70%)`,
            }}
          />
          {/* Secondary lens flare - moves opposite */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-2xl animate-lens-flare-2"
            style={{
              background: `radial-gradient(circle, var(--accent-light) 0%, var(--accent-tertiary) 40%, transparent 70%)`,
            }}
          />
          {/* Small accent flare */}
          <div
            className="absolute w-[200px] h-[200px] rounded-full opacity-40 blur-xl animate-lens-flare-3"
            style={{
              background: `radial-gradient(circle, white 0%, var(--accent-primary) 30%, transparent 60%)`,
            }}
          />
        </div>

        {/* Subtle vignette on edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/50 via-transparent to-transparent" />
      </div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          {/* Top navigation bar */}
          <nav className="absolute top-6 left-6 right-6 sm:left-8 sm:right-8 lg:left-12 lg:right-12 flex items-center justify-between">
            <div className="text-accent font-bold text-xl tracking-tight">
              FSV
            </div>
            <div className="flex items-center gap-4">
              {/* View mode toggle */}
              <button
                onClick={toggleViewMode}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-accent/20 hover:border-accent/50 transition-all text-sm text-gray-700 dark:text-gray-300"
                title="Switch to Backend View"
              >
                <FiTerminal className="w-4 h-4" />
                <span className="hidden sm:inline">Backend</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-accent/20 hover:border-accent/50 transition-all text-gray-700 dark:text-gray-300"
                aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {mode === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
              </button>
            </div>
          </nav>

          {/* Main content - left side */}
          <div className="max-w-2xl pt-16 lg:pt-0">
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                David Anderson
              </span>
            </h1>

            {/* Role badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 dark:bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full mb-6">
              <span className="text-accent font-semibold text-sm sm:text-base">
                Solutions Architect | AI Developer
              </span>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              I build enterprise tools that don&apos;t suck. Over a decade connecting systems,
              automating workflows, and making software people actually use.
              <span className="text-accent font-medium"> AI helps me ship faster.</span>
            </p>

            {/* Stats cards */}
            <div className="flex flex-wrap gap-4 mb-8">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative px-5 py-4 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">
                Technologies I work with
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="group flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 rounded-xl hover:border-accent/50 hover:bg-accent/10 transition-all duration-200 cursor-default"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <tech.icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-accent transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-200"
              >
                View Projects
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-gray-200/50 dark:border-white/20 text-gray-700 dark:text-white font-semibold rounded-xl hover:bg-white dark:hover:bg-black/60 hover:border-accent/50 transition-all duration-200"
              >
                <FiDownload className="w-4 h-4" />
                Resume
              </button>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/d4vid4nderson"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-accent hover:border-accent/50 transition-all"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/d4v1d4nd3rs0n"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-accent hover:border-accent/50 transition-all"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:david4nderson@pm.me"
                className="p-3 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-accent hover:border-accent/50 transition-all"
                aria-label="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>

            {/* Status badge - mobile only */}
            <div className="mt-8 lg:hidden">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Open to Opportunities
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status badge - desktop, positioned over image */}
      <div className="hidden lg:block absolute bottom-12 right-12 z-20">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Open to Opportunities
        </span>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
    </section>
  );
}

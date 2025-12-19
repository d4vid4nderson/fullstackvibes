'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight, FiTerminal, FiLayout, FiSun, FiMoon } from 'react-icons/fi';
import { SiGo, SiPython, SiTypescript, SiReact, SiNextdotjs, SiFastapi, SiPostgresql, SiDocker } from 'react-icons/si';
import { useTheme } from './ThemeProvider';
import { useViewMode } from './ViewModeProvider';
import { ResumeModal } from './ResumeModal';

const TECH_STACK = [
  { icon: SiGo, name: 'Go' },
  { icon: SiPython, name: 'Python' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiReact, name: 'React' },
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiFastapi, name: 'FastAPI' },
  { icon: SiPostgresql, name: 'PostgreSQL' },
  { icon: SiDocker, name: 'Docker' },
];

const STATS = [
  { value: '$400K+', label: 'Cost Savings' },
  { value: '6', label: 'AI Apps Shipped' },
  { value: '12+', label: 'Years Experience' },
];

export function FrontendHero() {
  const { mode, setMode } = useTheme();
  const { toggleViewMode } = useViewMode();
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <section className="relative min-h-screen bg-[var(--background)]">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.15] blur-3xl"
          style={{
            background: `radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-[0.1] blur-3xl"
          style={{
            background: `radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-8 lg:px-12 py-6">
        <div className="text-accent font-bold text-xl tracking-tight">
          FSV
        </div>
        <div className="flex items-center gap-3">
          {/* View mode toggle - pill style like Claude */}
          <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-full p-0.5">
            <button
              onClick={toggleViewMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FiTerminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Terminal</span>
            </button>
            <button
              onClick={() => {}} // Already on Frontend
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm"
            >
              <FiLayout className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Frontend</span>
            </button>
          </div>
          {/* Theme toggle */}
          <button
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-400"
            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {mode === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 lg:pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <div className="order-2 lg:order-1">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 dark:text-green-400 text-sm font-medium">Open to opportunities</span>
            </div>

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

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mb-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors"
              >
                View Projects
                <FiArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
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
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10">
                <Image
                  src="/david-headshot-square.jpg"
                  alt="David Anderson"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Subtle accent border on hover */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent hover:ring-accent/30 transition-all pointer-events-none" />
            </div>

            {/* Tech stack */}
            <div className="w-full max-w-sm">
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-3 text-center lg:text-right">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                {TECH_STACK.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-accent hover:bg-accent/10 transition-colors"
                    title={tech.name}
                  >
                    <tech.icon className="w-4 h-4" />
                    <span className="text-sm">{tech.name}</span>
                  </div>
                ))}
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

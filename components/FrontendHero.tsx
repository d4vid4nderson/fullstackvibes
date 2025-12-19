'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight, FiTerminal, FiLayout, FiSun, FiMoon } from 'react-icons/fi';
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
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 dark:from-accent/10 dark:via-transparent dark:to-accent/5" />

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-6xl mx-auto w-full z-10">
        {/* Top navigation bar */}
        <nav className="absolute -top-8 left-0 right-0 flex items-center justify-between">
          <div className="text-accent font-bold text-xl tracking-tight">
            FSV
          </div>
          <div className="flex items-center gap-4">
            {/* View mode toggle */}
            <button
              onClick={toggleViewMode}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-accent/20 hover:border-accent/50 transition-all text-sm text-gray-700 dark:text-gray-300"
              title="Switch to Backend View"
            >
              <FiTerminal className="w-4 h-4" />
              <span className="hidden sm:inline">Backend</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-accent/20 hover:border-accent/50 transition-all text-gray-700 dark:text-gray-300"
              aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {mode === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Main hero content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-8">
          {/* Left side - Photo */}
          <div className="flex-shrink-0 order-1 lg:order-none">
            <div className="relative">
              {/* Gradient ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-accent via-accent/50 to-accent rounded-full blur-sm opacity-75 animate-pulse" />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl">
                <Image
                  src="/david-headshot-square.jpg"
                  alt="David Anderson"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
                Open to Opportunities
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                David Anderson
              </span>
            </h1>

            {/* Role badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 dark:bg-accent/20 border border-accent/30 rounded-full mb-6">
              <span className="text-accent font-semibold text-sm sm:text-base">
                Solutions Architect | AI Developer
              </span>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              I build enterprise tools that don&apos;t suck. Over a decade connecting systems,
              automating workflows, and making software people actually use.
              <span className="text-accent font-medium"> AI helps me ship faster.</span>
            </p>

            {/* Stats cards */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative px-6 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
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
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {TECH_STACK.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="group flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-accent/50 hover:bg-accent/10 transition-all duration-200 cursor-default"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <tech.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-accent transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-200"
              >
                View Projects
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white font-semibold rounded-xl hover:bg-white dark:hover:bg-white/20 hover:border-accent/50 transition-all duration-200"
              >
                <FiDownload className="w-4 h-4" />
                Resume
              </button>
            </div>

            {/* Social links */}
            <div className="flex justify-center lg:justify-start gap-4 mt-8">
              <a
                href="https://github.com/d4vid4nderson"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-accent hover:border-accent/50 transition-all"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/d4v1d4nd3rs0n"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-accent hover:border-accent/50 transition-all"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:david4nderson@pm.me"
                className="p-3 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-accent hover:border-accent/50 transition-all"
                aria-label="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
    </section>
  );
}

'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useTerminal } from './TerminalContext';

interface ProjectsTerminalProps {
  children: ReactNode;
}

export function ProjectsTerminal({ children }: ProjectsTerminalProps) {
  const { projectsState, setProjectsState } = useTerminal();
  const [showClosedMessage, setShowClosedMessage] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  // Show closed message for 10 seconds then animate out
  useEffect(() => {
    if (projectsState === 'closed') {
      setShowClosedMessage(true);
      setIsMessageVisible(true);
      const timer = setTimeout(() => {
        setIsMessageVisible(false);
        // Remove from DOM after animation
        setTimeout(() => setShowClosedMessage(false), 500);
      }, 10000);
      return () => clearTimeout(timer);
    } else {
      setShowClosedMessage(false);
      setIsMessageVisible(false);
    }
  }, [projectsState]);

  if (projectsState === 'closed') {
    if (!showClosedMessage) {
      return <section id="projects" className="py-2" />;
    }
    return (
      <section id="projects" className="relative py-4 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="relative max-w-7xl mx-auto z-10">
          <div className={`bg-gray-100 dark:bg-[#2a2a2a] rounded-lg border border-gray-300 dark:border-white/10 px-4 py-3 font-mono text-sm text-gray-500 dark:text-gray-400 text-center transition-all duration-500 ${
            isMessageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <span className="text-accent">~/projects</span> terminal closed. Type <code className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 text-accent">projects</code> in the main terminal to restore.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={`relative px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      projectsState === 'minimized' ? 'py-4' : 'py-8 sm:py-12'
    }`}>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Terminal Window */}
        <div className={`bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-300 dark:border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ${
          projectsState === 'minimized' ? '' : ''
        }`}>
          {/* Terminal Header */}
          <div className="bg-gray-100 dark:bg-[#2a2a2a] px-4 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-white/10 transition-colors duration-300">
            <div className="flex gap-2">
              <button
                onClick={() => setProjectsState('closed')}
                className="w-6 h-6 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                aria-label="Close terminal"
                title="Close terminal"
              />
              <button
                onClick={() => setProjectsState('minimized')}
                className="w-6 h-6 sm:w-3 sm:h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
                aria-label="Minimize terminal"
                title="Minimize terminal"
              />
              <button
                onClick={() => setProjectsState('open')}
                className="w-6 h-6 sm:w-3 sm:h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
                aria-label="Maximize terminal"
                title="Maximize terminal"
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-mono">david@fullstackvibes:~/projects</span>
          </div>

          {/* Terminal Content - Hidden when minimized */}
          <div className={`transition-all duration-300 overflow-hidden ${
            projectsState === 'minimized' ? 'max-h-0' : 'max-h-[5000px]'
          }`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

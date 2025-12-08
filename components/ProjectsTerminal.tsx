'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useTerminal } from './TerminalContext';
import { TerminalWindow } from './TerminalHeader';

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
        setTimeout(() => setShowClosedMessage(false), 500);
      }, 10000);
      return () => clearTimeout(timer);
    } else {
      setShowClosedMessage(false);
      setIsMessageVisible(false);
    }
  }, [projectsState]);

  if (projectsState === 'closed') {
    return (
      <section id="projects">
        <TerminalWindow
          path="~/projects"
          state="closed"
          onClose={() => setProjectsState('closed')}
          onMinimize={() => setProjectsState('minimized')}
          onMaximize={() => setProjectsState('open')}
          showClosedMessage={showClosedMessage}
          isMessageVisible={isMessageVisible}
        >
          {children}
        </TerminalWindow>
      </section>
    );
  }

  return (
    <section id="projects" className={`relative px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      projectsState === 'minimized' ? 'py-4' : 'py-8 sm:py-12'
    }`}>
      <div className="relative max-w-7xl mx-auto z-10">
        <TerminalWindow
          path="~/projects"
          state={projectsState}
          onClose={() => setProjectsState('closed')}
          onMinimize={() => setProjectsState('minimized')}
          onMaximize={() => setProjectsState('open')}
        >
          {children}
        </TerminalWindow>
      </div>
    </section>
  );
}

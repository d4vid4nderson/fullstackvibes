'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type TerminalState = 'open' | 'minimized' | 'closed';

interface TerminalContextType {
  careerState: TerminalState;
  projectsState: TerminalState;
  contactState: TerminalState;
  setCareerState: (state: TerminalState) => void;
  setProjectsState: (state: TerminalState) => void;
  setContactState: (state: TerminalState) => void;
  restoreTerminal: (terminal: 'career' | 'projects' | 'contact') => void;
  heroMessages: string[];
  addHeroMessage: (message: string) => void;
  clearHeroMessages: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [careerState, setCareerState] = useState<TerminalState>('open');
  const [projectsState, setProjectsState] = useState<TerminalState>('open');
  const [contactState, setContactState] = useState<TerminalState>('open');
  const [heroMessages, setHeroMessages] = useState<string[]>([]);

  const restoreTerminal = (terminal: 'career' | 'projects' | 'contact') => {
    switch (terminal) {
      case 'career':
        setCareerState('open');
        break;
      case 'projects':
        setProjectsState('open');
        break;
      case 'contact':
        setContactState('open');
        break;
    }
  };

  const addHeroMessage = (message: string) => {
    setHeroMessages(prev => [...prev, message]);
  };

  const clearHeroMessages = () => {
    setHeroMessages([]);
  };

  return (
    <TerminalContext.Provider
      value={{
        careerState,
        projectsState,
        contactState,
        setCareerState,
        setProjectsState,
        setContactState,
        restoreTerminal,
        heroMessages,
        addHeroMessage,
        clearHeroMessages,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}

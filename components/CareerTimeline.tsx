'use client';

import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiGitCommit, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { useTerminal } from './TerminalContext';

interface CareerEntry {
  id: string;
  period: string;
  endYear: string;
  title: string;
  company: string;
  location?: string;
  type: 'current' | 'past';
  summary: string;
  achievements: string[];
  techStack?: string[];
}

const careerData: CareerEntry[] = [
  {
    id: 'digital-experience-architect',
    period: '2022 - Present',
    endYear: 'HEAD',
    title: 'Digital Experience Architect & Product Owner',
    company: 'MOREgroup',
    location: 'Paradise, TX',
    type: 'current',
    summary: 'Leading product development of the VUES suite—6 production AI applications that transformed organizational workflows.',
    achievements: [
      'Shipped 6 production AI applications used daily across the organization',
      'Delivered $400,000+ in annual cost savings through workflow automation',
      'Achieved 80% efficiency gains for architectural planning teams',
      'Integrated Claude AI, GPT-4, and Azure OpenAI into production systems',
      'Led agile sprints from ideation through deployment and adoption',
    ],
    techStack: ['go', 'python', 'typescript', 'react', 'claude', 'postgresql', 'docker'],
  },
  {
    id: 'digital-experience-designer',
    period: '2018 - 2022',
    endYear: '2022',
    title: 'Digital Experience Designer',
    company: 'Huckabee (now MOREgroup)',
    location: 'Paradise, TX',
    type: 'past',
    summary: 'Evolved from design operations to technical product development, bridging creative workflows with software solutions.',
    achievements: [
      'Built internal knowledge platforms saving $30,000+ annually',
      'Launched 3D reality capture services for architectural documentation',
      'Designed and developed project management systems',
      'Created UI/UX design systems and iconography standards',
    ],
    techStack: ['javascript', 'react', 'nodejs', 'azuresql'],
  },
  {
    id: 'media-lab-manager',
    period: '2015 - 2018',
    endYear: '2018',
    title: 'Media Lab Manager',
    company: 'Huckabee',
    location: 'Paradise, TX',
    type: 'past',
    summary: 'Established the media lab from concept through C-suite pitch, building the foundation for digital innovation.',
    achievements: [
      'Pitched and secured C-suite approval for media lab initiative',
      'Built and led cross-functional creative technology team',
      'Implemented digital asset management workflows',
      'Pioneered adoption of emerging visualization technologies',
    ],
  },
  {
    id: 'resource-manager',
    period: '2013 - 2015',
    endYear: '2015',
    title: 'Resource Manager',
    company: 'Huckabee',
    location: 'Paradise, TX',
    type: 'past',
    summary: 'Managed design team operations and resource allocation, developing deep understanding of creative workflow pain points.',
    achievements: [
      'Coordinated resources across 50+ concurrent architectural projects',
      'Identified workflow inefficiencies that later inspired VUES products',
      'Streamlined team communication and project handoffs',
    ],
  },
];

// Tech stack icon mapping
const getTechIcon = (tech: string) => {
  const iconMap: Record<string, string> = {
    go: '/go.svg',
    python: '/python-color.svg',
    typescript: '/typescript-logo.svg',
    javascript: '/JavaScript_logo.svg',
    react: '/react-color.svg',
    nodejs: '/nodejs-color.svg',
    postgresql: '/postgresql.svg',
    azuresql: '/azure-color.svg',
    docker: '/docker-color.svg',
    claude: '/Anthropic.svg',
  };
  return iconMap[tech.toLowerCase()];
};

interface TimelineCardProps {
  entry: CareerEntry;
  isExpanded: boolean;
  onToggle: () => void;
}

function TimelineCard({ entry, isExpanded, onToggle }: TimelineCardProps) {
  return (
    <div className="relative pl-8 sm:pl-12 pb-8 last:pb-0 group">
      {/* Vertical line */}
      <div className="absolute left-[11px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent opacity-30 group-last:bg-gradient-to-b group-last:from-accent-primary group-last:to-transparent" />

      {/* Git commit node - highlights when expanded */}
      <div className="absolute left-0 sm:left-2 top-0 flex items-center justify-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          isExpanded
            ? 'bg-accent text-white shadow-lg shadow-accent-primary/50'
            : 'bg-white dark:bg-[#1a1a1a] border-2 border-accent-primary/50'
        }`}>
          <FiGitCommit className={`w-3 h-3 ${isExpanded ? 'text-white' : 'text-accent'}`} />
        </div>
      </div>

      {/* Card */}
      <div
        className={`relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
          isExpanded
            ? 'bg-white/90 dark:bg-[#1a1a1a] border-accent-primary/30 shadow-lg shadow-accent-primary/10'
            : 'bg-white/80 dark:bg-[#1a1a1a]/80 border-gray-300 dark:border-white/10 hover:border-accent-primary/30'
        }`}
        onClick={onToggle}
      >
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Git-style commit reference */}
              <div className="flex items-center gap-2 mb-2 text-xs font-mono">
                <span className={`font-semibold transition-colors duration-300 ${isExpanded ? 'text-accent' : 'text-gray-500 dark:text-gray-500'}`}>
                  commit {entry.endYear === 'HEAD' ? 'HEAD' : entry.endYear}
                </span>
                {entry.type === 'current' && (
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-semibold uppercase tracking-wide">
                    current
                  </span>
                )}
              </div>

              {/* Title & Company */}
              <h3 className={`font-bold text-gray-900 dark:text-white text-base sm:text-lg ${
                isExpanded ? 'gradient-text' : ''
              }`}>
                {entry.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FiBriefcase className="w-3 h-3" />
                  {entry.company}
                </span>
                {entry.location && (
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-3 h-3" />
                    {entry.location}
                  </span>
                )}
              </div>
            </div>

            {/* Period & Expand toggle */}
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs font-mono text-gray-500 dark:text-gray-500 whitespace-nowrap">
                {entry.period}
              </span>
              <button
                className="p-1 rounded-full hover:bg-accent/10 transition-colors"
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? (
                  <FiChevronUp className="w-4 h-4 text-accent" />
                ) : (
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Summary - always visible */}
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {entry.summary}
          </p>

          {/* Expandable content */}
          <div className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            {/* Achievements */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-accent uppercase tracking-wide">
                # Achievements
              </p>
              <ul className="space-y-1.5">
                {entry.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-accent mt-1 font-mono text-xs">+</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            {entry.techStack && entry.techStack.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                <p className="text-xs font-mono text-accent uppercase tracking-wide mb-2">
                  # Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.techStack.map((tech) => {
                    const iconSrc = getTechIcon(tech);
                    return iconSrc ? (
                      <div
                        key={tech}
                        className="group/tech relative flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                      >
                        <img src={iconSrc} alt={tech} className="w-4 h-4" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{tech}</span>
                      </div>
                    ) : (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-gray-400 capitalize"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CareerTimeline() {
  // Track which entry is expanded - default to first (current role)
  const [expandedId, setExpandedId] = useState<string>(careerData[0].id);
  const { careerState, setCareerState } = useTerminal();
  const [showClosedMessage, setShowClosedMessage] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleToggle = (id: string) => {
    // If clicking the already expanded one, keep it expanded (or toggle if you prefer)
    // For accordion behavior where one is always open:
    setExpandedId(id);
  };

  // Show closed message for 10 seconds then animate out
  useEffect(() => {
    if (careerState === 'closed') {
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
  }, [careerState]);

  if (careerState === 'closed') {
    if (!showClosedMessage) {
      return <section id="career" className="py-2" />;
    }
    return (
      <section id="career" className="relative py-4 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="relative max-w-7xl mx-auto z-10">
          <div className={`bg-gray-100 dark:bg-[#2a2a2a] rounded-lg border border-gray-300 dark:border-white/10 px-4 py-3 font-mono text-sm text-gray-500 dark:text-gray-400 text-center transition-all duration-500 ${
            isMessageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <span className="text-accent">~/career</span> terminal closed. Type <code className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 text-accent">career</code> in the main terminal to restore.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="career" className={`px-4 sm:px-6 lg:px-8 relative transition-all duration-300 ${
      careerState === 'minimized' ? 'py-4' : 'py-8 sm:py-12'
    }`}>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Terminal Window */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-300 dark:border-white/10 shadow-2xl overflow-hidden transition-colors duration-300">
          {/* Terminal Header */}
          <div className="bg-gray-100 dark:bg-[#2a2a2a] px-4 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-white/10 transition-colors duration-300">
            <div className="flex gap-2">
              <button
                onClick={() => setCareerState('closed')}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                aria-label="Close terminal"
                title="Close terminal"
              />
              <button
                onClick={() => setCareerState('minimized')}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"
                aria-label="Minimize terminal"
                title="Minimize terminal"
              />
              <button
                onClick={() => setCareerState('open')}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"
                aria-label="Maximize terminal"
                title="Maximize terminal"
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-mono">david@fullstackvibes:~/career</span>
          </div>

          {/* Terminal Content - Hidden when minimized */}
          <div className={`transition-all duration-300 overflow-hidden ${
            careerState === 'minimized' ? 'max-h-0' : 'max-h-[5000px]'
          }`}>
          <div className="p-5 sm:p-8 font-mono">
            {/* Command header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-accent">$</span>
                <span className="text-gray-600 dark:text-gray-300">git log</span>
                <span className="text-accent">--career</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="text-accent font-medium">12+ years</span> of evolution from design ops to AI-powered product development
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {careerData.map((entry) => (
                <TimelineCard
                  key={entry.id}
                  entry={entry}
                  isExpanded={expandedId === entry.id}
                  onToggle={() => handleToggle(entry.id)}
                />
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                <span className="text-accent">tip:</span> click on a role to expand and view achievements &amp; tech stack
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

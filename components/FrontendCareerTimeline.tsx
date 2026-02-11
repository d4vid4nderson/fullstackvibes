'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiMapPin, FiBriefcase, FiCalendar } from 'react-icons/fi';

interface CareerEntry {
  id: string;
  period: string;
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
    title: 'Digital Experience Architect & Product Owner',
    company: 'MOREgroup',
    location: 'Fort Worth, Texas',
    type: 'current',
    summary: 'Leading product development of the VUES suite—6 production AI applications that transformed organizational workflows.',
    achievements: [
      'Shipped 6 production AI applications used daily across the organization',
      'Delivered $400,000+ in annual cost savings through workflow automation',
      'Achieved 80% efficiency gains for architectural planning teams',
      'Integrated Claude AI, GPT-4, and Azure OpenAI into production systems',
      'Led agile sprints from ideation through deployment and adoption',
    ],
    techStack: ['Go', 'Python', 'TypeScript', 'React', 'Claude AI', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'digital-experience-designer',
    period: '2018 - 2022',
    title: 'Digital Experience Designer',
    company: 'Huckabee (now MOREgroup)',
    location: 'Fort Worth, Texas',
    type: 'past',
    summary: 'Evolved from design operations to technical product development, bridging creative workflows with software solutions.',
    achievements: [
      'Built internal knowledge platforms saving $30,000+ annually',
      'Launched 3D reality capture services for architectural documentation',
      'Designed and developed project management systems',
      'Created UI/UX design systems and iconography standards',
    ],
    techStack: ['JavaScript', 'React', 'Node.js', 'Azure SQL'],
  },
  {
    id: 'media-lab-manager',
    period: '2015 - 2018',
    title: 'Media Lab Manager',
    company: 'Huckabee',
    location: 'Fort Worth, Texas',
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
    title: 'Resource Manager',
    company: 'Huckabee',
    location: 'Fort Worth, Texas',
    type: 'past',
    summary: 'Managed design team operations and resource allocation, developing deep understanding of creative workflow pain points.',
    achievements: [
      'Coordinated resources across 50+ concurrent architectural projects',
      'Identified workflow inefficiencies that later inspired VUES products',
      'Streamlined team communication and project handoffs',
    ],
  },
];

interface TimelineCardProps {
  entry: CareerEntry;
  isExpanded: boolean;
  onToggle: () => void;
}

function TimelineCard({ entry, isExpanded, onToggle }: TimelineCardProps) {
  return (
    <div
      className={`relative bg-white dark:bg-white/5 rounded-xl transition-all duration-300 cursor-pointer ${
        isExpanded
          ? 'border-2 border-accent/50 shadow-xl shadow-accent/30'
          : 'border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
      }`}
      onClick={onToggle}
    >
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Period and badge */}
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <FiCalendar className="w-3.5 h-3.5" />
                {entry.period}
              </span>
              {entry.type === 'current' && (
                <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
                  Current
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
              {entry.title}
            </h3>

            {/* Company & Location */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <FiBriefcase className="w-3.5 h-3.5" />
                {entry.company}
              </span>
              {entry.location && (
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="w-3.5 h-3.5" />
                  {entry.location}
                </span>
              )}
            </div>
          </div>

          {/* Expand toggle */}
          <button
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <FiChevronUp className="w-5 h-5 text-accent" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Summary */}
        <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
          {entry.summary}
        </p>

        {/* Expandable content */}
        <div className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[500px] opacity-100 mt-5' : 'max-h-0 opacity-0'
        }`}>
          {/* Achievements */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {entry.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="text-accent mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          {entry.techStack && entry.techStack.length > 0 && (
            <div className="mt-5 pt-5 border-t border-gray-100 dark:border-white/5">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {entry.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-sm text-gray-600 dark:text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FrontendCareerTimeline() {
  const [expandedId, setExpandedId] = useState<string>(careerData[0].id);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  return (
    <section id="career" className="py-16 sm:py-24 bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Career Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            12+ years of evolution from design operations to AI-powered product development
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="space-y-4">
          {careerData.map((entry) => (
            <TimelineCard
              key={entry.id}
              entry={entry}
              isExpanded={expandedId === entry.id}
              onToggle={() => handleToggle(entry.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

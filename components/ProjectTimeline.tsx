'use client';

import { useState } from 'react';
import { GitHubRepo } from '@/types/github';
import { FiChevronDown, FiChevronUp, FiGitCommit, FiExternalLink } from 'react-icons/fi';
import { SiAnthropic } from 'react-icons/si';
import { ProjectModal } from './ProjectModal';

interface ProjectTimelineProps {
  projects: GitHubRepo[];
}

// Icon components
const GolangIcon = ({ className }: { className?: string }) => (
  <img src="/go.svg" alt="Go" width={16} height={16} className={className} />
);

const PythonIcon = ({ className }: { className?: string }) => (
  <img src="/python-color.svg" alt="Python" width={16} height={16} className={className} />
);

const JavaScriptIcon = ({ className }: { className?: string }) => (
  <img src="/JavaScript_logo.svg" alt="JavaScript" width={16} height={16} className={className} />
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <img src="/typescript-logo.svg" alt="TypeScript" width={16} height={16} className={className} />
);

const DockerIcon = ({ className }: { className?: string }) => (
  <img src="/docker-color.svg" alt="Docker" width={16} height={16} className={className} />
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <img src="/tailwindcss-color.svg" alt="Tailwind CSS" width={16} height={16} className={className} />
);

const ClaudeIcon = ({ className }: { className?: string }) => (
  <SiAnthropic className={`${className} text-orange-400`} style={{ width: 16, height: 16 }} />
);

const PlaywrightIcon = ({ className }: { className?: string }) => (
  <img src="/playwright.svg" alt="Playwright" width={16} height={16} className={className} />
);

const PostgreSQLIcon = ({ className }: { className?: string }) => (
  <img src="/postgresql.svg" alt="PostgreSQL" width={16} height={16} className={className} />
);

const OpenAIIcon = ({ className }: { className?: string }) => (
  <img src="/openai.svg" alt="OpenAI" width={16} height={16} className={className} />
);

const AzureIcon = ({ className }: { className?: string }) => (
  <img src="/azure-color.svg" alt="Azure DevOps" width={16} height={16} className={className} />
);

const ReactIcon = ({ className }: { className?: string }) => (
  <img src="/react-color.svg" alt="React" width={16} height={16} className={className} />
);

const NextJSIcon = ({ className }: { className?: string }) => (
  <img src="/nextjs-icon-svgrepo-com.svg" alt="Next.js" width={16} height={16} className={`${className} invert`} />
);

const VueIcon = ({ className }: { className?: string }) => (
  <img src="/vuejs-color.svg" alt="Vue.js" width={16} height={16} className={className} />
);

const NodeJSIcon = ({ className }: { className?: string }) => (
  <img src="/nodejs-color.svg" alt="Node.js" width={16} height={16} className={className} />
);

const AzureSqlIcon = ({ className }: { className?: string }) => (
  <img src="/azure-color.svg" alt="Azure SQL" width={16} height={16} className={className} />
);

const SupabaseIcon = ({ className }: { className?: string }) => (
  <img src="/supabase-logo-icon.svg" alt="Supabase" width={16} height={16} className={className} />
);

const StripeIcon = ({ className }: { className?: string }) => (
  <img src="/stripe.svg" alt="Stripe" width={16} height={16} className={className} />
);

const getIconForTopic = (topic: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'golang': GolangIcon,
    'go': GolangIcon,
    'javascript': JavaScriptIcon,
    'js': JavaScriptIcon,
    'tailwindcss': TailwindIcon,
    'tailwind': TailwindIcon,
    'typescript': TypeScriptIcon,
    'ts': TypeScriptIcon,
    'react': ReactIcon,
    'reactjs': ReactIcon,
    'nextjs': NextJSIcon,
    'next': NextJSIcon,
    'python': PythonIcon,
    'nodejs': NodeJSIcon,
    'node': NodeJSIcon,
    'docker': DockerIcon,
    'postgresql': PostgreSQLIcon,
    'postgres': PostgreSQLIcon,
    'azuresql': AzureSqlIcon,
    'azure-sql': AzureSqlIcon,
    'vue': VueIcon,
    'vuejs': VueIcon,
    'claude': ClaudeIcon,
    'anthropic': ClaudeIcon,
    'playwright': PlaywrightIcon,
    'openai': OpenAIIcon,
    'azure': AzureIcon,
    'supabase': SupabaseIcon,
    'stripe': StripeIcon,
  };

  return iconMap[topic.toLowerCase()];
};

interface ProjectTimelineCardProps {
  repo: GitHubRepo;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}

function ProjectTimelineCard({ repo, isExpanded, onToggle, isLast }: ProjectTimelineCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`relative pl-8 sm:pl-12 ${isLast ? '' : 'pb-6'}`}>
        {/* Vertical line */}
        {!isLast && (
          <div className="absolute left-[11px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent opacity-30" />
        )}

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
          <div className="p-4 sm:p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Project name with language badge */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-bold text-gray-900 dark:text-white text-base sm:text-lg transition-all duration-300 ${
                    isExpanded ? 'gradient-text' : ''
                  }`}>
                    {repo.name}
                  </h3>
                  {repo.language && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold uppercase tracking-wide">
                      {repo.language}
                    </span>
                  )}
                </div>

                {/* Description - always visible */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                  {repo.description || 'No description provided'}
                </p>
              </div>

              {/* Expand toggle */}
              <div className="flex items-center gap-2">
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

            {/* Expandable content */}
            <div className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}>
              {/* Tech Stack */}
              {repo.topics.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-mono text-accent uppercase tracking-wide mb-2">
                    # Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.slice(0, 8).map((topic) => {
                      const Icon = getIconForTopic(topic);
                      return Icon ? (
                        <div
                          key={topic}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{topic}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* View Details Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors font-mono"
              >
                <FiExternalLink className="w-4 h-4" />
                <span>view ./README.md</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProjectModal
        repo={repo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(projects[0]?.id || null);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative">
      {projects.map((repo, index) => (
        <ProjectTimelineCard
          key={repo.id}
          repo={repo}
          isExpanded={expandedId === repo.id}
          onToggle={() => handleToggle(repo.id)}
          isLast={index === projects.length - 1}
        />
      ))}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { GitHubRepo } from '@/types/github';
import { FiCode, FiUsers, FiExternalLink, FiChevronDown, FiChevronUp, FiLink, FiCheckCircle } from 'react-icons/fi';
import { SiAnthropic } from 'react-icons/si';
import { ProjectModal } from './ProjectModal';

// Custom colored icon components
const GolangIcon = ({ className }: { className?: string }) => (
  <img src="/go.svg" alt="Go" width={20} height={20} className={className} />
);

const PythonIcon = ({ className }: { className?: string }) => (
  <img src="/python-color.svg" alt="Python" width={20} height={20} className={className} />
);

const JavaScriptIcon = ({ className }: { className?: string }) => (
  <img src="/JavaScript_logo.svg" alt="JavaScript" width={20} height={20} className={className} />
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <img src="/typescript-logo.svg" alt="TypeScript" width={20} height={20} className={className} />
);

const DockerIcon = ({ className }: { className?: string }) => (
  <img src="/docker-color.svg" alt="Docker" width={20} height={20} className={className} />
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <img src="/tailwindcss-color.svg" alt="Tailwind CSS" width={20} height={20} className={className} />
);

const ClaudeIcon = ({ className }: { className?: string }) => (
  <SiAnthropic className={`${className} text-orange-400`} />
);

const PlaywrightIcon = ({ className }: { className?: string }) => (
  <img src="/playwright.svg" alt="Playwright" width={20} height={20} className={className} />
);

const PostgreSQLIcon = ({ className }: { className?: string }) => (
  <img src="/postgresql.svg" alt="PostgreSQL" width={20} height={20} className={className} />
);

const OpenAIIcon = ({ className }: { className?: string }) => (
  <img src="/openai.svg" alt="OpenAI" width={20} height={20} className={className} />
);

const AzureAIIcon = ({ className }: { className?: string }) => (
  <img src="/azureai-color.svg" alt="Azure AI Foundry" width={20} height={20} className={className} />
);

const AzureIcon = ({ className }: { className?: string }) => (
  <img src="/azure-color.svg" alt="Azure DevOps" width={20} height={20} className={className} />
);

const ReactIcon = ({ className }: { className?: string }) => (
  <img src="/react-color.svg" alt="React" width={20} height={20} className={className} />
);

const NextJSIcon = ({ className }: { className?: string }) => (
  <img src="/nextjs-icon-svgrepo-com.svg" alt="Next.js" width={20} height={20} className={`${className} dark:invert`} />
);

const SupabaseIcon = ({ className }: { className?: string }) => (
  <img src="/supabase-logo-icon.svg" alt="Supabase" width={20} height={20} className={className} />
);

const SignWellIcon = ({ className }: { className?: string }) => (
  <img src="/signwell.svg" alt="SignWell" width={20} height={20} className={className} />
);


// Map topic names to their corresponding colored icons
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
    'docker': DockerIcon,
    'postgresql': PostgreSQLIcon,
    'postgres': PostgreSQLIcon,
    'claude': ClaudeIcon,
    'anthropic': ClaudeIcon,
    'playwright': PlaywrightIcon,
    'openai': OpenAIIcon,
    'microsoft-ai': AzureAIIcon,
    'azure-ai': AzureAIIcon,
    'azureai': AzureAIIcon,
    'azure': AzureIcon,
    'supabase': SupabaseIcon,
    'signwell': SignWellIcon,
  };

  return iconMap[topic.toLowerCase()];
};

const getProjectSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

interface ProjectCardProps {
  repo: GitHubRepo;
  isExpanded: boolean;
  onToggle: () => void;
}

function FrontendProjectCard({ repo, isExpanded, onToggle }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <>
      <div
        id={getProjectSlug(repo.name)}
        className={`relative bg-white dark:bg-white/5 rounded-xl transition-all duration-300 ${
          isExpanded
            ? 'border-2 border-accent/50 shadow-xl shadow-accent/30'
            : 'border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
        }`}
      >
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 cursor-pointer" onClick={onToggle}>
            <div className="flex-1 min-w-0">
              {/* Language badge */}
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{repo.language}</span>
                </span>
                {repo.homepage && repo.homepage !== '#' && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-accent hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink className="w-3 h-3" />
                    Live
                  </a>
                )}
              </div>

              {/* Title */}
              <h3 className={`font-semibold text-lg mb-2 ${isExpanded ? 'text-accent' : 'text-gray-900 dark:text-white'}`}>
                {repo.name}
              </h3>

              {/* Description */}
              <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                {repo.description}
              </p>
            </div>

            {/* Expand toggle */}
            <button
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors flex-shrink-0"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <FiChevronUp className="w-5 h-5 text-accent" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Expandable content */}
          <div className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-[300px] opacity-100 mt-5' : 'max-h-0 opacity-0'
          }`}>
            {/* Tech Stack */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {repo.topics.map((topic) => {
                    const Icon = getIconForTopic(topic);
                    return (
                      <div
                        key={topic}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-sm text-gray-600 dark:text-gray-400"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span className="capitalize">{topic}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* View Details Button */}
            <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="text-sm text-accent hover:underline font-medium"
              >
                View full details →
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const url = `${window.location.origin}${window.location.pathname}#${getProjectSlug(repo.name)}`;
                  navigator.clipboard.writeText(url).then(() => {
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  });
                }}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
              >
                {linkCopied ? <FiCheckCircle className="w-3.5 h-3.5 text-green-500" /> : <FiLink className="w-3.5 h-3.5" />}
                <span>{linkCopied ? 'Copied!' : 'Copy link'}</span>
              </button>
            </div>
          </div>

          {/* Tech icons preview (when collapsed) */}
          {!isExpanded && repo.topics && repo.topics.length > 0 && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
              {repo.topics.slice(0, 5).map((topic) => {
                const Icon = getIconForTopic(topic);
                return Icon ? (
                  <div key={topic} className="group/icon relative w-5 h-5 flex-shrink-0">
                    <Icon className="w-5 h-5 opacity-60 group-hover/icon:opacity-100 transition-opacity" />
                  </div>
                ) : null;
              })}
              {repo.topics.length > 5 && (
                <span className="text-xs text-gray-400 flex-shrink-0">+{repo.topics.length - 5}</span>
              )}
            </div>
          )}
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

interface FrontendProjectsProps {
  developerProjects: GitHubRepo[];
  productOwnerProjects: GitHubRepo[];
}

export function FrontendProjects({ developerProjects, productOwnerProjects }: FrontendProjectsProps) {
  const allProjects = [...developerProjects, ...productOwnerProjects];
  const [expandedId, setExpandedId] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const matched = allProjects.find(p => getProjectSlug(p.name) === hash);
        if (matched) return matched.id;
      }
    }
    return developerProjects.length > 0 ? developerProjects[0].id : null;
  });

  // Handle hash on mount (for SSR safety)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const matched = allProjects.find(p => getProjectSlug(p.name) === hash);
      if (matched) setExpandedId(matched.id);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = (id: number, name: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      history.pushState(null, '', window.location.pathname + window.location.search);
    } else {
      setExpandedId(id);
      history.pushState(null, '', '#' + getProjectSlug(name));
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of enterprise applications spanning development and product ownership
          </p>
        </div>

        {/* Developer Projects Section */}
        {developerProjects.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent/10">
                <FiCode className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Developer
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {developerProjects.length} projects I architected and built
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {developerProjects.map((repo) => (
                <FrontendProjectCard
                  key={repo.id}
                  repo={repo}
                  isExpanded={expandedId === repo.id}
                  onToggle={() => handleToggle(repo.id, repo.name)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Product Owner Projects Section */}
        {productOwnerProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent/10">
                <FiUsers className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Product Owner
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {productOwnerProjects.length} projects I managed through the product lifecycle
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {productOwnerProjects.map((repo) => (
                <FrontendProjectCard
                  key={repo.id}
                  repo={repo}
                  isExpanded={expandedId === repo.id}
                  onToggle={() => handleToggle(repo.id, repo.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { GitHubRepo } from '@/types/github';
import { FiGitBranch, FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiAnthropic } from 'react-icons/si';
import { ProjectModal } from './ProjectModal';

interface ProjectCardProps {
  repo: GitHubRepo;
}

// Custom colored icon components
const GolangIcon = ({ className }: { className?: string }) => (
  <img src="/go.svg" alt="Go" width={24} height={24} className={className} />
);

const PythonIcon = ({ className }: { className?: string }) => (
  <img src="/python-color.svg" alt="Python" width={24} height={24} className={className} />
);

const JavaScriptIcon = ({ className }: { className?: string }) => (
  <img src="/JavaScript_logo.svg" alt="JavaScript" width={24} height={24} className={className} />
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <img src="/typescript-logo.svg" alt="TypeScript" width={24} height={24} className={className} />
);

const DockerIcon = ({ className }: { className?: string }) => (
  <img src="/docker-color.svg" alt="Docker" width={24} height={24} className={className} />
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <img src="/tailwindcss-color.svg" alt="Tailwind CSS" width={24} height={24} className={className} />
);

const ClaudeIcon = ({ className }: { className?: string }) => (
  <SiAnthropic className={`${className} text-orange-400`} />
);

const PlaywrightIcon = ({ className }: { className?: string }) => (
  <img src="/playwright.svg" alt="Playwright" width={24} height={24} className={className} />
);

const PostgreSQLIcon = ({ className }: { className?: string }) => (
  <img src="/postgresql.svg" alt="PostgreSQL" width={24} height={24} className={className} />
);

const OpenAIIcon = ({ className }: { className?: string }) => (
  <img src="/openai.svg" alt="OpenAI" width={24} height={24} className={className} />
);

const AzureAIIcon = ({ className }: { className?: string }) => (
  <img src="/azureai-color.svg" alt="Azure AI Foundry" width={24} height={24} className={className} />
);

const AzureIcon = ({ className }: { className?: string }) => (
  <img src="/azure-color.svg" alt="Azure DevOps" width={24} height={24} className={className} />
);

const ReactIcon = ({ className }: { className?: string }) => (
  <img src="/react-color.svg" alt="React" width={24} height={24} className={className} />
);

const NextJSIcon = ({ className }: { className?: string }) => (
  <img src="/nextjs-icon-svgrepo-com.svg" alt="Next.js" width={24} height={24} className={`${className} invert`} />
);

const VueIcon = ({ className }: { className?: string }) => (
  <img src="/vuejs-color.svg" alt="Vue.js" width={24} height={24} className={className} />
);

const NodeJSIcon = ({ className }: { className?: string }) => (
  <img src="/nodejs-color.svg" alt="Node.js" width={24} height={24} className={className} />
);

const AzureSqlIcon = ({ className }: { className?: string }) => (
  <img src="/azure-color.svg" alt="Azure SQL" width={24} height={24} className={className} />
);

const SupabaseIcon = ({ className }: { className?: string }) => (
  <img src="/supabase-logo-icon.svg" alt="Supabase" width={24} height={24} className={className} />
);

const StripeIcon = ({ className }: { className?: string }) => (
  <img src="/stripe.svg" alt="Stripe" width={24} height={24} className={className} />
);

const SignWellIcon = ({ className }: { className?: string }) => (
  <img src="/signwell.svg" alt="SignWell" width={24} height={24} className={className} />
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
    'microsoft-ai': AzureAIIcon,
    'azure-ai': AzureAIIcon,
    'azureai': AzureAIIcon,
    'azure': AzureIcon,
    'supabase': SupabaseIcon,
    'stripe': StripeIcon,
    'signwell': SignWellIcon,
  };

  return iconMap[topic.toLowerCase()];
};

export function ProjectCard({ repo }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    // Only open modal if it's not a link click
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="group relative card-hover cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-accent-to-r rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity blur-sm"></div>

        <div className="relative p-6 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-white/10 rounded-2xl h-full flex flex-col transition-colors duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:gradient-text transition-all">
            {repo.name}
          </h3>
          <div className="flex gap-3">
            {repo.homepage && repo.homepage !== '#' && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink className="w-5 h-5" />
              </a>
            )}
            {repo.html_url !== '#' && (
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="View on GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow transition-colors duration-300">
          {repo.description || 'No description provided'}
        </p>

        {/* Tech Stack Icons */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {repo.topics.slice(0, 6).map((topic) => {
              const Icon = getIconForTopic(topic);
              return Icon ? (
                <div key={topic} className="group/icon relative">
                  <Icon className="w-6 h-6 transition-transform hover:scale-110" />
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-opacity text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {topic}
                  </span>
                </div>
              ) : null;
            })}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
          {repo.language && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-accent"></span>
              <span className="font-medium">{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <FiGitBranch className="w-4 h-4" />
            <span className="font-medium">{repo.techStackCount || repo.topics.length}</span>
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

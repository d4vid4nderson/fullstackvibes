import { getDeveloperProjects, getProductOwnerProjects } from '@/lib/github';
import { ProjectTimeline } from './ProjectTimeline';
import { ProjectsTerminal } from './ProjectsTerminal';
import { FiCode, FiUsers } from 'react-icons/fi';

export async function Projects() {
  const developerProjects = await getDeveloperProjects();
  const productOwnerProjects = await getProductOwnerProjects();

  return (
    <ProjectsTerminal>
      {/* Terminal Content */}
      <div className="p-5 sm:p-8 font-mono">
        {/* Command header */}
        <div className="mb-8">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-accent">$</span>
            <span className="text-gray-600 dark:text-gray-300">git log</span>
            <span className="text-accent">--projects</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            A collection of my latest work spanning development and product ownership.
          </p>
        </div>

        {/* Developer Projects Section */}
        {developerProjects.length > 0 && (
          <div className="mb-10">
            {/* Developer Section Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-accent">$</span>
                <span className="text-gray-500 dark:text-gray-500">--role</span>
                <span className="text-gray-600 dark:text-gray-400">developer</span>
              </div>
              <div className="flex items-center gap-2 pl-4">
                <FiCode className="w-4 h-4 text-accent" />
                <span className="text-accent font-bold">Developer</span>
                <span className="text-gray-500 dark:text-gray-500">|</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm">{developerProjects.length} projects</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2 pl-4 text-sm leading-relaxed font-sans">
                Projects I architected and built from the ground up—custom enterprise applications designed to streamline workflows and deliver measurable value.
              </p>
            </div>

            {/* Developer Projects Timeline */}
            <ProjectTimeline projects={developerProjects} />
          </div>
        )}

        {/* Product Owner Projects Section */}
        {productOwnerProjects.length > 0 && (
          <div>
            {/* Product Owner Section Header */}
            <div className="mb-6 pt-8 border-t border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-accent">$</span>
                <span className="text-gray-500 dark:text-gray-500">--role</span>
                <span className="text-gray-600 dark:text-gray-400">product-owner</span>
              </div>
              <div className="flex items-center gap-2 pl-4">
                <FiUsers className="w-4 h-4 text-accent" />
                <span className="text-accent font-bold">Product Owner</span>
                <span className="text-gray-500 dark:text-gray-500">|</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm">{productOwnerProjects.length} projects</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2 pl-4 text-sm leading-relaxed font-sans">
                Projects I managed through the product lifecycle—leading Agile ceremonies, stakeholder presentations, and feature delivery.
              </p>
            </div>

            {/* Product Owner Projects Timeline */}
            <ProjectTimeline projects={productOwnerProjects} />
          </div>
        )}

        {/* Footer note */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
            <span className="text-accent">tip:</span> expand a project and click <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-accent">view ./README.md</code> for full details
          </p>
        </div>
      </div>
    </ProjectsTerminal>
  );
}

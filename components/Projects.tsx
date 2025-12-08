import { getDeveloperProjects, getProductOwnerProjects } from '@/lib/github';
import { ProjectTimeline } from './ProjectTimeline';
import { FiCode, FiUsers } from 'react-icons/fi';

export async function Projects() {
  const developerProjects = await getDeveloperProjects();
  const productOwnerProjects = await getProductOwnerProjects();

  return (
    <section id="projects" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-300 overflow-visible">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent-secondary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Terminal Window */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-300 dark:border-white/10 shadow-2xl overflow-hidden transition-colors duration-300">
          {/* Terminal Header */}
          <div className="bg-gray-100 dark:bg-[#2a2a2a] px-4 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-white/10 transition-colors duration-300">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-mono">david@fullstackvibes:~/projects</span>
          </div>

          {/* Terminal Content */}
          <div className="p-5 sm:p-8 font-mono">
            {/* Command header */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                <span className="text-accent">$</span> git log{' '}
                <span className="gradient-text">--projects</span>
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
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
        </div>
      </div>
    </section>
  );
}

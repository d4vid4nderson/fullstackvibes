import { getDeveloperProjects, getProductOwnerProjects } from '@/lib/github';
import { ProjectCard } from './ProjectCard';
import { FiArrowRight, FiPackage, FiCode, FiUsers } from 'react-icons/fi';

export async function Projects() {
  const developerProjects = await getDeveloperProjects();
  const productOwnerProjects = await getProductOwnerProjects();

  return (
    <section id="projects" className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-300 overflow-visible">
      {/* Background decoration - extends beyond section boundaries */}
      <div className="absolute left-0 right-0 -top-[500px] -bottom-[500px] pointer-events-none opacity-30 z-0">
        <div className="absolute top-[500px] right-0 w-[600px] h-[600px] bg-accent rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-[500px] left-0 w-[600px] h-[600px] bg-accent-secondary rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
            <FiPackage className="w-5 h-5 text-accent dark:text-accent" />
            <span className="text-accent-dark dark:text-accent font-mono text-sm">My Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A collection of my latest work spanning development and product ownership.
          </p>
        </div>

        {/* Developer Projects Section */}
        {developerProjects.length > 0 && (
          <div className="mb-20">
            {/* Developer Section Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg">
                <FiCode className="w-5 h-5 text-accent" />
                <span className="text-accent font-bold text-lg">Developer</span>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mt-3 ml-1">
                Projects I architected and built from the ground up. I met with business owners and C-suite executives to identify critical gaps in the existing technology stack, conducted needs assessments to understand operational pain points, and developed custom, tailored solutions that addressed specific business challenges. These one-off enterprise applications were designed to streamline workflows, improve efficiency, and deliver measurable value aligned with strategic organizational objectives.
              </p>
            </div>

            {/* Developer Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {developerProjects.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
            </div>
          </div>
        )}

        {/* Product Owner Projects Section */}
        {productOwnerProjects.length > 0 && (
          <div className="mb-16">
            {/* Product Owner Section Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg">
                <FiUsers className="w-5 h-5 text-accent" />
                <span className="text-accent font-bold text-lg">Product Owner</span>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mt-3 ml-1">
                Projects I managed and guided through the product lifecycle. As Product Owner, I led weekly Agile working meetings with consultant development teams, facilitated sprint planning and retrospectives, and conducted in-person planning sessions and presentations with leadership and stakeholders to gather requirement and to demonstrate features to ensure platforms aligned with organizational and business needs.
              </p>
            </div>

            {/* Product Owner Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productOwnerProjects.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

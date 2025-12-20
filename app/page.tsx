import { Hero } from '@/components/Hero';
import { FrontendHero } from '@/components/FrontendHero';
import { CareerTimeline } from '@/components/CareerTimeline';
import { FrontendCareerTimeline } from '@/components/FrontendCareerTimeline';
import { Projects } from '@/components/Projects';
import { FrontendProjects } from '@/components/FrontendProjects';
import { Contact } from '@/components/Contact';
import { FrontendContact } from '@/components/FrontendContact';
import { ViewModeWrapper } from '@/components/ViewModeWrapper';
import { PersistentControls } from '@/components/PersistentControls';
import { getDeveloperProjects, getProductOwnerProjects } from '@/lib/github';

export default async function Home() {
  // Fetch project data for frontend view
  const developerProjects = await getDeveloperProjects();
  const productOwnerProjects = await getProductOwnerProjects();

  return (
    <main>
      {/* Persistent controls that don't fade during view transitions */}
      <PersistentControls />

      <ViewModeWrapper
        backendView={<Hero />}
        frontendView={<FrontendHero />}
      />
      <ViewModeWrapper
        backendView={<CareerTimeline />}
        frontendView={<FrontendCareerTimeline />}
      />
      <ViewModeWrapper
        backendView={<Projects />}
        frontendView={
          <FrontendProjects
            developerProjects={developerProjects}
            productOwnerProjects={productOwnerProjects}
          />
        }
      />
      <ViewModeWrapper
        backendView={<Contact />}
        frontendView={<FrontendContact />}
      />
    </main>
  );
}



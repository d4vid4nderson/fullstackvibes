import { Hero } from '@/components/Hero';
import { FrontendHero } from '@/components/FrontendHero';
import { CareerTimeline } from '@/components/CareerTimeline';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { ViewModeWrapper } from '@/components/ViewModeWrapper';

export default function Home() {
  return (
    <main>
      <ViewModeWrapper
        backendView={<Hero />}
        frontendView={<FrontendHero />}
      />
      <CareerTimeline />
      <Projects />
      <Contact />
    </main>
  );
}



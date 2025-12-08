import { Hero } from '@/components/Hero';
import { CareerTimeline } from '@/components/CareerTimeline';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <CareerTimeline />
      <Projects />
      <Contact />
    </main>
  );
}



export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "David Anderson",
    "url": "https://fullstackvibes.io",
    "image": "https://fullstackvibes.io/david-headshot-square.png",
    "jobTitle": "Full Stack Developer & AI Engineer",
    "description": "Full stack developer specializing in AI-powered enterprise applications. Expert in Go, Python, TypeScript, React, and Next.js.",
    "sameAs": [
      "https://github.com/d4vid4nderson",
      "https://linkedin.com/in/d4v1d4nd3rs0n"
    ],
    "knowsAbout": [
      "Go",
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "AI/ML",
      "Claude AI",
      "GPT-4",
      "Azure OpenAI",
      "Enterprise Software Development"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Software Engineering"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FullStackVibes",
    "url": "https://fullstackvibes.io",
    "description": "Portfolio website of David Anderson - Full Stack Developer & AI Engineer",
    "author": {
      "@type": "Person",
      "name": "David Anderson"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://fullstackvibes.io/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "David Anderson - Software Development Services",
    "url": "https://fullstackvibes.io",
    "description": "Full stack development and AI engineering services specializing in enterprise applications",
    "provider": {
      "@type": "Person",
      "name": "David Anderson"
    },
    "serviceType": [
      "Full Stack Development",
      "AI/ML Integration",
      "Enterprise Software",
      "Web Application Development"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}

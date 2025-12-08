import { GitHubRepo, GitHubUser } from '@/types/github';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'd4vid4nderson';

export async function getGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/users/${USERNAME}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch GitHub user data');
  }

  return res.json();
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=100`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }

  const repos: GitHubRepo[] = await res.json();

  // Filter out forks and sort by stars
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

// Developer projects - projects I built
const developerProjects: GitHubRepo[] = [
  {
    id: 1,
    name: 'InitiativeVUE',
    full_name: 'd4vid4nderson/InitiativeVUE',
    description: 'Full-stack Go application with HTMX frontend serving 50+ concurrent users. Features real-time WebSocket updates, multi-level approval workflows, PostgreSQL with 15+ tables, and RESTful API with 30+ endpoints. Integrated Claude AI for automated status reporting.',
    html_url: '#',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language: 'Go',
    topics: ['golang', 'azure', 'docker', 'tailwindcss', 'claude', 'playwright'],
    techStackCount: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'LegislationVUE',
    full_name: 'd4vid4nderson/leg_VUE',
    description: 'Python/FastAPI backend processing 20,000+ legislative documents via Azure OpenAI GPT-4. React frontend with real-time search across 6 state databases. PostgreSQL full-text search, Redis caching, and automated daily data ingestion pipelines.',
    html_url: 'https://github.com/d4vid4nderson/leg_VUE',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language: 'Python',
    topics: ['python', 'azure', 'docker', 'postgresql', 'openai', 'microsoft-ai'],
    techStackCount: 11,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'SharePointVUE',
    full_name: 'd4vid4nderson/SharePointVUE',
    description: 'Go-based automated testing framework using Playwright for SharePoint site validation. Scans 500+ pages per run, identifies broken links, validates WCAG 2.1 AA compliance, and generates PDF/JSON/CSV reports. Claude AI analyzes accessibility issues.',
    html_url: '#',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language: 'Go',
    topics: ['golang', 'azure', 'docker', 'tailwindcss', 'claude', 'playwright'],
    techStackCount: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'Tenant Wise',
    full_name: 'd4vid4nderson/Tenant-Wise',
    description: 'Next.js 14 SaaS with Supabase backend and Row-Level Security for multi-tenancy. Claude AI generates Texas Property Code-compliant legal documents. Stripe integration for subscriptions, SignWell API for e-signatures, and automated email workflows.',
    html_url: 'https://github.com/d4vid4nderson/Tenant-Wise',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language: 'TypeScript',
    topics: ['typescript', 'nextjs', 'react', 'tailwindcss', 'supabase', 'claude', 'signwell'],
    techStackCount: 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
  }
];

// Product Owner projects - projects I managed
const productOwnerProjects: GitHubRepo[] = [
  {
    id: 4,
    name: 'PlanVUE',
    full_name: 'd4vid4nderson/PlanVUE',
    description: 'Go/HTMX application managing 200+ active architectural projects. Features role-based access control, automated PDF generation, Claude AI for scope analysis, and PostgreSQL with 25+ tables. Reduced planning time from 5 days to 1 day (80% efficiency gain).',
    html_url: '#',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language: 'Go',
    topics: ['golang', 'htmx', 'postgresql', 'claude', 'tailwindcss', 'docker', 'playwright'],
    techStackCount: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'FacilityVUE',
    full_name: 'd4vid4nderson/FacilityVUE',
    description: 'Multi-tenant Go platform for K-12 facility management. Architecture supports 100+ school districts with isolated data via PostgreSQL schemas. RESTful API with 40+ endpoints, real-time notifications, and comprehensive audit logging for compliance.',
    html_url: '#',
    homepage: 'https://facilityvue.com/',
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language: 'Go',
    topics: ['golang', 'htmx', 'postgresql', 'tailwindcss', 'docker'],
    techStackCount: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
  }
];

export async function getDeveloperProjects(): Promise<GitHubRepo[]> {
  return developerProjects;
}

export async function getProductOwnerProjects(): Promise<GitHubRepo[]> {
  return productOwnerProjects;
}

export async function getFeaturedRepos(): Promise<GitHubRepo[]> {
  // Return all projects combined for backward compatibility
  return [...developerProjects, ...productOwnerProjects];
}

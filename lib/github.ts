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
    description: 'Broke down organizational silos by providing C-suite with unified visibility into cross-departmental initiatives previously tracked in isolation. Real-time executive dashboard enables data-driven strategic decision making.',
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
    description: 'Eliminated $40,000+ in annual legal consulting costs by automating analysis of 20,000+ state and federal legislative documents using Azure OpenAI (GPT-4). Transforms 8-hour manual reviews into instant insights.',
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
    description: 'Automated SharePoint testing and WCAG accessibility compliance using Playwright and Claude AI. Detects broken links, generates multi-format reports, and reduces manual QA time while improving site reliability.',
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
    description: 'SaaS platform for small Texas landlords that uses Claude AI to generate state-compliant legal documents. Automates late rent notices, lease renewals, and security deposit returns following Texas Property Code requirements.',
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
    description: 'Achieved 80% efficiency gain for architectural planners by eliminating manual data entry and collection. AI-enhanced workflows automatically generate project deliverables with multi-stakeholder approval chains and real-time health monitoring.',
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
    description: 'Recently shipped facility management platform currently being prepared for commercial release to school districts nationwide. Demonstrates transition from internal tooling to market-ready software product with scalable multi-tenant architecture.',
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

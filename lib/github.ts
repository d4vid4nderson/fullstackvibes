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
    description: 'Built solo — replaced org-wide Excel workbooks and PowerPoints with a unified initiative tracking platform. Multi-stage approval workflows, OpenAI-powered executive summaries for C-suite, AI subtask generation, Gantt charts, budget tracking, Teams integration, and role-based access across 5 permission levels. v1.11 with 67 database migrations in production.',
    html_url: '#',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language: 'Go',
    topics: ['golang', 'azure', 'docker', 'tailwindcss', 'claude', 'playwright', 'teams'],
    techStackCount: 8,
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
  },
  {
    id: 7,
    name: 'Habit-a-Day',
    full_name: 'd4vid4nderson/habit-a-day',
    description: 'AI-powered health assistant with Claude chatbot for conversational nutrition and PT guidance. Multi-turn conversational agent answers food questions, provides exercise recommendations, and offers health advice. Features calorie estimation from natural language, barcode scanning, and physical therapy practice management backend with patient dashboards, treatment plans, and clinical notes.',
    html_url: 'https://github.com/d4vid4nderson/habit-a-day',
    homepage: 'https://habit-a-day.vercel.app/auth/login',
    stargazers_count: 1,
    forks_count: 0,
    fork: false,
    language: 'TypeScript',
    topics: ['typescript', 'nextjs', 'react', 'tailwindcss', 'supabase', 'claude', 'postgresql', 'chatbot'],
    techStackCount: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: 'AI Status Widget',
    full_name: 'd4vid4nderson/ai-status-widget',
    description: 'Lightweight macOS Übersicht desktop widget showing live service health for OpenAI and Anthropic. Features expandable model/component details, drag-to-move positioning, light/dark themes, and auto-refresh every 2 minutes. Real-time monitoring of API status via Statuspage API integration.',
    html_url: 'https://github.com/d4vid4nderson/ai-status-widget',
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language: 'JavaScript',
    topics: ['javascript', 'react', 'macos', 'uebersicht', 'statuspage', 'openai', 'anthropic'],
    techStackCount: 7,
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
    description: 'Next.js application managing 200+ active architectural projects. Features role-based access control, automated PowerPoint generation, GPT 4o mini for design preference analysis. Reduced planning exercise hours from days to hours (+80% efficiency gain).',
    html_url: '#',
    homepage: 'https://planvue.moregroupdev.com/',
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language: 'TypeScript',
    topics: ['typescript', 'nextjs', 'tailwindcss', 'azure', 'openai'],
    techStackCount: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'FacilityVUE',
    full_name: 'd4vid4nderson/FacilityVUE',
    description: 'Next.js application for managing and visualizing facility assessments across K-12 school districts. Features interactive facility mapping with Mapbox, role-based access control with Azure AD, Autodesk Forge API integration for capturing issues from Autodesk Construction Cloud, and admin panel for organization management.',
    html_url: '#',
    homepage: 'https://facilityvue.com/',
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language: 'TypeScript',
    topics: ['typescript', 'nextjs', 'tailwindcss', 'azure'],
    techStackCount: 4,
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

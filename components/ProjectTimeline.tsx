'use client';

import { useState } from 'react';
import { GitHubRepo } from '@/types/github';
import { FiChevronDown, FiChevronUp, FiGitCommit, FiExternalLink, FiGithub, FiCheckCircle } from 'react-icons/fi';
import { SiAnthropic, SiGo, SiJavascript, SiTailwindcss, SiDocker, SiReact, SiPython, SiFastapi, SiPostgresql, SiTypescript, SiNextdotjs, SiVuedotjs, SiNodedotjs, SiSupabase, SiStripe } from 'react-icons/si';
import Image from 'next/image';

interface ProjectTimelineProps {
  projects: GitHubRepo[];
}

// Icon components
const GolangIcon = ({ className }: { className?: string }) => (
  <img src="/go.svg" alt="Go" width={16} height={16} className={className} />
);

const PythonIcon = ({ className }: { className?: string }) => (
  <img src="/python-color.svg" alt="Python" width={16} height={16} className={className} />
);

const JavaScriptIcon = ({ className }: { className?: string }) => (
  <img src="/JavaScript_logo.svg" alt="JavaScript" width={16} height={16} className={className} />
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <img src="/typescript-logo.svg" alt="TypeScript" width={16} height={16} className={className} />
);

const DockerIcon = ({ className }: { className?: string }) => (
  <img src="/docker-color.svg" alt="Docker" width={16} height={16} className={className} />
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <img src="/tailwindcss-color.svg" alt="Tailwind CSS" width={16} height={16} className={className} />
);

const ClaudeIcon = ({ className }: { className?: string }) => (
  <SiAnthropic className={`${className} text-orange-400`} style={{ width: 16, height: 16 }} />
);

const PlaywrightIcon = ({ className }: { className?: string }) => (
  <img src="/playwright.svg" alt="Playwright" width={16} height={16} className={className} />
);

const PostgreSQLIcon = ({ className }: { className?: string }) => (
  <img src="/postgresql.svg" alt="PostgreSQL" width={16} height={16} className={className} />
);

const OpenAIIcon = ({ className }: { className?: string }) => (
  <img src="/openai.svg" alt="OpenAI" width={16} height={16} className={className} />
);

const AzureIcon = ({ className }: { className?: string }) => (
  <img src="/azure-color.svg" alt="Azure DevOps" width={16} height={16} className={className} />
);

const ReactIcon = ({ className }: { className?: string }) => (
  <img src="/react-color.svg" alt="React" width={16} height={16} className={className} />
);

const NextJSIcon = ({ className }: { className?: string }) => (
  <img src="/nextjs-icon-svgrepo-com.svg" alt="Next.js" width={16} height={16} className={`${className} invert`} />
);

const VueIcon = ({ className }: { className?: string }) => (
  <img src="/vuejs-color.svg" alt="Vue.js" width={16} height={16} className={className} />
);

const NodeJSIcon = ({ className }: { className?: string }) => (
  <img src="/nodejs-color.svg" alt="Node.js" width={16} height={16} className={className} />
);

const AzureSqlIcon = ({ className }: { className?: string }) => (
  <img src="/azure-color.svg" alt="Azure SQL" width={16} height={16} className={className} />
);

const SupabaseIcon = ({ className }: { className?: string }) => (
  <img src="/supabase-logo-icon.svg" alt="Supabase" width={16} height={16} className={className} />
);

const StripeIcon = ({ className }: { className?: string }) => (
  <img src="/stripe.svg" alt="Stripe" width={16} height={16} className={className} />
);

const AzureAIIcon = ({ className }: { className?: string }) => (
  <Image
    src="/azureai-color.svg"
    alt="Azure AI Foundry"
    width={24}
    height={24}
    className={className}
  />
);

const SignWellIcon = ({ className }: { className?: string }) => (
  <Image
    src="/signwell.svg"
    alt="SignWell"
    width={24}
    height={24}
    className={className}
  />
);

const getIconForTopic = (topic: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'golang': GolangIcon,
    'go': GolangIcon,
    'javascript': JavaScriptIcon,
    'js': JavaScriptIcon,
    'tailwindcss': TailwindIcon,
    'tailwind': TailwindIcon,
    'typescript': TypeScriptIcon,
    'ts': TypeScriptIcon,
    'react': ReactIcon,
    'reactjs': ReactIcon,
    'nextjs': NextJSIcon,
    'next': NextJSIcon,
    'python': PythonIcon,
    'nodejs': NodeJSIcon,
    'node': NodeJSIcon,
    'docker': DockerIcon,
    'postgresql': PostgreSQLIcon,
    'postgres': PostgreSQLIcon,
    'azuresql': AzureSqlIcon,
    'azure-sql': AzureSqlIcon,
    'vue': VueIcon,
    'vuejs': VueIcon,
    'claude': ClaudeIcon,
    'anthropic': ClaudeIcon,
    'playwright': PlaywrightIcon,
    'openai': OpenAIIcon,
    'azure': AzureIcon,
    'supabase': SupabaseIcon,
    'stripe': StripeIcon,
  };

  return iconMap[topic.toLowerCase()];
};

// Custom icon components for tech stack
const AzureAIIconLarge = ({ className }: { className?: string }) => (
  <Image
    src="/azureai-color.svg"
    alt="Azure AI Foundry"
    width={20}
    height={20}
    className={className}
  />
);

const SignWellIconLarge = ({ className }: { className?: string }) => (
  <Image
    src="/signwell.svg"
    alt="SignWell"
    width={20}
    height={20}
    className={className}
  />
);

const OpenAIIconLarge = ({ className }: { className?: string }) => (
  <Image
    src="/openai.svg"
    alt="OpenAI"
    width={20}
    height={20}
    className={className}
  />
);

const PlaywrightIconLarge = ({ className }: { className?: string }) => (
  <Image
    src="/playwright.svg"
    alt="Playwright"
    width={20}
    height={20}
    className={className}
  />
);

// Custom project details for all projects
const getProjectDetails = (repoName: string) => {
  const details: { [key: string]: any } = {
    'InitiativeVUE': {
      fullDescription: 'AI-powered enterprise initiative tracking platform with Microsoft Teams bot integration and Claude AI-driven automated reporting. InitiativeVUE features custom Teams bots for MS Office 365 integration: a notification bot that flags channels when new initiatives are created, and a conversational bot allowing users to check status, update fields, and manage initiatives directly from Teams chat using Adaptive Cards. Provides strategic oversight and executive tracking with LLM-powered executive summaries and real-time collaboration through Microsoft 365.',
      keyFeatures: [
        'Microsoft Teams Bot integration: notification bot flags Teams channels on new initiative creation, conversational bot with Adaptive Cards for status checks and field updates directly from Teams chat',
        'Chatbot/Agent functionality: users interact with InitiativeVUE entirely through Teams using natural language commands ("check status of Project X", "update budget to $50k")',
        'Adaptive Cards for rich UI: interactive forms within Teams for initiative updates, approvals, and status changes without leaving Microsoft 365',
        'MS Office 365 integration: seamless workflow for 50+ concurrent users managing initiatives within their existing Microsoft ecosystem',
        'Claude AI integration for automated status report generation and executive summaries',
        'CI/CD pipeline with Azure DevOps for automated testing, Docker builds, and Azure Container Apps deployment',
        'Multi-level approval workflow with department, management, and executive approval stages accessible via Teams bot',
        'Automated Playwright E2E tests in CI pipeline with 80+ test cases covering critical workflows',
      ],
      capabilities: [
        { title: 'Microsoft Teams Bot & Office Integration', description: 'Custom Teams bots provide native MS Office 365 integration. Notification bot monitors initiative creation and posts to designated Teams channels with @mentions for stakeholders. Conversational bot accepts natural language commands ("show my initiatives", "update Project Alpha status to yellow") and responds with Adaptive Cards for rich interactive UI. Users manage entire initiative lifecycle without leaving Teams. Bot handles authentication, authorization, and real-time updates via Teams webhooks' },
        { title: 'Chatbot/Agent Development', description: 'Conversational AI agent built with Microsoft Bot Framework handles intent recognition, entity extraction, and context management. Supports commands for checking status, updating fields (budget, timeline, health status, stakeholders), approving initiatives, and generating reports. Adaptive Cards provide interactive buttons, dropdowns, and forms within Teams chat for seamless user experience' },
        { title: 'AI-Powered Reporting', description: 'Claude AI automatically generates executive status reports, summarizes initiative progress, and creates talking points for leadership meetings with natural language processing. Integrated with Teams bot for on-demand report generation via chat' },
        { title: 'CI/CD & DevOps', description: 'Azure DevOps pipelines automate build, test, and deployment processes. Docker containerization with automated image builds on commit. Playwright tests run automatically on pull requests with deployment to Azure Container Apps staging and production environments' },
        { title: 'Enterprise Collaboration', description: 'Comprehensive initiative tracking with status, departments, stakeholders, budgets, timelines accessible via web app or Teams bot. Real-time health status monitoring with green/yellow/red indicators. Multi-level approval workflows with notifications via Teams channels' },
      ],
      techIcons: [
        { Icon: SiGo, name: 'Go', color: 'text-cyan-400' },
        { Icon: Image, name: 'Azure DevOps', color: '', props: { src: '/azure-color.svg', width: 20, height: 20, alt: 'Azure' } },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-400' },
        { Icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
        { Icon: SiDocker, name: 'Docker', color: 'text-blue-400' },
        { Icon: SiAnthropic, name: 'Claude AI', color: 'text-orange-400' },
        { Icon: PlaywrightIconLarge, name: 'Playwright', color: '' },
      ],
      alsoIncludes: 'Microsoft Bot Framework, Teams SDK, Adaptive Cards, HTMX, Alpine.js, Azure Container Apps, SQL Server, Chi Router, Webhooks',
    },
    'LegislationVUE': {
      fullDescription: 'AI-driven legislative intelligence platform powered by Azure AI Foundry and GPT-4o for automated policy analysis. LegislationVUE monitors federal executive orders and state legislation across 6 US states (CA, TX, NV, KY, SC, CO), using LLM batch processing to generate executive summaries, talking points, and business impact assessments. Provides automated policy intelligence with real-time AI-generated insights empowering C-suite decision-making on regulatory compliance, risk mitigation, and strategic planning.',
      keyFeatures: [
        'Azure AI Foundry GPT-4o batch processing: 20,000+ legislative documents analyzed with AI-generated executive summaries, talking points, and business impact assessments',
        'Prompt engineering for legislative analysis: custom system prompts designed for policy interpretation, practice area categorization, and stakeholder impact assessment',
        'CI/CD pipeline with Azure DevOps: automated Python/FastAPI backend deployments, React frontend builds, and PostgreSQL migrations to Azure Container Apps',
        'Automated testing suite: Playwright E2E tests with nightly regression testing processing 50-60 bills per minute',
        'Practice area categorization using LLM classification across Healthcare, Education, Engineering, Civic sectors',
        'Azure AD Single Sign-On with personalized bookmarking and review status tracking',
        'Interactive US state map visualizations and analytics dashboards with Recharts and D3',
        'Dark mode support with modern purple/violet theme and responsive design',
      ],
      capabilities: [
        { title: 'AI Analysis Pipeline', description: 'Azure AI Foundry batch processing with GPT-4o models analyzing executive orders and state legislation. Custom prompt engineering generates strategic policy overviews, discussion frameworks, and industry-specific operational implications. LLM output includes executive summaries, talking points, and compliance recommendations' },
        { title: 'CI/CD & DevOps', description: 'Azure DevOps pipelines automate Python backend builds, React frontend deployments, and PostgreSQL schema migrations. Docker multi-stage builds optimize image sizes. Automated Playwright tests validate AI-generated content accuracy. Azure Container Apps hosting with auto-scaling based on API load' },
        { title: 'Multi-State Legislation Tracking', description: 'Track 20,000+ bills across California, Texas, Nevada, Kentucky, South Carolina, and Colorado with LegiScan API integration and real-time updates through nightly automated jobs' },
        { title: 'LLM-Powered Insights', description: 'GPT-4o models analyze legislative text to extract key provisions, assess business impact, and categorize by practice area. Automated sentiment analysis and stakeholder impact scoring' },
        { title: 'User Dashboard', description: 'Personalized workspace with AI-curated bookmarks, review tracking, session analytics, and advanced filtering by AI-detected practice areas' },
      ],
      techIcons: [
        { Icon: SiPython, name: 'Python', color: 'text-blue-400' },
        { Icon: Image, name: 'Azure DevOps', color: '', props: { src: '/azure-color.svg', width: 20, height: 20, alt: 'Azure' } },
        { Icon: SiReact, name: 'React', color: 'text-cyan-400' },
        { Icon: SiFastapi, name: 'FastAPI', color: 'text-teal-400' },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-400' },
        { Icon: SiPostgresql, name: 'PostgreSQL', color: 'text-blue-400' },
        { Icon: SiDocker, name: 'Docker', color: 'text-blue-400' },
        { Icon: SiAnthropic, name: 'Claude AI', color: 'text-orange-400' },
        { Icon: PlaywrightIconLarge, name: 'Playwright', color: '' },
        { Icon: OpenAIIconLarge, name: 'OpenAI', color: '' },
        { Icon: AzureAIIconLarge, name: 'Azure AI Foundry', color: '' },
      ],
      alsoIncludes: 'Azure Container Apps, Azure SQL Server, Azure OpenAI, Azure AD, Vite, Recharts, D3.js, BeautifulSoup, Pandas, SQLAlchemy',
    },
    'SharePointVUE': {
      fullDescription: 'AI-enhanced automated SharePoint testing platform with Claude AI-powered accessibility analysis. SharePointVUE uses Playwright for headless browser testing and integrates Claude AI to analyze WCAG compliance issues, provide remediation recommendations, and generate executive test reports. Features real-time monitoring, multi-format reporting, and Azure DevOps CI/CD automation.',
      keyFeatures: [
        'Claude AI integration for automated accessibility issue analysis and WCAG remediation recommendations',
        'Automated Playwright testing: 500+ pages per test run with headless browser validation for links, images, and media',
        'CI/CD pipeline with Azure DevOps: automated Go backend builds, Docker containerization, and deployment to Azure Container Apps',
        'Comprehensive test suite: broken links (404s), missing images, page load performance metrics, WCAG 2.1 AA compliance via axe-core',
        'Automated regression testing with scheduled nightly runs and test result archival',
        'Multi-format AI-enhanced reporting: PDF reports with Claude-generated executive summaries, interactive HTML dashboards, and JSON exports',
        'Azure AD integration with MFA support for seamless Microsoft authentication',
        'HTMX-powered dynamic interface with responsive mobile-first design',
      ],
      capabilities: [
        { title: 'AI-Powered Accessibility Analysis', description: 'Claude AI analyzes axe-core accessibility violations, categorizes issues by severity, and generates plain-language remediation guidance. LLM-powered executive summaries highlight critical compliance gaps and recommended action items' },
        { title: 'CI/CD & DevOps', description: 'Azure DevOps pipelines automate Go application builds, run Playwright test suites, and deploy Docker containers to Azure Container Apps. Automated test scheduling with results stored in Azure SQL Database. Environment-specific configuration management with secrets in Azure Key Vault' },
        { title: 'Automated Testing at Scale', description: 'Playwright headless browser testing scans 500+ SharePoint pages per run. Validates broken links, missing media, performance metrics, and WCAG accessibility compliance. Parallel test execution for faster results' },
        { title: 'Real-time Monitoring', description: 'Live test progress updates with automatic polling, event-driven UI updates via HTMX, and modal-based workflows for clean user experience' },
        { title: 'Enterprise Reporting', description: 'Multi-format test reports (PDF with Claude AI summaries, HTML dashboards, JSON for API integration) with site-by-page breakdowns, test history storage, and downloadable archives' },
      ],
      techIcons: [
        { Icon: SiGo, name: 'Go', color: 'text-cyan-400' },
        { Icon: Image, name: 'Azure DevOps', color: '', props: { src: '/azure-color.svg', width: 20, height: 20, alt: 'Azure' } },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-400' },
        { Icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
        { Icon: SiDocker, name: 'Docker', color: 'text-blue-400' },
        { Icon: SiAnthropic, name: 'Claude AI', color: 'text-orange-400' },
        { Icon: PlaywrightIconLarge, name: 'Playwright', color: '' },
      ],
      alsoIncludes: 'HTMX, Chi Router, axe-core, Azure Container Apps, Azure SQL Database, Azure AD, Heroicons, Chromium',
    },
    'PlanVUE': {
      fullDescription: 'AI-powered strategic planning platform with OpenAI GPT-4o Mini integration for automated survey analysis and insights generation. PlanVUE combines traditional surveys with Red Dot/Green Dot (RDGD) ranking exercises, using LLM technology to analyze stakeholder responses, detect sentiment patterns, and generate executive summaries. Achieved 80% efficiency gain for architectural planners saving $400,000+ in manual data processing. AI-enhanced workflows automatically generate PowerPoint presentations with insights, transforming weeks of manual analysis into minutes.',
      keyFeatures: [
        'OpenAI GPT-4o Mini integration for automated survey response analysis and sentiment detection',
        'AI-powered insight generation: LLM analyzes open-ended responses to identify themes, concerns, and recommendations',
        'Automated PowerPoint generation with AI-summarized findings, word clouds, and stakeholder sentiment analysis',
        'Multi-modal survey system supporting traditional questionnaires and RDGD visual ranking exercises',
        'Real-time collaborative planning sessions with live updates via SignalR for team engagement',
        'Interactive data visualization with Chart.js, D3.js word clouds, and AI-enhanced gauge charts',
        'Multi-format AI-enhanced export: PowerPoint with LLM summaries, Excel with sentiment scores, PDF reports',
        'Comprehensive client and project management with role-based access control',
      ],
      capabilities: [
        { title: 'AI Survey Analysis', description: 'OpenAI GPT-4o Mini analyzes survey responses to detect sentiment, identify common themes, and extract actionable insights. LLM-powered text analysis categorizes open-ended feedback by topic (facilities, curriculum, budget). Automated generation of executive summaries highlighting key stakeholder concerns and recommendations' },
        { title: 'AI-Enhanced Reporting', description: 'Automated PowerPoint generation with GPT-4o Mini-written executive summaries, sentiment analysis breakdowns, and recommendation sections. Excel exports include LLM-generated sentiment scores. PDF reports feature AI-interpreted trends and insights for board presentations' },
        { title: 'RDGD Ranking System', description: 'Red Dot/Green Dot methodology allowing participants to visually rank priorities by placing colored dots on architectural renderings, with real-time aggregation and AI analysis of preference patterns' },
        { title: 'Client & Project Portal', description: 'Dedicated client portals for accessing surveys, viewing AI-generated results, managing team members, and tracking project progress with customizable branding' },
        { title: 'Real-time Collaboration', description: 'Live survey sessions with SignalR, team brainstorming tools, comment threads, and instant notifications. AI-powered moderation flags inappropriate content' },
      ],
      techIcons: [
        { Icon: SiTypescript, name: 'TypeScript', color: 'text-blue-400' },
        { Icon: Image, name: 'Azure DevOps', color: '', props: { src: '/azure-color.svg', width: 20, height: 20, alt: 'Azure' } },
        { Icon: SiReact, name: 'React', color: 'text-cyan-400' },
        { Icon: SiNextdotjs, name: 'Next.js', color: 'text-white' },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-400' },
        { Icon: SiDocker, name: 'Docker', color: 'text-blue-400' },
        { Icon: OpenAIIconLarge, name: 'OpenAI', color: '' },
        { Icon: PlaywrightIconLarge, name: 'Playwright', color: '' },
      ],
      alsoIncludes: 'SignalR, Chart.js, D3.js, React Query, Azure Blob Storage, Next-Auth, FontAwesome, Heroicons, Excel.js, jsPDF, PPTXGenJS',
    },
    'FacilityVUE': {
      fullDescription: 'FacilityVUE is a comprehensive facilities management and geospatial assessment platform designed for multi-district school systems. The application provides interactive mapping, facility tracking, and assessment management across multiple school districts. Built with Vue.js and Mapbox integration, FacilityVUE enables administrators to visualize facility locations, manage maintenance schedules, track assessments, and coordinate resources across geographically distributed campuses.',
      keyFeatures: [
        'Interactive geospatial mapping with Mapbox integration for visualizing facilities across multiple districts',
        'Multi-district support with custom branding and district-specific facility management',
        'Automated geocoding service converting facility addresses to accurate map coordinates',
        'Facility assessment tracking with maintenance schedules, condition reports, and compliance monitoring',
        'Client and admin portals with role-based access control for district stakeholders',
        'Responsive campus cards displaying facility details, location data, and assessment status',
        'Real-time facility location updates with geographic coordinate management system',
        'Export capabilities for facility reports, assessment summaries, and compliance documentation',
      ],
      capabilities: [
        { title: 'Geospatial Facility Management', description: 'Interactive Mapbox-powered maps displaying facility locations with accurate geocoding, district boundaries, and campus clustering for efficient visualization of multi-district school systems' },
        { title: 'Multi-District Administration', description: 'Centralized platform supporting Willis ISD, Conroe ISD, and Magnolia ISD with district-specific configurations, branding, and facility hierarchies' },
        { title: 'Assessment & Maintenance Tracking', description: 'Comprehensive facility condition assessments, maintenance scheduling, compliance monitoring, and automated reporting for proactive facility management' },
        { title: 'Resource Allocation', description: 'Space planning tools, room booking systems, asset tracking across locations, and resource optimization for efficient facility utilization' },
        { title: 'Data Management & Reporting', description: 'Azure SQL-backed facility database with CSV import/export, automated coordinate conversion, and customizable reporting for stakeholder communication' },
      ],
      techIcons: [
        { Icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
        { Icon: Image, name: 'Azure DevOps', color: '', props: { src: '/azure-color.svg', width: 20, height: 20, alt: 'Azure' } },
        { Icon: SiVuedotjs, name: 'Vue.js', color: 'text-green-400' },
        { Icon: SiNodedotjs, name: 'Node.js', color: 'text-green-600' },
        { Icon: Image, name: 'Azure SQL', color: '', props: { src: '/azure-color.svg', width: 20, height: 20, alt: 'Azure SQL' } },
        { Icon: SiDocker, name: 'Docker', color: 'text-blue-400' },
      ],
      alsoIncludes: 'Mapbox GL, Next.js, Tailwind CSS, TypeScript, Axios, Heroicons, Express, CSV Parser, Geocoding API',
    },
    'Tenant Wise': {
      fullDescription: 'AI-powered legal document generation SaaS using Claude API for Texas-compliant landlord notices. TenantWise leverages large language models with custom prompt engineering to automatically generate state-compliant legal documents, notices, and communications. Advanced prompt templates ensure Texas Property Code compliance (§ 24.005, § 92.103) while maintaining professional legal language. Reduces expensive property management software costs ($50-200/month) to an affordable AI-driven solution ($19-39/month).',
      keyFeatures: [
        'Claude AI prompt engineering for legal document generation: custom system prompts trained on Texas Property Code with few-shot examples of compliant legal notices',
        'Prompt templates for 6+ document types: Late Rent Notices (§ 24.005), Security Deposit Returns (§ 92.103), Lease Renewals, Maintenance Responses, Move-In/Out Checklists',
        'LLM context injection: dynamically insert tenant data, property details, and lease terms into prompts for personalized legal documents',
        'Legal AI Assistant chatbot: Claude-powered conversational agent trained on Texas landlord-tenant law with retrieval-augmented generation (RAG)',
        'Prompt validation: ensure generated documents include required legal citations, timelines, and language per Texas Property Code',
        'Token optimization: structured prompts average 500 tokens per document generation, reducing API costs',
        'AI output review: human-in-the-loop validation for legal accuracy before document delivery',
        'Stripe integration for subscription management with usage-based billing tied to AI API calls',
      ],
      capabilities: [
        { title: 'AI Document Generation & Prompt Engineering', description: 'Claude AI generates Texas-compliant legal documents using engineered prompts with embedded Texas Property Code knowledge. System prompts include few-shot examples of compliant notices. Dynamic context injection personalizes documents with tenant names, amounts owed, property addresses, and legal deadlines. Output validation ensures § 24.005 and § 92.103 compliance' },
        { title: 'Legal AI Chatbot', description: 'Conversational Claude AI assistant trained on Texas landlord-tenant law. Uses retrieval-augmented generation (RAG) to cite specific Property Code sections. Provides instant answers about eviction procedures, security deposit rules, late fees, and maintenance responsibilities. Context-aware follow-up questions for complex legal scenarios' },
        { title: 'LLM Compliance & Validation', description: 'Automated validation of AI-generated documents against Texas Property Code requirements. Prompt engineering ensures legal citations, required language, and proper timelines. Human review workflow for legal accuracy before tenant delivery. Audit trail of all AI-generated documents for compliance records' },
        { title: 'Property & Tenant Management', description: 'Save property profiles with addresses, unit details, and lease terms. Store tenant contact information, lease dates, rent amounts, and security deposits. Data automatically injected into Claude prompts for personalized document generation' },
        { title: 'SaaS Subscription Model', description: 'Flexible pricing with Free (3 docs/month), Basic ($19/month unlimited), and Pro ($39/month with multi-property support) tiers via Stripe. Usage-based billing tracks Claude API token consumption' },
      ],
      techIcons: [
        { Icon: SiTypescript, name: 'TypeScript', color: 'text-blue-400' },
        { Icon: SiNextdotjs, name: 'Next.js', color: 'text-white' },
        { Icon: SiReact, name: 'React', color: 'text-cyan-400' },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-400' },
        { Icon: SiSupabase, name: 'Supabase', color: 'text-green-400' },
        { Icon: SiAnthropic, name: 'Claude AI', color: 'text-orange-400' },
        { Icon: SiStripe, name: 'Stripe', color: 'text-purple-400' },
        { Icon: SiPostgresql, name: 'PostgreSQL', color: 'text-blue-400' },
        { Icon: SignWellIconLarge, name: 'SignWell', color: '' },
      ],
      alsoIncludes: 'Supabase Auth, Row Level Security, Vercel, React 19, App Router, E-Signatures',
    },
    'Habit-a-Day': {
      fullDescription: 'AI-powered health assistant with Claude API chatbot for conversational nutrition and physical therapy guidance. Habit-a-Day features a conversational AI agent that answers food-related questions, provides PT exercise guidance, and offers health recommendations through natural language chat. Uses LLM technology to parse free-text food descriptions, estimate calories/macros, and provide domain-specific health advice. Features physical therapy practice management backend with multi-role access, treatment plans, and clinical notes.',
      keyFeatures: [
        'Conversational AI health assistant: Claude-powered chatbot answers questions about food nutrition, exercise form, PT recovery, and general health guidance through natural language dialogue',
        'Multi-turn conversation support: maintains context across chat sessions for personalized health recommendations and follow-up questions',
        'Claude AI prompt engineering for nutrition analysis: custom system prompts parse natural language food descriptions ("chicken sandwich with fries") and return structured JSON with calories, protein, carbs, and fat estimates',
        'Domain-specific chatbot training: prompts engineered for health/PT domain with medical terminology, exercise guidance, and nutritional advice with safety guardrails',
        'LLM-powered macro estimation with few-shot examples trained on USDA nutritional data for accuracy',
        'Barcode scanning with html5-qrcode for instant product lookup integrated with AI fallback for missing data',
        'Prompt templates optimized for token efficiency: structured outputs reduce API costs while maintaining accuracy',
        'Healthcare report generation with PDF export (jspdf, html2canvas) and shareable patient summaries',
      ],
      capabilities: [
        { title: 'Conversational AI Health Chatbot', description: 'Claude API-powered conversational agent provides real-time answers to health-related questions. Users ask about food nutrition ("How many calories in an apple?"), PT exercises ("Best stretches for lower back pain?"), recovery guidance, and general wellness. Multi-turn conversations maintain context for follow-up questions. System prompts include safety guardrails preventing medical diagnosis and emphasizing consultation with healthcare providers. Responses cite sources and provide evidence-based recommendations' },
        { title: 'AI Nutrition Analysis & Prompt Engineering', description: 'Claude AI-powered calorie estimation using engineered prompts that parse natural language food descriptions into structured nutritional data. System prompts include few-shot examples from USDA database for improved accuracy. Prompt templates enforce JSON output schema for consistent macro calculations. Token usage optimized with concise prompts averaging 150 tokens per request. Conversational mode allows clarifying questions for ambiguous foods' },
        { title: 'LLM Integration Best Practices', description: 'Input validation and sanitization prevent prompt injection attacks. Rate limiting on Claude API calls prevents abuse. Caching of common food items and Q&A responses reduces API costs. Error handling with graceful fallback to manual entry. Conversation history stored securely with encryption. Audit logging of all AI requests for compliance and debugging' },
        { title: 'Medical Habit Tracking', description: 'Comprehensive tracking interface for bathroom usage with medical metrics, water intake with unit conversion, and food journaling with macro breakdowns for clinical monitoring' },
        { title: 'PT Practice Management', description: 'Multi-role backend (patient, therapist, practice_owner) with patient dashboards showing all tracking data, treatment plan assignment, clinical notes (assessment, progress, alert, general), and goal management' },
      ],
      techIcons: [
        { Icon: SiTypescript, name: 'TypeScript', color: 'text-blue-400' },
        { Icon: SiNextdotjs, name: 'Next.js', color: 'text-white' },
        { Icon: SiReact, name: 'React', color: 'text-cyan-400' },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-400' },
        { Icon: SiSupabase, name: 'Supabase', color: 'text-green-400' },
        { Icon: SiAnthropic, name: 'Claude AI', color: 'text-orange-400' },
        { Icon: SiPostgresql, name: 'PostgreSQL', color: 'text-blue-400' },
      ],
      alsoIncludes: 'Anthropic AI SDK, Recharts, html5-qrcode, html2canvas, jspdf, Fuse.js, Row Level Security, Supabase Auth, Real-time Subscriptions, Vercel',
    }
  };

  return details[repoName] || null;
};

interface ProjectTimelineCardProps {
  repo: GitHubRepo;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}

function ProjectTimelineCard({ repo, isExpanded, onToggle, isLast }: ProjectTimelineCardProps) {
  const projectDetails = getProjectDetails(repo.name);

  return (
    <div className={`relative pl-8 sm:pl-12 ${isLast ? '' : 'pb-6'}`}>
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[11px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent opacity-30" />
      )}

      {/* Git commit node - highlights when expanded */}
      <div className="absolute left-0 sm:left-2 top-0 flex items-center justify-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          isExpanded
            ? 'bg-accent-dark text-white shadow-lg shadow-accent-primary/50'
            : 'bg-white dark:bg-[#1a1a1a] border-2 border-accent-primary/50'
        }`}>
          <FiGitCommit className={`w-3 h-3 ${isExpanded ? 'text-white' : 'text-accent'}`} />
        </div>
      </div>

      {/* Card */}
      <div
        className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
          isExpanded
            ? 'bg-white/90 dark:bg-[#1a1a1a] border-accent-primary/30 shadow-lg shadow-accent-primary/10'
            : 'bg-white/80 dark:bg-[#1a1a1a]/80 border-gray-300 dark:border-white/10 hover:border-accent-primary/30'
        }`}
      >
        <div className="p-4 sm:p-5">
          {/* Header - Always clickable to toggle */}
          <div className="cursor-pointer" onClick={onToggle}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Project name with language badge */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-bold text-gray-900 dark:text-white text-base sm:text-lg transition-all duration-300 ${
                    isExpanded ? 'gradient-text' : ''
                  }`}>
                    {repo.name}
                  </h3>
                  {repo.language && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold uppercase tracking-wide">
                      {repo.language}
                    </span>
                  )}
                </div>

                {/* Description - always visible */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                  {repo.description || 'No description provided'}
                </p>
              </div>

              {/* Expand toggle */}
              <div className="flex items-center gap-2">
                <button
                  className="p-1 rounded-full hover:bg-accent/10 transition-colors"
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? (
                    <FiChevronUp className="w-4 h-4 text-accent" />
                  ) : (
                    <FiChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Expandable content */}
          <div className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? 'max-h-[5000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            {isExpanded && (
              <div className="space-y-6 font-sans">
                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  {repo.homepage && repo.homepage !== '#' && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-accent-to-r text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {repo.html_url !== '#' && (
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-gray-300 dark:border-white/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>View on GitHub</span>
                    </a>
                  )}
                </div>

                {projectDetails ? (
                  <>
                    {/* Full Description */}
                    {projectDetails.fullDescription && (
                      <div>
                        <h4 className="text-sm font-bold text-accent uppercase tracking-wide mb-2 font-mono">
                          # About
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {projectDetails.fullDescription}
                        </p>
                      </div>
                    )}

                    {/* Key Features */}
                    {projectDetails.keyFeatures && projectDetails.keyFeatures.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-accent uppercase tracking-wide mb-3 font-mono">
                          # Key Features
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {projectDetails.keyFeatures.map((feature: string, index: number) => (
                            <div key={index} className="flex gap-3">
                              <FiCheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Capabilities */}
                    {projectDetails.capabilities && projectDetails.capabilities.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-accent uppercase tracking-wide mb-3 font-mono">
                          # Core Capabilities
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {projectDetails.capabilities.map((capability: any, index: number) => (
                            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                              <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                                {capability.title}
                              </h5>
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {capability.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack */}
                    {projectDetails.techIcons && projectDetails.techIcons.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-accent uppercase tracking-wide mb-3 font-mono">
                          # Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {projectDetails.techIcons.map((tech: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                            >
                              {tech.Icon === Image && tech.props ? (
                                <Image {...tech.props} className={`w-5 h-5 ${tech.color}`} />
                              ) : (
                                <tech.Icon className={`w-5 h-5 ${tech.color}`} />
                              )}
                              <span className="text-sm text-gray-700 dark:text-gray-300">{tech.name}</span>
                            </div>
                          ))}
                        </div>
                        {projectDetails.alsoIncludes && (
                          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Also includes:</span> {projectDetails.alsoIncludes}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  /* Basic tech stack when no detailed info */
                  repo.topics.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-accent uppercase tracking-wide mb-2 font-mono">
                        # Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {repo.topics.slice(0, 8).map((topic) => {
                          const Icon = getIconForTopic(topic);
                          return Icon ? (
                            <div
                              key={topic}
                              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{topic}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(projects[0]?.id || null);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative">
      {projects.map((repo, index) => (
        <ProjectTimelineCard
          key={repo.id}
          repo={repo}
          isExpanded={expandedId === repo.id}
          onToggle={() => handleToggle(repo.id)}
          isLast={index === projects.length - 1}
        />
      ))}
    </div>
  );
}

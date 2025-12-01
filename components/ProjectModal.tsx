'use client';

import { useState, useEffect } from 'react';
import { GitHubRepo } from '@/types/github';
import { FiX, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { SiGo, SiJavascript, SiTailwindcss, SiDocker, SiAnthropic, SiReact, SiPython, SiFastapi, SiPostgresql, SiTypescript, SiNextdotjs, SiVuedotjs, SiNodedotjs, SiMongodb, SiSupabase, SiStripe } from 'react-icons/si';
import Image from 'next/image';
import { MermaidDiagram } from './MermaidDiagram';
import { ScreenshotShowcase } from './ScreenshotShowcase';

interface ProjectModalProps {
  repo: GitHubRepo | null;
  isOpen: boolean;
  onClose: () => void;
}

// Custom icon components
const PlaywrightIcon = ({ className }: { className?: string }) => (
  <Image
    src="/playwright.svg"
    alt="Playwright"
    width={24}
    height={24}
    className={className}
  />
);

const OpenAIIcon = ({ className }: { className?: string }) => (
  <Image
    src="/openai.svg"
    alt="OpenAI"
    width={24}
    height={24}
    className={className}
  />
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

const AzureIcon = ({ className }: { className?: string }) => (
  <Image
    src="/azure-color.svg"
    alt="Azure DevOps"
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

// Custom project details for private projects
const getProjectDetails = (repoName: string) => {
  const details: { [key: string]: any } = {
    'InitiativeVUE': {
      diagramPath: '/diagrams/init_vue.mmd',
      fullDescription: 'InitiativeVUE is a comprehensive enterprise platform that provides strategic oversight and executive tracking of organizational initiatives. The system enables leadership to approve projects, track progress, manage budgets, and maintain stakeholder alignment from sponsors through to end users.',
      keyFeatures: [
        'Multi-level approval workflow with department, management, and executive approval stages',
        'Real-time health status monitoring with green/yellow/red indicators and mitigation planning',
        'Comprehensive budget tracking across capital costs, operational costs, personnel, and technology',
        'Executive Leadership Dashboard with strategic insights and analytics',
        'Interactive Gantt charts and calendar views for initiative scheduling',
        'Department-based organization with 12 color-coded departments for visual clarity',
        'Rich commenting system with activity tracking and collaborative features',
        'Mobile-optimized responsive design with dark mode support',
      ],
      capabilities: [
        { title: 'Dashboard & Welcome', description: 'Centralized hub with quick actions: Create Initiative, View All Initiatives, My Initiatives, and View Schedule' },
        { title: 'Initiative Management', description: 'Browse and manage all initiatives with advanced filtering by department, status, and health indicators' },
        { title: 'Detailed Tracking', description: 'Comprehensive initiative details including status, departments, stakeholders, budgets, timelines, and progress tracking' },
        { title: 'Visual Scheduling', description: 'Gantt chart and calendar views showing initiative timelines across quarters with drag-and-drop capabilities' },
        { title: 'Executive Insights', description: 'Leadership dashboard with high-level overview, initiative pipeline, and strategic analytics' },
      ],
      techIcons: [
        { Icon: SiGo, name: 'Go', color: 'text-cyan-400' },
        { Icon: AzureIcon, name: 'Azure DevOps', color: '' },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-400' },
        { Icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
        { Icon: SiDocker, name: 'Docker', color: 'text-blue-400' },
        { Icon: SiAnthropic, name: 'Claude AI', color: 'text-orange-400' },
        { Icon: PlaywrightIcon, name: 'Playwright', color: '' },
      ],
      alsoIncludes: 'HTMX, Alpine.js, Azure Container Apps, SQL Server, Chi Router',
      screenshots: [
        {
          src: '/screenshots/initiative-homepage.png',
          alt: 'InitiativeVUE Homepage',
          caption: 'Main dashboard with quick actions to Create Initiative, View All Initiatives, My Initiatives, and View Schedule. Centralized hub for strategic oversight with intuitive navigation.'
        },
        {
          src: '/screenshots/initiatives-all.png',
          alt: 'All Initiatives View',
          caption: 'Browse and manage all organizational initiatives with advanced filtering by department, status, and health indicators. Color-coded by 12 departments for visual clarity.'
        },
        {
          src: '/screenshots/initiative-my.png',
          alt: 'My Initiatives',
          caption: 'Personalized view showing initiatives assigned to the current user with status tracking, health monitoring, and quick access to owned or sponsored projects.'
        },
        {
          src: '/screenshots/initiative-new.png',
          alt: 'Create New Initiative',
          caption: 'Initiative creation form with comprehensive fields for budgets, departments, stakeholders, timelines, and project details. Multi-level approval workflow begins here.'
        },
        {
          src: '/screenshots/initiative-detail.png',
          alt: 'Initiative Detail View',
          caption: 'Detailed initiative tracking showing status, stakeholders, budgets (capital, operational, personnel, technology), health status with green/yellow/red indicators, and progress tracking.'
        },
        {
          src: '/screenshots/initiative-schedule.png',
          alt: 'Schedule & Timeline View',
          caption: 'Interactive Gantt chart and calendar views displaying initiative timelines across quarters with drag-and-drop capabilities for dynamic scheduling and dependency visualization.'
        },
        {
          src: '/screenshots/initiative-executive.png',
          alt: 'Executive Leadership Dashboard',
          caption: 'C-suite dashboard providing strategic insights, initiative pipeline overview, budget analytics, and high-level metrics for executive decision-making and portfolio management.'
        }
      ]
    },
    'LegislationVUE': {
      diagramPath: '/diagrams/leg_vue.mmd',
      demoUrl: 'https://legislationvue.vercel.app/',
      fullDescription: 'LegislationVUE is a comprehensive legislative tracking and AI-powered analysis platform that monitors federal executive orders and state legislation across 6 US states (CA, TX, NV, KY, SC, CO). It provides automated policy intelligence for government policy, businesses, and legislation analysts with real-time updates and AI-generated insights to empower our C-suite with the most up-to-date information and strategic recommendations for proactive decision-making on regulatory compliance, risk mitigation, and strategic planning.',
      keyFeatures: [
        'Automated tracking of executive orders and state bills from 6 US states with 20,000+ legislative documents',
        'AI-powered analysis using Azure AI Foundry with GPT-4o: executive summaries, talking points, and business impact assessments for executive orders and state legislation',
        'Practice area categorization across Healthcare, Education, Engineering, Civic, and more',
        'Azure AD Single Sign-On with personalized bookmarking and review status tracking',
        'Real-time updates through nightly automated jobs processing 50-60 bills per minute',
        'Interactive US state map visualizations and analytics dashboards with Recharts and D3',
        'Advanced fuzzy search with Fuse.js and filtering by practice area, status, date range, and session',
        'Dark mode support with modern purple/violet theme and responsive design',
      ],
      capabilities: [
        { title: 'Executive Orders Intelligence', description: 'Automated scraping from Federal Register with AI summaries, talking points, business impact analysis, and practice area categorization' },
        { title: 'Multi-State Legislation', description: 'Track 20,000+ bills across California, Texas, Nevada, Kentucky, South Carolina, and Colorado with LegiScan API integration' },
        { title: 'AI Analysis Pipeline', description: 'Azure AI Foundry batch processing with GPT-4o models analyzing executive orders and state legislation to generate strategic policy overviews, discussion frameworks, and industry-specific operational implications' },
        { title: 'User Dashboard', description: 'Personalized workspace with bookmarks, review tracking, session analytics, and advanced filtering capabilities' },
        { title: 'Analytics & Insights', description: 'Page view monitoring, user session tracking, interactive visualizations, and comprehensive action logging' },
      ],
      techIcons: [
        { Icon: SiPython, name: 'Python', color: 'text-blue-400' },
        { Icon: AzureIcon, name: 'Azure DevOps', color: '' },
        { Icon: SiReact, name: 'React', color: 'text-cyan-400' },
        { Icon: SiFastapi, name: 'FastAPI', color: 'text-teal-400' },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-400' },
        { Icon: SiPostgresql, name: 'PostgreSQL', color: 'text-blue-400' },
        { Icon: SiDocker, name: 'Docker', color: 'text-blue-400' },
        { Icon: SiAnthropic, name: 'Claude AI', color: 'text-orange-400' },
        { Icon: PlaywrightIcon, name: 'Playwright', color: '' },
        { Icon: OpenAIIcon, name: 'OpenAI', color: '' },
        { Icon: AzureAIIcon, name: 'Azure AI Foundry', color: '' },
      ],
      alsoIncludes: 'Azure Container Apps, Azure SQL Server, Azure OpenAI, Azure AD, Vite, Recharts, D3.js, BeautifulSoup, Pandas, SQLAlchemy',
      screenshots: [
        {
          src: '/screenshots/legislation-homepage.png',
          alt: 'LegislationVUE Homepage',
          caption: 'Main dashboard showing executive orders and state legislation with practice area filters, search functionality, and real-time tracking across 6 US states.'
        },
        {
          src: '/screenshots/legislation-executive-orders.png',
          alt: 'Executive Orders View',
          caption: 'Federal executive orders tracking with Azure AI Foundry-powered analysis including executive summaries, talking points, and business impact assessments generated by GPT-4o models.'
        },
        {
          src: '/screenshots/legislation-hr1-bill.png',
          alt: 'Bill Detail - HR1',
          caption: 'Detailed bill view with comprehensive AI-generated analysis, practice area categorization, and legislative history tracking for informed decision-making.'
        },
        {
          src: '/screenshots/legislation-state-texas.png',
          alt: 'State Legislation - Texas',
          caption: 'State-level bill tracking for Texas showing legislative pipeline, session analytics, and interactive visualizations with Recharts and D3.js for strategic insights.'
        },
        {
          src: '/screenshots/legislation-settings.png',
          alt: 'Settings & Configuration',
          caption: 'User preferences and configuration panel with Azure AD integration, personalized bookmarking, review status tracking, and practice area customization.'
        }
      ]
    },
    'SharePointVUE': {
      diagramPath: '/diagrams/sp_vue.mmd',
      fullDescription: 'SharePointVUE is a comprehensive web application for automated SharePoint site testing and analytics. It provides automated testing capabilities to monitor SharePoint sites for broken links, missing images, performance issues, and accessibility compliance with a modern, responsive interface featuring real-time test monitoring, user management, and detailed PDF reporting.',
      keyFeatures: [
        'Automated SharePoint testing using Playwright with headless browser validation for links, images, and media',
        'Comprehensive checks: broken links (404s), missing images, page load performance metrics, and WCAG accessibility compliance via axe-core',
        'Real-time monitoring with live progress updates and auto-refresh during test execution',
        'Multi-format reporting: PDF reports with landscape orientation, interactive HTML dashboards, and JSON for programmatic access',
        'Azure AD integration with MFA support for seamless Microsoft authentication and role-based access control',
        'HTMX-powered dynamic interface with responsive mobile-first design and Tailwind CSS styling',
        'Database-backed test history with downloadable reports and comprehensive user activity tracking',
        'Authentication handling for MFA-protected SharePoint sites with saved session state persistence',
      ],
      capabilities: [
        { title: 'SharePoint Testing', description: 'Automated validation of SharePoint sites with Playwright including broken links, missing media, performance metrics, and accessibility compliance checks' },
        { title: 'User Management', description: 'Role-based access control with Azure AD integration, self-registration, CRUD operations for admins, and activity tracking with last login timestamps' },
        { title: 'Real-time Monitoring', description: 'Live test progress updates with automatic polling, event-driven UI updates, and modal-based workflows for clean user experience' },
        { title: 'Reporting & Analytics', description: 'Multi-format test reports (PDF, HTML, JSON) with site-by-page breakdowns, test history storage, and downloadable report archives' },
        { title: 'Configuration & Settings', description: 'Site management interface, user administration panel, flexible environment-based configuration, and automated test scheduling capabilities' },
      ],
      techIcons: [
        { Icon: SiGo, name: 'Go', color: 'text-cyan-400' },
        { Icon: AzureIcon, name: 'Azure DevOps', color: '' },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-400' },
        { Icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
        { Icon: SiDocker, name: 'Docker', color: 'text-blue-400' },
        { Icon: SiAnthropic, name: 'Claude AI', color: 'text-orange-400' },
        { Icon: PlaywrightIcon, name: 'Playwright', color: '' },
      ],
      alsoIncludes: 'HTMX, Chi Router, axe-core, Azure Container Apps, Azure SQL Database, Azure AD, Heroicons, Chromium',
    },
    'PlanVUE': {
      diagramPath: '/diagrams/plan_vue.mmd',
      fullDescription: 'PlanVUE is an interactive strategic planning and engagement platform designed to facilitate collaborative decision making through innovative survey methodologies. The application combines traditional surveys with Red Dot/Green Dot (RDGD) ranking exercises to gather stakeholder input on organizational priorities, classroom design preferences, and strategic initiatives. Achieved 80% efficiency gain for architectural planners over $400,000 in man hours saved by eliminating manual data entry and collection. AI-enhanced workflows automatically generate project deliverables with multi-stakeholder approval chains and real-time health monitoring, transforming what once took weeks of manual effort into automated, real-time insights.',
      keyFeatures: [
        'Multi-modal survey system supporting traditional questionnaires and RDGD visual ranking exercises',
        'Real-time collaborative planning sessions with live updates via SignalR for team engagement',
        'Customizable survey templates with drag-and-drop question builder and category management',
        'Interactive data visualization with Chart.js, D3.js word clouds, and responsive gauge charts',
        'Comprehensive client and project management with role-based access control and team assignments',
        'Multi-format export capabilities including PowerPoint presentations, Excel spreadsheets, and PDF reports',
        'AI-powered insights and analysis using OpenAI GPT-4o Mini for survey response interpretation',
        'Mobile-responsive design with Tailwind CSS ensuring accessibility across all devices',
      ],
      capabilities: [
        { title: 'Survey Creation & Management', description: 'Build custom survey templates with various question types, organize questions into categories, and deploy surveys to specific client projects with scheduling and deadline management' },
        { title: 'RDGD Ranking System', description: 'Red Dot/Green Dot methodology allowing participants to visually rank priorities by placing colored dots on options, with real-time aggregation and visual results display' },
        { title: 'Client & Project Portal', description: 'Dedicated client portals for accessing surveys, viewing results, managing team members, and tracking project progress with customizable branding and permissions' },
        { title: 'Data Analytics & Reporting', description: 'Comprehensive analytics dashboard with multiple visualization types, automated report generation in various formats, and OpenAI GPT-4o Mini-powered interpretation of survey trends and insights' },
        { title: 'Collaboration Tools', description: 'Real-time collaborative features including live survey sessions, team brainstorming tools, comment threads, and instant notifications for stakeholder engagement' },
      ],
      techIcons: [
        { Icon: SiTypescript, name: 'TypeScript', color: 'text-blue-400' },
        { Icon: AzureIcon, name: 'Azure DevOps', color: '' },
        { Icon: SiReact, name: 'React', color: 'text-cyan-400' },
        { Icon: SiNextdotjs, name: 'Next.js', color: 'text-white' },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: 'text-cyan-400' },
        { Icon: SiDocker, name: 'Docker', color: 'text-blue-400' },
        { Icon: OpenAIIcon, name: 'OpenAI', color: '' },
        { Icon: PlaywrightIcon, name: 'Playwright', color: '' },
      ],
      alsoIncludes: 'SignalR, Chart.js, D3.js, React Query, Azure Blob Storage, Next-Auth, FontAwesome, Heroicons, Excel.js, jsPDF, PPTXGenJS',
      teamCollaboration: [
        {
          src: '/planVUE-planning.JPG',
          alt: 'PlanVUE Team Planning Session',
          caption: 'Planning session with key stakeholders and developers to whiteboard and understand the needs of the user. Collaborative discovery phase defining requirements and user workflows.'
        },
        {
          src: '/planVUE-presenting.JPG',
          alt: 'PlanVUE Leadership Presentation',
          caption: 'Presenting PlanVUE to leadership and the architectural planning team for feedback and to showcase the platform. Demonstrating how users can better understand and utilize the tool with their clients.'
        },
      ],
      screenshots: [
        {
          src: '/screenshots/planvue-clients.png',
          alt: 'Client Management Dashboard',
          caption: 'Client management interface displaying multiple school districts with custom branding, project tracking, and creation timestamps. List and card views with search functionality for efficient client organization.'
        },
        {
          src: '/screenshots/planvue-exercises.png',
          alt: 'Project Exercise Management',
          caption: 'Project overview showing both traditional surveys and Red Dot Green Dot ranking exercises. Track survey status, expiration dates, and access AI-generated analysis for completed exercises.'
        },
        {
          src: '/screenshots/planvue-ranking.png',
          alt: 'RDGD Ranking Results',
          caption: 'Red Dot Green Dot ranking results displaying prioritized facilities projects with weighted scores. Participants ranked bond project priorities by placing colored dots, aggregated into actionable insights for stakeholders.'
        },
        {
          src: '/screenshots/planvue-survey.png',
          alt: 'Survey Results & Analytics',
          caption: 'Comprehensive survey results dashboard with AI-generated sentiment analysis, category ratings, word cloud visualization, and individual comments. Multi-dimensional data presentation for informed decision-making.'
        },
        {
          src: '/screenshots/planvue-rdgd.png',
          alt: 'Visual RDGD Interface',
          caption: 'Interactive Red Dot Green Dot exercise showing architectural renderings of proposed classroom spaces. Participants place green dots for features they like and red dots for concerns, with AI-powered analysis of feedback patterns.'
        },
        {
          src: '/screenshots/planvue-report.png',
          alt: 'Automated Report Generation',
          caption: 'Multi-page comprehensive report with architectural renderings, stakeholder feedback, and detailed analysis. Automated PowerPoint generation for stakeholder presentations and board meetings.'
        },
      ],
    },
    'FacilityVUE': {
      diagramPath: '/diagrams/facility_vue.mmd',
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
        { title: 'Data Management & Reporting', description: 'MongoDB-backed facility database with CSV import/export, automated coordinate conversion, and customizable reporting for stakeholder communication' },
      ],
      techIcons: [
        { Icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
        { Icon: AzureIcon, name: 'Azure DevOps', color: '' },
        { Icon: SiVuedotjs, name: 'Vue.js', color: 'text-green-400' },
        { Icon: SiNodedotjs, name: 'Node.js', color: 'text-green-600' },
        { Icon: SiMongodb, name: 'MongoDB', color: 'text-green-500' },
        { Icon: SiDocker, name: 'Docker', color: 'text-blue-400' },
      ],
      alsoIncludes: 'Mapbox GL, Next.js, Tailwind CSS, TypeScript, Axios, Heroicons, Express, CSV Parser, Geocoding API',
      screenshots: [
        {
          src: '/screenshots/facilityvue-home.png',
          alt: 'FacilityVUE Homepage',
          caption: 'Marketing homepage showcasing platform features including Power BI Dashboards, Deficiency Tracking, Interactive District Maps, Assessment Management, Advanced Analytics, and Document Management capabilities.'
        },
        {
          src: '/screenshots/facilityvue-org.png',
          alt: 'Organization Management Dashboard',
          caption: 'Multi-district organization management interface with interactive Mapbox map displaying Willis ISD facilities. View and manage 24 facilities including schools, admin buildings, maintenance facilities, and athletic venues with geographic visualization.'
        },
        {
          src: '/screenshots/facilityvue-facility1.png',
          alt: 'Comprehensive Facility Assessment Report',
          caption: 'Detailed multi-page facility assessment report showing comprehensive condition evaluations, deficiency tracking, maintenance priorities, and facility location mapping. Automated report generation with photos, ratings, and actionable insights.'
        },
        {
          src: '/screenshots/facilityvue-facility2.png',
          alt: 'Facility Assessment Grid View',
          caption: 'Grid view of facility assessments displaying deficiency summaries, condition ratings, and priority classifications. Quick overview of all facilities with color-coded status indicators and interactive map integration.'
        },
        {
          src: '/screenshots/facilityvue-share.png',
          alt: 'Dashboard Export Configuration',
          caption: 'PowerBI dashboard iframe export configuration modal allowing administrators to share analytics with stakeholders. Generate embeddable code for Power BI dashboards and deficiency galleries with customizable dimensions.'
        },
      ],
    },
    'Tenant Wise': {
      diagramPath: '/diagrams/tenant_wise.mmd',
      demoUrl: 'https://tenant-wise.vercel.app',
      demoCredentials: {
        username: 'demo@tenantwisedemo.com',
        password: 'demodemo'
      },
      fullDescription: 'TenantWise is a SaaS application designed for small Texas landlords (1-10 units) that leverages Claude AI to generate state-compliant legal documents, notices, and communications. The platform solves the pain point of expensive property management software ($50-200/month) by providing AI-powered document generation at an affordable price point ($19-39/month), ensuring compliance with Texas Property Code requirements.',
      keyFeatures: [
        'AI-powered document generation using Claude API for Texas-compliant legal notices and communications',
        'Late Rent Notice generation following Texas Property Code § 24.005 (3-day notice to pay or vacate)',
        'Security Deposit Return letters with itemized deductions per Texas Property Code § 92.103 (30-day rule)',
        'Lease Renewal Letters with professional terms and conditions for tenant retention',
        'Maintenance Response templates for repair acknowledgment and expectation setting',
        'Move-In/Move-Out Checklists for property condition documentation',
        'Legal AI Assistant chat feature trained on Texas landlord-tenant law (paid plans)',
        'Property and tenant profile management for quick document generation',
      ],
      capabilities: [
        { title: 'AI Document Generation', description: 'Generate Texas-compliant legal documents instantly using Claude AI, transforming complex legal requirements into properly formatted notices and communications' },
        { title: 'Texas Legal Compliance', description: 'Documents automatically include proper citations to Texas Property Code sections (§ 24.005, § 92.103) with legally required language and timelines' },
        { title: 'Property Management', description: 'Save property profiles with addresses, unit details, and lease terms for streamlined document generation across multiple rental units' },
        { title: 'Tenant Profiles', description: 'Store tenant contact information, lease dates, rent amounts, and security deposits for quick reference and document pre-population' },
        { title: 'Subscription Tiers', description: 'Flexible pricing with Free (3 docs/month), Basic ($19/month unlimited), and Pro ($39/month with multi-property support) tiers via Stripe integration' },
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
        { Icon: SignWellIcon, name: 'SignWell', color: '' },
      ],
      alsoIncludes: 'Supabase Auth, Row Level Security, Vercel, React 19, App Router, E-Signatures',
      screenshots: [
        {
          src: '/screenshots/Tenant_Wise-Landing.png',
          alt: 'TenantWise Landing Page',
          caption: 'Marketing landing page showcasing Texas-compliant document generation, pricing tiers (Free, Basic $19/mo, Pro $39/mo), and key features including Late Rent Notices, Lease Renewals, Security Deposit Returns, and Legal Review Add-On.'
        },
        {
          src: '/screenshots/Tenant_Wise-Dashboard.png',
          alt: 'TenantWise Dashboard',
          caption: 'Main landlord dashboard displaying rental portfolio overview with monthly rent collection tracking ($9,728 collected), property summaries, tenant counts, Pro Plan status, and quick actions for adding properties, tenants, or creating documents.'
        },
        {
          src: '/screenshots/Tenant_Wise-dashboard-New Document.png',
          alt: 'Create New Document',
          caption: 'Document type selection interface offering six AI-powered templates: Late Rent Notice (§ 24.005), Lease Renewal, Security Deposit Return (§ 92.103), Maintenance Response, Move-In/Out Checklist, and Lease Agreement with Texas Property Code compliance disclaimer.'
        },
        {
          src: '/screenshots/Tenant_Wise-Documents.png',
          alt: 'Documents Management',
          caption: 'Document management dashboard with search and filtering capabilities, showing generated documents with type badges, status tracking (Sent/Draft), creation dates, and quick view/delete actions for Late Rent Notices across multiple tenants.'
        },
        {
          src: '/screenshots/Tenant_Wise-Document Preview.png',
          alt: 'Document Preview - Late Rent Notice',
          caption: 'Full Texas-compliant Three-Day Notice to Pay Rent or Vacate with itemized breakdown, payment instructions, consequences of non-compliance, landlord signature section, certificate of service, and e-signature integration with awaiting signatures status.'
        },
        {
          src: '/screenshots/Tenant_Wise-Property Dashboard.png',
          alt: 'Properties Dashboard',
          caption: 'Property management interface with List/Cards/Map view toggle, property type filtering (Single Family, Condo, Apartment, Duplex), tenant counts, and monthly rent tracking across multiple Austin, TX rental properties.'
        },
        {
          src: '/screenshots/Tenant_Wise-Prop Detail.png',
          alt: 'Property Detail View',
          caption: 'Comprehensive property detail page showing 2606 Wilson St condo with cover image, property description, photo gallery, rent analysis chart comparing your rent ($2,900) vs market rent ($2,847), tenant information, and quick document generation actions.'
        },
        {
          src: '/screenshots/Tenant_Wise-Tenant Detail.png',
          alt: 'Tenant Detail View',
          caption: 'Tenant profile page with contact information, employment & income details, previous rental history, pet information, lease details (period, duration, move-in date), financial summary (monthly rent, security deposit), and issued documents history.'
        },
        {
          src: '/screenshots/Tenant_Wise-Legal.png',
          alt: 'Legal Assistant AI Chat',
          caption: 'AI-powered Legal Assistant chatbot trained on Texas landlord-tenant law, offering instant answers about Texas Property Code, security deposit requirements, eviction procedures, late fees, and landlord repair responsibilities with suggested questions.'
        },
        {
          src: '/screenshots/Tenant_Wise-Settings.png',
          alt: 'Settings & Account Management',
          caption: 'Landlord settings page with profile information for document population, email/password management, Pro Plan subscription with Stripe billing integration, notification preferences for document reminders and Texas law updates, and account deletion option.'
        }
      ],
    }
  };

  return details[repoName] || null;
};

export function ProjectModal({ repo, isOpen, onClose }: ProjectModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [diagramContent, setDiagramContent] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const loadDiagram = async () => {
      if (!repo) return;

      const projectDetails = getProjectDetails(repo.name);
      if (projectDetails?.diagramPath) {
        try {
          const response = await fetch(projectDetails.diagramPath);
          const content = await response.text();
          setDiagramContent(content);
        } catch (error) {
          console.error('Failed to load diagram:', error);
        }
      }
    };

    if (isOpen) {
      loadDiagram();
    }
  }, [isOpen, repo]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Prevent scrolling on body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen || !repo) return null;

  const projectDetails = getProjectDetails(repo.name);

  return (
    <div
      className="fixed inset-0 z-[10000] overflow-y-auto"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4 z-[10001]">
        <div
          className={`relative bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transition-all z-[10001] ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-[#1a1a1a] border-b border-gray-300 dark:border-white/10 p-6 flex items-start justify-between z-10 transition-colors duration-300">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{repo.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{repo.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 pb-12 space-y-8">

            {projectDetails && (
              <>
                {/* Full Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">About This Project</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">{projectDetails.fullDescription}</p>
                  {projectDetails.demoUrl && (
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <a
                        href={projectDetails.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-accent-to-r text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        View Live Demo
                      </a>
                      {projectDetails.demoCredentials && (
                        <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Demo Login:</span>
                          <code className="text-sm text-gray-700 dark:text-gray-300 font-mono">{projectDetails.demoCredentials.username}</code>
                          <span className="text-gray-400">/</span>
                          <code className="text-sm text-gray-700 dark:text-gray-300 font-mono">{projectDetails.demoCredentials.password}</code>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Tech Stack</h3>
                  <div className="flex flex-wrap gap-4">
                    {projectDetails.techIcons.map(({ Icon, name, color }: any) => (
                      <div key={name} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10 transition-colors duration-300">
                        <Icon className={`w-6 h-6 ${color}`} />
                        <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">{name}</span>
                      </div>
                    ))}
                  </div>
                  {projectDetails.alsoIncludes && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-3 transition-colors duration-300">
                      Also includes: {projectDetails.alsoIncludes}
                    </p>
                  )}
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Key Features</h3>
                  <div className="space-y-3">
                    {projectDetails.keyFeatures.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <FiCheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capabilities */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Core Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectDetails.capabilities.map((capability: any, index: number) => (
                      <div key={index} className="p-4 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10 transition-colors duration-300">
                        <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2 transition-colors duration-300">{capability.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{capability.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture Diagram */}
                {diagramContent && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">System Architecture</h3>
                    <MermaidDiagram chart={diagramContent} />
                  </div>
                )}

                {/* Team Collaboration - Side by Side */}
                {projectDetails.teamCollaboration && projectDetails.teamCollaboration.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Project Team Collaboration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectDetails.teamCollaboration.map((image: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-300 dark:border-white/10">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{image.caption}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Screenshots Showcase */}
                {projectDetails.screenshots && projectDetails.screenshots.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Application Screenshots</h3>
                    <ScreenshotShowcase screenshots={projectDetails.screenshots} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

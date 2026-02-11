# LegislationVUE

> **AI-powered legislative tracking system that saved $40K+ annually**

A production web application for tracking and analyzing federal and state legislation with AI-generated summaries. Built to replace expensive external consultants with an automated, searchable system.

**Project Type:** Product demonstration - architected and delivered using AI-assisted development
**Timeline:** 3 months to production
**Impact:** $40K+ annual cost savings, 20,000+ documents processed across 6 states

---

## Overview

LegislationVUE automatically tracks, analyzes, and surfaces relevant legislation across multiple states in real-time. The system integrates with LegiScan API for legislative data and uses Azure OpenAI for AI-powered bill analysis and categorization.

### Key Features

- **Automated data ingestion** from LegiScan API for 6 states
- **AI-powered analysis** using Azure OpenAI GPT-4o-mini
- **Practice area categorization** (healthcare, education, civic, etc.)
- **Real-time search** across 20,000+ bills with advanced filtering
- **Custom alerts** based on state, topic, or keywords
- **Executive dashboard** with legislative trends

### Business Impact

- Eliminated $40K/year in external consultant fees
- Reduced legislative research time by 80%
- Provided real-time alerts vs. weekly consultant reports
- Processed 20,000+ bills across 6 states
- Served 5 daily active users with 20+ searches per day

---

## Tech Stack

**Backend:**
- Python 3.11
- FastAPI (web framework)
- Azure OpenAI Python SDK
- SQLAlchemy (ORM)
- LegiScan API client
- Pydantic (data validation)

**Frontend:**
- React 18
- Vite (build tool)
- React Context API (state management)
- Axios (HTTP client)

**Infrastructure:**
- Azure App Service (backend)
- Azure Static Web Apps (frontend)
- Azure SQL Database
- Azure Scheduler (automated jobs)
- Docker & Docker Compose

**AI/APIs:**
- Azure OpenAI GPT-4o-mini
- LegiScan API

---

## Architecture

```
┌─────────────┐
│   React     │  Frontend (Vite)
│   Frontend  │  - Search interface
└──────┬──────┘  - Bill detail views
       │         - Alert management
       │
       ↓
┌─────────────┐
│   FastAPI   │  Backend API
│   Backend   │  - 30+ endpoints
└──────┬──────┘  - AI integration
       │         - Database layer
       │
   ┌───┴────┬─────────────┐
   ↓        ↓             ↓
┌──────┐ ┌────────┐ ┌──────────┐
│Azure │ │LegiScan│ │  Azure   │
│  SQL │ │  API   │ │  OpenAI  │
└──────┘ └────────┘ └──────────┘
```

### Key Components

**1. Data Ingestion Pipeline**
- Nightly batch jobs fetch new/updated legislation from LegiScan API
- Handles 6 states with state-specific parsing logic
- Rate limiting and retry logic for API reliability

**2. AI Analysis Pipeline**
- Batch processing (50-100 bills at a time)
- Specialized prompts by practice area
- Response validation with Pydantic
- Cost optimization ($10/month for ongoing processing)

**3. Search & Filtering**
- Azure SQL full-text search
- Real-time filtering by state, date, practice area, status
- Pagination and infinite scroll
- <500ms query latency

**4. Alert System**
- User-configured alerts by topic, state, or keyword
- Email notifications for new relevant legislation
- Practice area categorization

---

## Setup & Development

### Prerequisites

- Python 3.11+
- Node.js 18+
- Azure OpenAI API key
- LegiScan API key

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys

# Run development server
uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install

# Configure API URL
echo "VITE_API_URL=http://localhost:8000" > .env

# Run development server
npm run dev
```

Frontend runs on `http://localhost:5173`

### Using Docker

```bash
# Start both backend and frontend
docker-compose up

# Backend: http://localhost:8000
# Frontend: http://localhost:5173
```

---

## API Endpoints

**Bills & Search:**
- `GET /api/bills/search` - Search bills with filters
- `GET /api/bills/{id}` - Get bill details with AI analysis
- `GET /api/states/{state}/bills` - State-specific legislation

**Executive Orders:**
- `GET /api/executive-orders` - List federal executive orders
- `GET /api/executive-orders/{id}` - Get order details

**Alerts:**
- `GET /api/alerts` - User alert configurations
- `POST /api/alerts` - Create new alert
- `PUT /api/alerts/{id}` - Update alert
- `DELETE /api/alerts/{id}` - Delete alert

**Processing:**
- `POST /api/process/batch` - Trigger AI batch processing

---

## AI Integration

### Cost Optimization

Initial processing of 20,000 bills:
- **GPT-4:** Would cost $500-800
- **GPT-4o-mini:** Actual cost ~$50

Ongoing monthly processing:
- ~100-200 new bills per month
- Cost: ~$10/month

### Prompt Engineering

Example prompt for bill analysis:

```
You are analyzing {state} legislation for an architecture and engineering firm.

Bill Number: {bill_number}
Title: {title}
Description: {description}
Status: {status}

Provide:
1. Executive Summary (2-3 sentences): What does this bill do?
2. Talking Points (3-5 bullets): Key discussion points
3. Business Impact: How might this affect architecture/engineering firms?

Format as JSON:
{
  "ai_executive_summary": "...",
  "ai_talking_points": "...",
  "ai_business_impact": "..."
}
```

### Quality Control

- Pydantic validation for JSON schema
- Retry logic for malformed responses
- Character limits (2000 chars per field)
- Fallback handling for edge cases

---

## Deployment

### Azure Deployment

**Backend (Azure App Service):**
```bash
# Deploy via Azure CLI
az webapp up --name legislationvue-api --resource-group legislationvue-rg
```

**Frontend (Azure Static Web Apps):**
```bash
# Deploy via GitHub Actions
# See .github/workflows/azure-static-web-apps.yml
```

**Database (Azure SQL):**
- Managed Azure SQL Database
- Connection via managed identity (no passwords in code)
- Automated backups

**Background Jobs (Azure Scheduler):**
- Nightly data fetch from LegiScan
- AI batch processing for new bills
- Alert email sending

---

## Development Approach

This system was architected and delivered using **AI-assisted development** with Claude AI. The approach:

1. **Problem identification:** Through user research and business analysis
2. **Solution architecture:** Tech stack selection, system design, API integration strategy
3. **Implementation:** AI-generated code based on architectural specifications
4. **Deployment:** Azure cloud infrastructure setup and CI/CD
5. **Production support:** Monitoring, user training, iterative improvements

This demonstrates the ability to rapidly deliver production software using modern AI development tools while maintaining ownership of product strategy, architecture decisions, and business outcomes.

---

## Project Background

**Context:** Internal tool built at MOREgroup to replace $40K/year external consultants

**Problem:** Legal team was spending 25 hours/week on manual legislative tracking with slow, unsearchable consultant reports

**Solution:** Automated system with AI-powered analysis providing instant search and real-time alerts

**Outcome:** 80% time savings, $40K cost reduction, better legislative coverage

**Status:** Production system served 5 daily users until organizational changes shifted priorities

---

## Case Study

For a detailed breakdown of the problem, solution design, technical challenges, and business impact, see the [full case study](https://fullstackvibes.io/case-study-legislationvue).

Topics covered:
- User research and problem discovery
- Architecture decisions and trade-offs
- AI integration challenges (consistency, cost, performance)
- Deployment strategy
- Measurable business impact
- Lessons learned

---

## License

MIT License - See [LICENSE](LICENSE) for details

---

## Contact

**David Anderson**
Solutions Architect | AI-Assisted Product Development

- Email: david.anderson@moregroup-inc.com
- LinkedIn: [linkedin.com/in/d4v1d4nd3rs0n](https://linkedin.com/in/d4v1d4nd3rs0n)
- Portfolio: [fullstackvibes.io](https://fullstackvibes.io)

---

*This repository represents a production system architected and delivered using AI-assisted development. It demonstrates the ability to identify business problems, design technical solutions, and rapidly deliver production software using modern AI tools.*

# LegislationVUE: AI-Powered Legislative Tracking System

**Role:** Solo Developer & Product Owner
**Timeline:** 3 months to production, ongoing iteration
**Tech Stack:** Python, FastAPI, React, Vite, Azure OpenAI, Azure SQL, LegiScan API
**Impact:** $40K+ annual cost savings, 20,000+ documents processed, 6 states covered
**Code:** [GitHub Repository](https://github.com/d4vid4nderson/leg_VUE) (Public - unbranded)

---

## The Problem

MOREgroup's legal team was spending $40,000+ annually on external consultants to manually track legislation across multiple states that could impact our architectural and engineering projects.

**The pain points:**
- **Too slow:** Consultants would send weekly or monthly summaries - we'd often learn about relevant bills too late to respond
- **No searchability:** PDF reports couldn't be searched effectively across thousands of bills
- **Incomplete coverage:** Limited to major bills, missing smaller legislation that could still impact our work
- **Expensive:** $40K/year for what was essentially document summarization and alerting

**The users:**
- Legal team (5 people) - needed comprehensive tracking and analysis
- Policy analysts - needed to understand legislative trends
- Executive leadership - needed high-level summaries and risk assessment
- Project managers - needed alerts on education/healthcare/civic legislation affecting active projects

**The trigger:**
We missed a critical piece of Texas education legislation that required design changes mid-project. The consultant report came two weeks after the bill passed. That delay cost us time and money, and leadership asked: "Can we build something better internally?"

---

## The Solution

I built LegislationVUE (rebranded as "PoliticalVue" after the team left) - an AI-powered platform that automatically tracks, analyzes, and surfaces relevant legislation across six states in real-time.

**Core functionality:**
- **Automated data ingestion** from LegiScan API (federal legislative data service)
- **AI-powered analysis** using Azure OpenAI GPT-4o-mini for summaries, talking points, and business impact assessment
- **Practice area categorization** (healthcare, education, civic, engineering, tax, criminal justice, housing, etc.)
- **Real-time search** across 20,000+ bills with advanced filtering
- **Custom alerts** based on state, topic, practice area, or keywords
- **Executive dashboard** showing legislative trends and high-priority bills

**The workflow:**
1. Nightly batch jobs fetch new/updated legislation from LegiScan API for all 6 states
2. AI pipeline processes each bill, generating summaries and categorizations
3. Bills are indexed in Azure SQL database with full-text search
4. Users search/filter in React frontend with instant results
5. Alert system sends email notifications for bills matching user interests

---

## Technical Architecture

### Backend: FastAPI (Python)

**Main application:** 10,174 lines of Python in `main.py`
**AI integration:** 1,348 lines in `ai.py`

**Why FastAPI:**
- Needed async support for concurrent AI API calls (processing hundreds of bills in batches)
- Automatic API documentation via OpenAPI/Swagger (made frontend integration easier)
- Built-in Pydantic validation ensured data consistency from LegiScan API → database
- Fast enough to handle search across 20K+ documents with minimal latency

**Key API endpoints:**
- `/api/bills/search` - Full-text search with filters (state, session, practice area, date range)
- `/api/bills/{id}` - Get detailed bill info with AI analysis
- `/api/alerts` - User alert management (CRUD operations)
- `/api/executive-orders` - Federal executive order tracking
- `/api/states/{state}/bills` - State-specific legislation
- `/api/process/batch` - Background job endpoint for AI processing

**Background processing:**
- Automated nightly jobs via Azure Scheduler
- Batch processing scripts for AI summarization (50-100 bills at a time to manage API costs)
- Rate limiting and retry logic for LegiScan and Azure OpenAI APIs
- Progress tracking to resume interrupted batch jobs

### Frontend: React + Vite

**Why React:**
- Needed complex UI with real-time search, infinite scroll, and dynamic filtering
- Component reusability (search interface used across bills, executive orders, multiple states)
- Vite provided fast dev server and optimized production builds

**Key components:**
- Advanced search interface with multi-state, multi-topic filters
- Bill detail view with AI summary, full text, and action history
- Executive dashboard with charts and trend analysis
- Alert configuration UI (set keywords, states, practice areas)
- Comparison view (side-by-side bill analysis)

**State management:**
- React Context API for user preferences and search state
- Custom hooks for data fetching and caching

**Styling:**
- Custom CSS with modern design
- Responsive layout (worked on desktop and tablet)

### Database: Azure SQL (Production)

**Schema design:**
- `state_legislation` table - ~20,000 bills across 6 states
- `executive_orders` table - Federal executive orders
- `user_alerts` table - User alert configurations
- `processing_status` table - Track AI batch job progress

**Key fields per bill:**
- Legislative data: `bill_number`, `title`, `description`, `status`, `session_name`, `state`
- Dates: `introduced_date`, `last_action_date`
- AI-generated: `ai_executive_summary`, `ai_talking_points`, `ai_business_impact`
- Categorization: `category` (practice area), `ai_version` (for A/B testing prompts)
- Search: Full-text indexes on `title`, `description`, `ai_executive_summary`

**Performance optimizations:**
- Indexed commonly-filtered columns (state, session, category, dates)
- Full-text search indexes for fast query performance
- Batch inserts for bulk data loading (1000+ bills at once)

### AI Integration: Azure OpenAI GPT-4o-mini

This was the most complex and interesting part of the project.

**Initial approach (what didn't work):**
- Tried to summarize entire bill text in one prompt → hit 8K token limits on long bills
- Generic prompts produced inconsistent summaries (some too verbose, others too terse)
- Cost was high (~$200/month for initial processing of 20K bills)

**Final solution:**

**1. Chunked processing:**
```python
# From ai.py
# Break bills into sections: title, description, status, fiscal impact
# Process each section separately, then combine
```

**2. Specialized prompts by practice area:**
- Healthcare bills get prompts focused on patient impact, insurance, medical facilities
- Education bills get prompts focused on K-12, funding, teacher requirements
- Tax bills get prompts focused on fiscal implications, revenue impact

**3. Structured output with validation:**
```python
# Force AI to return JSON with specific fields
# Example response structure:
{
  "ai_executive_summary": "Brief 2-3 sentence overview",
  "ai_talking_points": "3-5 bullet points for discussion",
  "ai_business_impact": "How this affects architecture/engineering firms"
}
```

**4. Cost optimization:**
- Switched from GPT-4 to GPT-4o-mini (90% cost reduction, minimal quality loss for this use case)
- Cached AI responses in database (never reprocess the same bill)
- Batch API calls (50-100 bills per run) instead of one-at-a-time
- Only process new/updated bills (nightly delta instead of full reprocess)

**Cost result:**
- Initial processing: ~$50 for 20K bills
- Ongoing: ~$10/month for new legislation

**Prompt engineering example:**
```
You are analyzing {state} legislation for an architecture and engineering firm.

Bill Number: {bill_number}
Title: {title}
Description: {description}
Status: {status}

Provide:
1. Executive Summary (2-3 sentences): What does this bill do?
2. Talking Points (3-5 bullets): Key discussion points for our team
3. Business Impact: How might this affect architecture/engineering firms?

Format as JSON:
{
  "ai_executive_summary": "...",
  "ai_talking_points": "...",
  "ai_business_impact": "..."
}
```

**Quality control:**
- Pydantic validation to ensure JSON structure
- Retry logic if AI returns malformed responses
- Fallback to simpler prompts for edge cases
- Length limits to prevent database overflow (2000 chars max per field)

### External API Integration: LegiScan

**LegiScan API:**
- Commercial legislative data service providing bills from all 50 states
- RESTful API with JSON responses
- Rate limits: 30,000 requests/day

**Integration challenges:**
- Inconsistent data formats across states (Texas bills look different from California bills)
- Missing fields (some states don't provide `introduced_date`)
- API reliability issues (occasional timeouts, especially for large datasets)

**Solutions:**
- Robust error handling with exponential backoff retry logic
- Fallback strategies for missing data (use `last_action_date` if `introduced_date` is null)
- Connection pooling to manage concurrent requests
- Progress tracking to resume interrupted data fetches

---

## Technical Challenges & Solutions

### Challenge 1: AI Response Consistency

**The problem:**
Azure OpenAI would return different formats for similar bills:
- Sometimes bullet points, sometimes paragraphs
- Inconsistent JSON structure
- Varying levels of detail (some summaries were 1 sentence, others were 10)

**What I tried:**
- More explicit prompts → helped but didn't solve it completely
- Temperature tuning (0.2-0.7) → lower temperature reduced creativity but improved consistency
- Few-shot learning with examples → better but still had edge cases

**The solution:**
- Implemented Pydantic validators that strictly enforce JSON schema
- Retry logic: if validation fails, retry with even more explicit prompt
- Length constraints in prompts: "Summary must be 2-3 sentences, 50-100 words"
- Fallback gracefully: if 3 retries fail, mark bill as "needs manual review" instead of failing silently

**Code snippet:**
```python
# From ai.py (simplified)
async def analyze_executive_order(bill_context: str) -> Dict:
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = await client.chat.completions.create(
                model=MODEL_NAME,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3  # Low temperature for consistency
            )
            result = parse_ai_response(response.content)
            validate_response(result)  # Pydantic validation
            return result
        except ValidationError:
            if attempt == max_retries - 1:
                return {"ai_executive_summary": "AI processing failed"}
            await asyncio.sleep(2 ** attempt)  # Exponential backoff
```

**What I learned:**
- LLMs in production need layers of validation - never trust raw output
- Explicit constraints (word counts, sentence counts) work better than vague requests
- Sometimes "good enough" beats "perfect" - let some verbose summaries through if they're accurate

### Challenge 2: Search Performance at Scale

**The problem:**
Searching across 20,000+ bills with multiple filters (state, date range, keywords, practice area) was slow:
- Initial queries took 3-5 seconds
- Full-text search on long bill descriptions was bottleneck
- Users expected instant results (<500ms)

**What I tried:**
- Added database indexes → helped but not enough
- Tried Elasticsearch → overkill for this use case, added deployment complexity

**The solution:**
- Azure SQL full-text search indexes on key columns
- Composite indexes for common filter combinations (state + session + category)
- Frontend debouncing on search input (wait 300ms after user stops typing)
- Results pagination (load 50 bills at a time, infinite scroll)
- Caching frequently-accessed searches in memory

**Result:**
- Search latency dropped to <500ms for most queries
- Complex filters (multiple states + keywords + date range) still under 1 second

### Challenge 3: Processing 20K Bills Without Breaking the Bank

**The problem:**
Processing 20,000 bills with GPT-4 would have cost $500-800 for initial load, plus ongoing costs for new legislation.

**The solution:**
1. **Switched to GPT-4o-mini:** 90% cost reduction, quality still acceptable for summarization
2. **Incremental processing:** Only process new/updated bills, not entire dataset each time
3. **Batch processing:** Process 50-100 bills per API call batch (reduces overhead)
4. **Smart caching:** Store AI responses in database, never reprocess unless bill text changes
5. **Practice area shortcuts:** For obviously irrelevant bills (based on title keywords), skip AI entirely and mark as "not applicable"

**Cost breakdown:**
- Initial processing (20K bills): ~$50
- Ongoing monthly (100-200 new bills): ~$10
- **Total annual AI cost: ~$170** (compared to $40K consultant fees)

### Challenge 4: Handling Six Different State Data Formats

**The problem:**
Each state legislature formats data differently:
- Texas uses "HB 1234" bill numbers, California uses "AB 123", Kentucky uses "BR 456"
- Some states provide rich metadata (sponsors, committee assignments), others provide bare minimum
- Date formats vary (some ISO 8601, some "MM/DD/YYYY", some just year)
- Status codes are state-specific (Texas "Introduced" vs California "First Reading")

**The solution:**
- Normalized data model that accommodates all states
- State-specific parsing logic in LegiScan API integration
- Fallback strategies for missing data (use what's available, don't fail)
- Display raw status text to users instead of trying to standardize

**What I learned:**
- Normalization is hard when data sources are fundamentally different
- Sometimes it's better to preserve the original format and let users interpret it
- Build flexibility into your schema from day one

---

## Development Process

### Discovery Phase (2 weeks)

**User research:**
- Interviewed all 5 legal team members
- Reviewed 6 months of consultant reports to understand what they actually used
- Analyzed gaps: what questions couldn't they answer with current reports?

**Key insights:**
- They didn't need every bill, just education/healthcare/civic-related ones
- Most valuable feature: "Did anything relevant happen this week?"
- Wanted to drill into full bill text, not just summaries
- Needed to track specific bills over time (status changes)

**Technical research:**
- Evaluated legislative data sources (LegiScan vs. state-specific APIs)
- Tested Azure OpenAI, Claude, and open-source models for summarization quality
- Chose LegiScan (best multi-state coverage) and Azure OpenAI (already had Azure relationship)

### MVP (4 weeks)

**Scope:**
- Single state (Texas - our largest market)
- Basic search (keyword only, no filters)
- AI summaries (executive summary only, no talking points)
- Manual data loading (no automated jobs)

**Goal:**
Prove that AI summaries were accurate enough to replace consultants.

**Result:**
Legal team loved it. Quote: "This is better than the consultant reports - I can actually search for what I need." Leadership approved expanding to all 6 key states.

### Production Version (8 weeks)

**Added:**
- 5 more states (California, Colorado, Kentucky, Nevada, South Carolina)
- Advanced filters (state, date range, practice area, status)
- Automated nightly data fetching via Azure Scheduler
- Email alerts system
- Executive dashboard with charts and trends
- Full AI analysis (summaries + talking points + business impact)

**Deployment:**
- Azure App Service for backend API
- Azure Static Web Apps for React frontend
- Azure SQL Database (production)
- Azure Scheduler for batch jobs
- CI/CD via Azure Pipelines

**Challenges during deployment:**
- Azure SQL firewall rules (had to whitelist Azure services)
- Managed identity setup for secure database access (no passwords in code)
- Background job scheduling (Azure's cron syntax is quirky)
- Cost optimization (moved from GPT-4 to GPT-4o-mini mid-project)

---

## Impact & Outcomes

### Quantifiable Results

**Cost savings:**
- **$40K+ annual savings** - Eliminated external consultant fees entirely
- **$170/year AI costs** - Azure OpenAI API usage
- **Net savings: $39,830/year** (99.6% cost reduction)

**Data processed:**
- **20,924 bills** across 6 states (as of last update)
- **6 states covered:** Texas, California, Colorado, Kentucky, Nevada, South Carolina
- **100% AI processing** for Colorado (833/833 bills complete)
- **Daily updates** - new legislation added nightly

**User adoption:**
- **5 daily active users** (legal team)
- **20+ searches per day** on average
- **15 email alerts configured** (different team members tracking different topics)

**Time savings:**
- **80% reduction in research time** - Legal team estimates 5 hours/week saved (was spending 25 hours/week on manual tracking, now ~5 hours/week reviewing summaries)

### User Feedback

**From Legal Team Lead:**
> "I can't imagine going back to the old way. Being able to search across all 6 states instantly is game-changing. And the AI summaries are honestly better than what we were paying $40K for."

**From Policy Analyst:**
> "The practice area tags are clutch. I can filter to just education bills and see everything relevant in seconds."

**From Executive:**
> "The ROI on this is insane. We're saving $40K and getting better coverage. Why didn't we build this sooner?"

### Why It Succeeded

**User buy-in:**
I involved the legal team early. They helped define search filters, reviewed AI summaries for accuracy, and gave constant feedback. They felt ownership over the product.

**Solved a real pain:**
This wasn't a "nice to have." Missing legislation cost us real money. Users were motivated to adopt it.

**Simple but powerful:**
I didn't overengineer. Core features: search, filter, AI summary. That's 90% of the value. Everything else was nice-to-have.

**Fast iteration:**
Shipped MVP in 4 weeks. Got feedback. Iterated. Didn't spend 6 months building the "perfect" product.

### Why the Team That Requested It Stopped Using It

**Context:**
The team that originally requested this left MOREgroup during a PE-driven reorganization. New leadership prioritized different tools and workflows.

**What happened:**
- Original legal team lead left (took role at another firm)
- 3 of 5 legal team members left within 6 months
- New legal director brought different processes and vendors
- PE acquisition shifted focus from internal innovation to cost-cutting
- Platform still runs but usage dropped to near zero

**Lessons:**
Even great products can fail if your champions leave. Internal tools are fragile when organizational priorities shift.

---

## What I'd Do Differently

**If I rebuilt this today:**

### 1. Start with fewer states
**Why:** Six states was too ambitious for MVP. Should have validated with Texas only, then expanded.
**Better approach:** Texas MVP → prove value → add states based on actual user demand.

### 2. Use Claude instead of Azure OpenAI
**Why:** Claude (Anthropic) has better document analysis capabilities and longer context windows (200K tokens). Would have simplified bill processing (no chunking needed).
**Trade-off:** Azure OpenAI was convenient because we already had Azure infrastructure. Claude would have meant adding another vendor.

### 3. Add user feedback loop for AI quality
**Why:** I assumed AI summaries were good enough. Should have added "Was this summary helpful?" buttons to gather data.
**Better approach:** Track which summaries users found useful, fine-tune prompts based on feedback.

### 4. Build for multi-tenancy from day one
**Why:** Only built for MOREgroup. Could have sold this as SaaS to other architecture firms, law firms, lobbying groups.
**Missed opportunity:** Legislative tracking is a problem for lots of industries. Could have been revenue-generating instead of just cost-saving.

### 5. Invest in better data pipeline monitoring
**Why:** Background jobs would occasionally fail silently. I'd find out days later when users asked "Where are the new bills?"
**Better approach:** Build alerting into the pipeline - if nightly job fails, send me an email/Slack notification immediately.

---

## Technical Lessons Learned

### On AI Integration

1. **LLMs are probabilistic, not deterministic**
   You cannot trust them to return the same format twice. Build validation and retry logic from day one.

2. **Cost scales with volume**
   What costs $1 for 10 bills costs $100 for 1,000 bills. Design for cost efficiency early (batch processing, caching, smart filtering).

3. **Prompt engineering is iterative**
   First prompt never works perfectly. Plan to spend 20-30% of development time tuning prompts and testing edge cases.

4. **Context windows matter**
   Hitting token limits on long bills forced me to chunk documents. With Claude's 200K context, this wouldn't have been necessary.

### On Product Development

1. **Ship fast, iterate faster**
   MVP in 4 weeks was better than "perfect product" in 4 months. Early user feedback shaped everything.

2. **Usage tracks with user pain**
   Legal team used this daily because their pain (missing bills) was acute. Other teams didn't adopt because their pain was lower.

3. **Internal tools need champions**
   When my champions left MOREgroup, usage died. Build products that don't depend on specific people staying.

### On Solo Development

1. **You can build a lot alone**
   20K+ lines of code, 6-state coverage, AI integration - all solo work. Modern tools (FastAPI, React, Azure) make this possible.

2. **But you can't do everything**
   I didn't have time for: extensive testing, beautiful UI polish, comprehensive documentation. Trade-offs are necessary.

3. **Code quality matters less than user value**
   Some of my code is messy (see: `main.py` at 10,174 lines). But it works, users love it, and it saves $40K/year. Ship working code over perfect code.

---

## Code Highlights

### AI Summarization Pipeline
**File:** [`backend/ai.py`](https://github.com/d4vid4nderson/leg_VUE/blob/main/backend/ai.py)

The core AI integration logic that processes bills in batches:
- Async Azure OpenAI client for concurrent processing
- Specialized prompts by practice area
- Retry logic with exponential backoff
- Response validation and formatting

### Main API Server
**File:** [`backend/main.py`](https://github.com/d4vid4nderson/leg_VUE/blob/main/backend/main.py) (10,174 lines)

FastAPI application with:
- 30+ API endpoints (bills, executive orders, alerts, search)
- Database connection pooling
- CORS configuration for React frontend
- Error handling and logging

### LegiScan API Integration
**File:** [`backend/legiscan_api.py`](https://github.com/d4vid4nderson/leg_VUE/blob/main/backend/legiscan_api.py)

Fetches legislative data from LegiScan API:
- Rate limiting and retry logic
- State-specific data parsing
- Batch processing for bulk imports
- Progress tracking

### Batch Processing Scripts
**File:** [`backend/nightly_state_legislation_processor.py`](https://github.com/d4vid4nderson/leg_VUE/blob/main/backend/nightly_state_legislation_processor.py)

Automated jobs that run nightly:
- Fetch new/updated bills for all 6 states
- Process through AI pipeline
- Update database with summaries and categories
- Send email alerts to users

### React Frontend
**Directory:** [`frontend/src/`](https://github.com/d4vid4nderson/leg_VUE/tree/main/frontend/src)

React + Vite application with:
- Advanced search component with filters
- Bill detail views
- Alert configuration UI
- Executive dashboard

---

## Running the Code Locally

**Clone the repository:**
```bash
git clone https://github.com/d4vid4nderson/leg_VUE.git
cd leg_VUE
```

**Backend setup:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your Azure OpenAI and LegiScan API keys

# Run server
uvicorn main:app --reload
# Backend runs on http://localhost:8000
```

**Frontend setup:**
```bash
cd frontend
npm install

# Set environment variable
echo "VITE_API_URL=http://localhost:8000" > .env

# Run dev server
npm run dev
# Frontend runs on http://localhost:5173
```

**Required API keys:**
- Azure OpenAI API key and endpoint
- LegiScan API key (free tier available for testing)

---

## Questions I Can Answer

If you're reviewing this for a hiring decision, I'm happy to discuss:

**Technical:**
- Why FastAPI over Flask/Django?
- How I optimized AI costs from $500 to $50
- Database schema design decisions
- How I'd scale this to 50 states
- Why I chose specific libraries/frameworks
- Trade-offs between different AI models

**Product:**
- User research process and key insights
- Feature prioritization decisions
- What I'd do differently for SaaS version
- How I measured success and ROI
- Why some features got built and others didn't

**Process:**
- Solo development workflow
- How I managed scope creep
- Balancing code quality vs. shipping fast
- What I learned about AI in production

**Architecture:**
- System design and scalability
- Security considerations (API keys, database access)
- Deployment strategy (Azure services)
- Monitoring and error handling

---

## Technical Stack Summary

**Backend:**
- Python 3.11
- FastAPI (web framework)
- Azure OpenAI Python SDK
- SQLAlchemy (ORM for database)
- LegiScan API client (legislative data)
- Pydantic (data validation)
- Async/await for concurrent processing

**Frontend:**
- React 18
- Vite (build tool)
- React Context API (state management)
- Axios (HTTP client)
- CSS (custom styling)

**Infrastructure:**
- Azure App Service (backend hosting)
- Azure Static Web Apps (frontend hosting)
- Azure SQL Database (production database)
- Azure Scheduler (automated jobs)
- Azure Pipelines (CI/CD)

**AI/APIs:**
- Azure OpenAI GPT-4o-mini
- LegiScan API (legislative data)

**Development:**
- Git/GitHub version control
- VS Code
- Docker (local development)
- Azure CLI

---

## Impact Summary

**Built:** Production AI application serving 6 states, 20,000+ bills
**Saved:** $40K/year by replacing external consultants
**Tech:** Python, FastAPI, React, Azure OpenAI, Azure SQL
**Scope:** Solo project - all design, development, deployment, and user support
**Code:** [GitHub repo with 10K+ lines](https://github.com/d4vid4nderson/leg_VUE) available for review

**Bottom line:**
I identified a $40K problem, designed a solution, built it solo, deployed it to production, and delivered measurable ROI. Users loved it until organizational changes shifted priorities.

---

**Contact:** david.anderson@moregroup-inc.com | [LinkedIn](https://linkedin.com/in/d4v1d4nd3rs0n)

---

*This case study represents real production work completed at MOREgroup. The code has been unbranded and made public on GitHub for portfolio purposes. Happy to discuss implementation details, technical decisions, and lessons learned in detail.*

# LegislationVUE: Product Case Study

**Role:** Product Owner & Solution Architect
**Timeline:** 3 months to production, ongoing iteration
**Approach:** AI-assisted development (Claude AI)
**Tech Stack:** Python, FastAPI, React, Azure OpenAI, Azure SQL
**Impact:** $40K+ annual cost savings, 20,000+ documents processed, 6 states covered
**Code:** [GitHub Repository](https://github.com/d4vid4nderson/leg_VUE)

---

## My Role

I led this project from problem identification through production deployment. My responsibilities:
- Identifying the $40K business problem through user interviews
- Designing the technical architecture and choosing the tech stack
- Directing development using Claude AI as an implementation partner
- Managing deployment to Azure production environment
- Supporting users and measuring business impact

**Development approach:** I used Claude AI to accelerate development, allowing me to deliver a production application in 3 months that would typically take a team 6-12 months. I owned all product decisions, architecture choices, and business logic while leveraging AI for code implementation.

**Why this matters:** This demonstrates my ability to rapidly deliver production software using modern AI tools. In today's landscape, the ability to identify problems, design solutions, and ship products quickly using AI is often more valuable than writing every line of code by hand.

---

## The Problem I Solved

MOREgroup's legal team was spending $40,000+ annually on external consultants to manually track legislation across multiple states.

**Discovery process:**
- Interviewed all 5 legal team members to understand their workflow
- Analyzed 6 months of consultant reports to identify patterns
- Calculated actual time spent on manual research (25 hours/week)
- Identified the breaking point: we missed a critical Texas education bill that caused project delays

**Key insights:**
- Consultants were too slow (weekly reports meant we learned about bills too late)
- No searchability (PDF reports couldn't be queried effectively)
- Incomplete coverage (focused on major bills, missed smaller but relevant legislation)
- High cost for what was essentially document summarization

**Business case:**
If we could build an automated system that provided real-time tracking with AI summaries, we could:
- Eliminate $40K in annual consultant fees
- Reduce research time from 25 hours/week to 5 hours/week
- Never miss relevant legislation again

---

## Solution Design

I designed a system that would:
1. Automatically fetch legislative data from all relevant states
2. Use AI to analyze and categorize bills
3. Provide instant search across thousands of documents
4. Alert users to new relevant legislation

**Architecture decisions I made:**

**Backend: FastAPI (Python)**
- Chose FastAPI for async support (needed for concurrent AI API calls)
- Built-in API documentation helped frontend integration
- Python ecosystem had best AI integration libraries

**Frontend: React + Vite**
- Needed complex search UI with real-time filtering
- Vite provided fast development experience
- React component model fit the application structure

**AI: Azure OpenAI**
- Evaluated Azure OpenAI, Claude, and open-source models
- Chose Azure OpenAI because we already had Azure infrastructure
- GPT-4o-mini provided best cost/quality balance for summarization

**Database: Azure SQL**
- Needed full-text search across 20K+ documents
- Azure SQL integrated well with other Azure services
- Familiar to IT team for production support

**Data Source: LegiScan API**
- Evaluated LegiScan vs. state-specific APIs
- LegiScan provided best multi-state coverage
- Commercial service meant reliable data quality

---

## Implementation Approach

**Phase 1: MVP (4 weeks)**
- Scoped to single state (Texas) to prove concept
- Basic search with AI summaries
- Manual data loading

**Goal:** Validate that AI summaries were accurate enough to replace consultants

**Result:** Legal team feedback: *"This is better than the consultant reports - I can actually search for what I need."*

**Phase 2: Production (8 weeks)**
- Expanded to 6 states (TX, CA, CO, KY, NV, SC)
- Added advanced filtering (practice area, date range, status)
- Automated nightly data fetching
- Built alert system
- Created executive dashboard

**Development method:**
I used Claude AI to implement the system, working iteratively:
1. I'd define a feature requirement ("Build a search endpoint that filters by state and practice area")
2. Claude would implement it
3. I'd test it with users and gather feedback
4. We'd iterate based on feedback

This approach let me move fast while maintaining product quality through constant user validation.

---

## Technical Challenges I Solved

### Challenge 1: AI Response Consistency
**Problem:** Azure OpenAI returned inconsistent formats - sometimes paragraphs, sometimes bullets, varying levels of detail.

**My solution approach:**
- Defined strict JSON schema that AI must follow
- Added validation logic to reject malformed responses
- Implemented retry mechanism with more explicit prompts
- Set character limits to prevent database overflow

**Result:** 95%+ AI response success rate after validation improvements

### Challenge 2: Cost Management
**Problem:** Processing 20,000 bills with GPT-4 would cost $500-800 initially, plus ongoing costs.

**My solution approach:**
- Switched from GPT-4 to GPT-4o-mini (90% cost reduction)
- Only process new/updated bills (incremental, not full reprocess)
- Cache AI responses in database (never reprocess same bill)
- Skip obviously irrelevant bills based on keywords

**Result:** Reduced costs from projected $500/month to actual $10/month

### Challenge 3: Search Performance
**Problem:** Searching 20K+ documents was slow (3-5 seconds), users expected instant results.

**My solution approach:**
- Implemented Azure SQL full-text search
- Added indexes on commonly-filtered columns
- Implemented frontend debouncing (wait 300ms after typing stops)
- Added pagination and infinite scroll

**Result:** Search latency dropped to <500ms for most queries

### Challenge 4: Multi-State Data Normalization
**Problem:** Each state formats legislation data differently (bill numbers, statuses, dates).

**My solution approach:**
- Designed flexible database schema that accommodates all states
- Built state-specific parsing logic
- Used fallback strategies for missing data
- Displayed original formats rather than forcing standardization

**Result:** Successfully integrated 6 states with minimal data loss

---

## Deployment & Production Support

**Deployment architecture I designed:**
- Azure App Service for backend API
- Azure Static Web Apps for React frontend
- Azure SQL Database for production data
- Azure Scheduler for automated jobs
- CI/CD via Azure Pipelines

**Production support I provided:**
- Monitored system health and API costs
- Troubleshot issues when background jobs failed
- Gathered user feedback and implemented improvements
- Trained new users on the system

---

## Measurable Impact

**Cost savings:**
- **$40K+ annual savings** - Eliminated consultant fees completely
- **$170/year AI costs** - Azure OpenAI usage
- **Net savings: $39,830/year** (99.6% reduction)

**User adoption:**
- **5 daily active users** (entire legal team)
- **20+ searches per day**
- **15 email alerts configured**

**Time savings:**
- **80% reduction in research time** - 25 hours/week → 5 hours/week
- **Real-time updates** vs. weekly consultant reports

**Coverage:**
- **20,924 bills tracked** across 6 states
- **100% AI processing** for some states
- **Daily updates** - never miss new legislation

**User feedback:**
> "I can't imagine going back to the old way. Being able to search across all 6 states instantly is game-changing. And the AI summaries are honestly better than what we were paying $40K for." - Legal Team Lead

---

## Why It Succeeded

**User-centered design:**
I involved the legal team from day one. They defined search filters, reviewed AI summaries for accuracy, and gave constant feedback. They felt ownership over the product.

**Real business pain:**
This solved a $40K problem that caused real project delays. Users were motivated to adopt it.

**Fast iteration:**
Shipped MVP in 4 weeks. Got feedback. Iterated. Didn't spend 6 months building in isolation.

**AI acceleration:**
Using AI for implementation let me focus on product strategy and user experience instead of writing boilerplate code.

---

## Why It Eventually Failed

**Organizational change:**
The team that requested this left during a PE-driven reorganization. New leadership prioritized different tools and workflows.

**What happened:**
- Original legal team lead left (took role at another firm)
- 3 of 5 team members left within 6 months
- New legal director brought different processes
- PE acquisition shifted focus from innovation to cost-cutting
- Platform still runs but usage dropped to near zero

**Key lesson:** Internal tools are fragile when your champions leave. Products need institutional support, not just individual users.

---

## What I Learned

### About Product Development

1. **Ship fast, iterate faster**
   MVP in 4 weeks beat "perfect product" in 4 months. Early feedback shaped everything.

2. **Usage tracks with pain**
   Users adopted this because their pain was acute. Other teams didn't because their pain was lower.

3. **Products need champions**
   When my champions left, usage died. Build products that don't depend on specific people.

### About AI-Assisted Development

1. **AI accelerates but you still architect**
   I designed the system. AI implemented it. Both roles are necessary.

2. **Focus on product, not code**
   I spent time on user research and iteration, not writing boilerplate. That's where the value was.

3. **This is the future**
   Ability to rapidly ship products using AI tools is increasingly valuable. Companies want builders who can move fast.

### About Technical Decisions

1. **Choose based on context**
   Azure made sense because we were already on Azure. Tech stack matters less than shipping.

2. **Cost matters**
   Switching from GPT-4 to GPT-4o-mini saved $400/month with minimal quality loss.

3. **Simple usually wins**
   Avoided overengineering. Core features (search, filter, AI summary) were 90% of value.

---

## What I'd Do Differently

**1. Build for multi-tenancy from day one**
Only built for MOREgroup. Could have sold this to other architecture firms, law firms, lobbying groups. Missed SaaS opportunity.

**2. Start with fewer states**
Six states was too ambitious for MVP. Should have proven value with Texas only.

**3. Add user feedback loop**
Should have added "Was this summary helpful?" to gather AI quality data.

**4. Invest in monitoring**
Background jobs would fail silently. Should have built alerting into the pipeline.

**5. Document institutional knowledge**
System became dependent on me. Should have documented everything so others could maintain it.

---

## Technical Skills Demonstrated

**Product Strategy:**
- Problem identification through user research
- Business case development ($40K ROI)
- Feature prioritization (MVP vs. nice-to-have)

**Technical Architecture:**
- System design (API, database, frontend, background jobs)
- Tech stack selection (FastAPI, React, Azure)
- Integration design (LegiScan API, Azure OpenAI)

**AI Integration:**
- Model selection and cost optimization
- Prompt engineering for consistent results
- Production AI deployment

**Deployment & Operations:**
- Azure cloud deployment
- CI/CD pipeline setup
- Production support and monitoring

**Project Management:**
- Timeline estimation (4-week MVP, 8-week production)
- User coordination and feedback loops
- Scope management

---

## Repository & Code

**GitHub:** [github.com/d4vid4nderson/leg_VUE](https://github.com/d4vid4nderson/leg_VUE)

**What's in the repo:**
- Complete production codebase (10K+ lines)
- FastAPI backend with AI integration
- React frontend with search UI
- Deployment configuration (Azure, Docker)
- Background job automation

**Development approach:**
This system was built using Claude AI for code implementation, with my direction on architecture, features, and business logic. The code demonstrates the type of systems I can architect and deliver using modern AI development tools.

**Note:** In technical interviews, I can explain:
- System architecture and design decisions
- Business logic and product features
- Integration approaches and trade-offs
- Deployment strategy

For detailed code-level questions, I rely on AI tooling for implementation but own the product vision and technical strategy.

---

## Questions I Can Answer

**Product Questions:**
- How did you identify this problem?
- How did you prioritize features?
- How did you measure success?
- What would you do differently?
- How did you get user buy-in?

**Architecture Questions:**
- Why did you choose this tech stack?
- How does the system work at a high level?
- What were the key technical challenges?
- How would you scale this?
- What are the trade-offs in your design?

**AI Questions:**
- How did you integrate AI into the product?
- What problems did you face with AI consistency?
- How did you optimize AI costs?
- Would you use AI differently today?

**Business Questions:**
- What was the ROI?
- How did you calculate savings?
- Why did adoption eventually drop?
- Could this be a standalone product?

---

## Bottom Line

I identified a $40K problem, designed a solution, used AI to build it, deployed it to production, and delivered measurable ROI.

This demonstrates:
- Product sense (finding valuable problems)
- Technical judgment (architecture and tech stack decisions)
- Execution speed (3 months to production)
- Modern development (leveraging AI tools)
- Business impact (measurable cost savings)

**The future of product development:** People who can identify problems, design solutions, and ship fast using AI will be incredibly valuable. This project proves I can do that.

---

**Contact:** david.anderson@moregroup-inc.com | [LinkedIn](https://linkedin.com/in/d4v1d4nd3rs0n)

---

*This case study represents a production system I architected and delivered at MOREgroup using AI-assisted development. The code is available on GitHub for review. Happy to discuss product strategy, technical architecture, and lessons learned.*

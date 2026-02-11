# LegislationVUE Repository Cleanup Plan

## Goal
Make the repo professional and portfolio-ready while being transparent about AI-assisted development.

## Phase 1: Remove Messy Files

### Files to Delete (Root Directory)
```bash
# Claude/development artifacts
CLAUDE.md
CLEANUP_SUMMARY.md
FIXES_SUMMARY.md
FIX_EXECUTIVE_ORDERS.md

# Azure documentation (move useful parts to a /docs folder or remove)
AZURE_AUTOMATION_GUIDE.md
AZURE_MANAGED_IDENTITY_SETUP.md
AZURE_PRODUCTION_UPDATES.md

# Cleanup scripts (not needed for portfolio)
cleanup_test_users.py
direct_cleanup.py
fix_azure_firewall.sh
fix_job_schedules.sh
fix_session_logic.py

# Build/deploy artifacts
azure-pipelines.yml (or move to .github/workflows if you want to keep CI/CD visible)
azure-scheduler-jobs.bicep (or move to /infrastructure folder)

# Logs
backend_logs.txt

# Random processing scripts (move to /scripts or delete)
bill_processor.py
process_remaining_texas.py
sync_texas_2nd_session.py
test_connection.py
test_log_extraction.py
```

### Backend Cleanup Scripts to Remove
```bash
cd backend/

# Remove state-specific processors (move to /scripts or delete)
rm ca_auto_restart.py
rm ca_continuous_runner.sh
rm ca_monitor_and_run.py
rm ca_resilient_processor.py
rm ca_robust_processor.py
rm ca_safe_processor.py
rm check_ai_summary_status.py
rm check_ca_status.py
rm check_co_progress.py
rm check_ky_status.py
rm check_recent_eos.py
rm monitor_ca_progress.py
rm monitor_ky_progress.sh
rm monitor_ky.py
rm monitor_rate.py

# Remove fix scripts
rm fix_all_states_status.py
rm fix_co_ai.py
rm fix_colorado_batch.py
rm fix_colorado_status.py
rm fix_duplicate_states.py
rm fix_executive_orders_ai.py
rm fix_html_tags_in_summaries.py
rm fix_missing_dates.py
rm fix_texas_malformed.py
rm fix_texas_summary_format.py

# Remove clean scripts
rm clean_all_remaining_texas.py
rm clean_all_texas_summaries.py
rm clean_texas_summaries.py
rm final_cleanup_texas.py
rm batch_html_cleanup.py

# Remove test scripts
rm test_ai_fix.py
rm test_new_endpoints.py
rm test_new_method.py
rm test_nightly_jobs.py
rm test_state_scheduler.py
rm test_status_updates.py
rm test_texas_fetch.py

# Remove various processing/update scripts (keep in /scripts if you want to show automation)
rm update_all_kentucky_laws.py
rm update_bill_status.py
rm update_bill_statuses_endpoint.py
rm update_categories.py
rm update_kentucky_law_status.py
rm update_property_tax_categorization.py
rm update_readable_statuses.py
rm update_session_tracking.py
```

## Phase 2: Organize Remaining Files

### Create Clean Structure
```
leg_VUE/
├── backend/
│   ├── api/          # API routes
│   ├── models/       # Data models
│   ├── services/     # Business logic
│   ├── utils/        # Helper functions
│   ├── main.py       # FastAPI app
│   ├── ai.py         # AI integration
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── docs/             # Optional: deployment guides
├── .gitignore
├── README.md         # New, clean README
├── LICENSE
└── docker-compose.yml
```

## Phase 3: Create New README

See `NEW_README.md` below

## Phase 4: Clean Up Git History (Optional)

### Option A: Squash Messy Commits
```bash
# This rewrites history - ONLY do this if you're okay with force pushing
git rebase -i --root

# In the interactive editor, squash commits like:
# - "DAVID_DRKMD05"
# - "fixing test script 9"
# - "davids mess"
# Into cleaner commits like:
# - "feat: Add legislative tracking functionality"
# - "fix: Improve AI summarization pipeline"
# - "refactor: Optimize database queries"
```

### Option B: Create Fresh History (Cleaner but loses all history)
```bash
# Create new branch from current state
git checkout --orphan clean-main

# Stage all current files
git add .

# Create single initial commit
git commit -m "Initial commit: Legislative tracking system with AI-powered analysis"

# Replace main branch
git branch -D main
git branch -m main

# Force push (WARNING: This deletes all history)
git push -f origin main
```

### Option C: Keep History As-Is
Just clean up files and move forward. History shows the messy reality of development.
Hiring managers who look closely will see it, but that's okay - real projects are messy.

## Phase 5: Update Repository Metadata

### Add LICENSE
Choose MIT or similar open source license

### Update .gitignore
Make sure these are in .gitignore:
```
# Environment files
.env
.env.local

# Python
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
venv/
env/

# Node
node_modules/
dist/
build/

# IDEs
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Databases
*.db
*.sqlite

# Logs
*.log
```

## Phase 6: Add Documentation

### Create /docs folder (optional)
- `DEPLOYMENT.md` - How to deploy to Azure
- `DEVELOPMENT.md` - How to run locally
- `ARCHITECTURE.md` - System design overview

## Execution Order

1. Create new branch: `git checkout -b cleanup-for-portfolio`
2. Delete messy files
3. Create new README
4. Add LICENSE
5. Update .gitignore
6. Commit: `git commit -m "Prepare repository for portfolio showcase"`
7. Decide on git history strategy (keep, squash, or reset)
8. Push to GitHub
9. Update case study to link to clean repo

## What to Keep

**Core application code:**
- `backend/main.py` (FastAPI app)
- `backend/ai.py` (AI integration)
- `backend/database_*.py` (database layer)
- `backend/legiscan_api.py` (API integration)
- `frontend/src/` (React app)

**Useful documentation:**
- `docker-compose.yml` (shows you can use Docker)
- State processing guide (if you want to show automation knowledge)

**Tests:**
- Playwright tests (shows you care about quality)

## What This Achieves

✅ Removes obvious "AI wrote this" markers (CLAUDE.md)
✅ Removes work-in-progress artifacts
✅ Makes repo look professional and intentional
✅ Keeps actual working code
✅ Maintains honesty in README about AI assistance
✅ Shows you understand deployment and architecture

## Next Steps After Cleanup

1. Update case study language ("architected and directed" vs "built")
2. Prepare interview answers about the codebase
3. Create a 1-page architecture diagram to show you understand the system
4. Practice explaining key technical decisions

#!/bin/bash

# LegislationVUE Repository Cleanup Script
# Run this from the root of your leg_VUE repository

echo "🧹 Starting repository cleanup..."
echo ""

# Create backup branch first
echo "Creating backup branch..."
git checkout -b backup-before-cleanup
git push origin backup-before-cleanup
git checkout main

echo ""
echo "📝 Removing Claude/development artifacts..."

# Remove Claude documentation
rm -f CLAUDE.md
rm -f CLEANUP_SUMMARY.md
rm -f FIXES_SUMMARY.md
rm -f FIX_EXECUTIVE_ORDERS.md

# Remove Azure documentation (we'll keep the important ones in /docs)
rm -f AZURE_AUTOMATION_GUIDE.md
rm -f AZURE_MANAGED_IDENTITY_SETUP.md
rm -f AZURE_PRODUCTION_UPDATES.md

# Remove cleanup scripts
rm -f cleanup_test_users.py
rm -f direct_cleanup.py
rm -f fix_azure_firewall.sh
rm -f fix_job_schedules.sh
rm -f fix_session_logic.py

# Remove build artifacts
rm -f backend_logs.txt

# Remove processing scripts from root
rm -f bill_processor.py
rm -f process_remaining_texas.py
rm -f sync_texas_2nd_session.py
rm -f test_connection.py
rm -f test_log_extraction.py

echo ""
echo "🗂️  Cleaning up backend directory..."

cd backend/

# Remove state-specific processors
rm -f ca_auto_restart.py
rm -f ca_continuous_runner.sh
rm -f ca_monitor_and_run.py
rm -f ca_resilient_processor.py
rm -f ca_robust_processor.py
rm -f ca_safe_processor.py
rm -f check_ai_summary_status.py
rm -f check_ca_status.py
rm -f check_co_progress.py
rm -f check_ky_status.py
rm -f check_recent_eos.py
rm -f monitor_ca_progress.py
rm -f monitor_ky_progress.sh
rm -f monitor_ky.py
rm -f monitor_rate.py

# Remove fix scripts
rm -f fix_all_states_status.py
rm -f fix_co_ai.py
rm -f fix_colorado_batch.py
rm -f fix_colorado_status.py
rm -f fix_duplicate_states.py
rm -f fix_executive_orders_ai.py
rm -f fix_html_tags_in_summaries.py
rm -f fix_missing_dates.py
rm -f fix_texas_malformed.py
rm -f fix_texas_summary_format.py

# Remove cleanup scripts
rm -f clean_all_remaining_texas.py
rm -f clean_all_texas_summaries.py
rm -f clean_texas_summaries.py
rm -f final_cleanup_texas.py
rm -f batch_html_cleanup.py

# Remove test scripts
rm -f test_ai_fix.py
rm -f test_new_endpoints.py
rm -f test_new_method.py
rm -f test_nightly_jobs.py
rm -f test_state_scheduler.py
rm -f test_status_updates.py
rm -f test_texas_fetch.py

# Remove update scripts
rm -f update_all_kentucky_laws.py
rm -f update_bill_status.py
rm -f update_bill_statuses_endpoint.py
rm -f update_categories.py
rm -f update_kentucky_law_status.py
rm -f update_property_tax_categorization.py
rm -f update_readable_statuses.py
rm -f update_session_tracking.py

# Remove various markdown files
rm -f BILL_UPDATE_SYSTEM.md
rm -f ENHANCED_FETCH_IMPLEMENTATION.md
rm -f FILE_UPLOAD_GUIDE.md
rm -f TEXAS_FETCH_FIX_SUMMARY.md
rm -f status_filter_verification_report.md

# Remove SQL files from backend root (keep in migrations or db folder)
rm -f add_new_bill_tracking.sql
rm -f add_new_order_tracking.sql
rm -f create_indexes.sql
rm -f create_session_tracking_table.sql
rm -f remove_texas_duplicates.sql
rm -f update_civic_to_not_applicable.sql

cd ..

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Review the changes: git status"
echo "2. If everything looks good, commit:"
echo "   git add -A"
echo "   git commit -m 'Prepare repository for portfolio showcase'"
echo "3. Push to GitHub:"
echo "   git push origin main"
echo ""
echo "Your backup is in branch 'backup-before-cleanup' if you need to restore anything."

 LinkedIn Comments to Leads Extractor & Enricher (Apify) → Google Sheets / CSV
Overview
Automate LinkedIn lead generation by scraping comments from targeted posts and enriching profiles with detailed data

This n8n workflow automatically extracts leads from LinkedIn post comments using Apify's powerful scrapers (no LinkedIn login required), enriches the data with additional profile information, and exports everything to Google Sheets or CSV format.

✨ Key Features
🔍 No Login Required: Scrape LinkedIn data without sharing credentials
💰 Cost-Effective: First 1,000 comments are free with Apify
📊 Data Enrichment: Enhance basic comment data with full profile details
📈 Export Options: Choose between Google Sheets or CSV output
🎯 Targeted Scraping: Focus on specific posts for quality leads
🛠️ Apify Scrapers Used
1. LinkedIn Post Comments Scraper
Tool: LinkedIn Post Comments, Replies, Engagements Scraper | No Cookies
Pricing: $5.00 per 1,000 results
Function: Extracts all comments and engagement data from specified LinkedIn posts
2. LinkedIn Profile Batch Scraper
Tool: LinkedIn Profile Details Batch Scraper (No Cookies Required)
Pricing: $5.00 per 1,000 results
Function: Enriches scraped profiles with detailed information
💡 Free Tier: Apify provides 1,000 free scraped comments to get you started!

📋 Prerequisites
Required API Credentials
Apify Token

Add your APIFY_TOKEN to the workflow credentials
Get your token from Apify Console
Google Sheets Credentials (if using Sheets export)

Configure OAuth credentials for Google Sheets integration
Follow n8n's Google Sheets setup guide
🔄 Workflow Process
Default Mode: Form-Based Execution
Manual Trigger → Launches the workflow
Form Submission → User-friendly form for inputting LinkedIn post URLs
Comment Scraping → Apify extracts all comments from specified posts
Profile Enrichment → Additional profile data gathered for each commenter
Data Processing → Creates unique, enriched lead list
Google Sheets Export → Automatically populates your spreadsheet
Result: You'll be redirected to a Google Sheets document containing all enriched leads

Alternative Mode: CSV Export
For users preferring CSV output:

Disable: Form trigger nodes
Enable: Manual trigger node
Disable: Google Sheets export nodes
Enable: CSV download nodes
Configure: Add post IDs/URLs in "Set manual fields" node
Execute: Run workflow and download CSV from the CSV node
📊 Output Data Structure
Your exported data will include:

Basic Info: Name, headline, location
Profile Details: Company, position, industry
Engagement Data: Comment content, engagement metrics
Contact Info: Available profile links and connections
Enriched Data: Additional profile insights from Apify
💡 Pro Tips
Quality over Quantity: Target posts with high-quality, relevant engagement
Monitor Costs: Track your Apify usage to stay within budget
Data Hygiene: Regularly clean and deduplicate your lead lists
Compliance: Ensure your scraping activities comply with LinkedIn's terms of service
🆘 Troubleshooting
Common Issues:

Authentication Errors: Verify your Apify token is correctly configured
Empty Results: Check that your LinkedIn post URLs are valid and public
Export Failures: Ensure Google Sheets credentials are properly set up
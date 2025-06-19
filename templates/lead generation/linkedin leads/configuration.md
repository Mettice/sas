DESCRIPTION
Note: Now includes an Apify alternative for Rapid API (Some users can't create new accounts on Rapid API, so I have added an alternative for you. But immediately you are able to get access to Rapid API, please use that option, it returns more detailed data). Scroll to bottom for APify setup guide.

This n8n workflow automates LinkedIn lead generation, enrichment, and activity analysis using Apollo.io, RapidAPI, Google Sheets, and Mail.so. Perfect for sales teams, founders, B2B marketers, and cold outreach pros who want personalized lead insights to drive better conversion rates.

⚙️ How This Workflow Works

The workflow is broken down into several key steps, each designed to help you build and enrich a valuable list of LinkedIn leads:

1. 🔑 Lead Discovery (Keyword Search via Apollo)
Pulls leads using Apollo.io's API based on keywords, industries, or job titles. Saves lead name, title, company, and LinkedIn URL to your Google Sheet. You can replace the trigger node from the form node to a webhook, WhatsApp, Telegram, etc., any way for you to send over your query variables over to initiate the workflow.

2. 🧠 Username Extraction (from LinkedIn URL)
Extracts the LinkedIn username from profile URLs using a simple script node. This is required for further enrichment via RapidAPI.

3. ✉️ Email Lookup (via Apollo User ID)
Uses the Apollo User ID to retrieve the lead’s verified work email. Ensures high-quality leads with reliable contact info. To double-check that the email is currently valid, we use the Mail.so API and filter out emails that fail deliverability and MX-record check. We don't want to risk sending emails to no longer existent addresses, right?

4. 🧾 Profile Summary Enrichment (via RapidAPI)
Queries the LinkedIn Data API to fetch a lead’s profile summary/bio. Gives you a deeper understanding of their background and expertise.

5. 📰 Recent Activity Collection (Posts & Reposts)
Retrieves recent posts or reposts from each lead’s profile. Great for tailoring outreach with reference to what they’re currently talking about.

6. 🗂️ Leads Database Update
All enriched data is written to the same Google Sheet. New columns are filled in without overwriting existing data.

✅ Smart Retry & Row Status Logic
Every subworkflow includes a fail-safe mechanism to ensure:

- Each row has status columns (e.g., done, failed, pending).
- A scheduled retry workflow resets failed rows to pending after 2 weeks (customizable). This gives failed enrichments another chance to be processed later, reducing data loss.

📋 Google Sheets Setup
- Template 1: Apollo Leads Scraping & Enrichment
- Template 2: Enriched Leads Database
Make a copy to your Drive and use. Columns will be filled as each subworkflow runs (email, summary, interests, etc.).

🔐 Required API Keys
To use this workflow, you’ll need the following credentials:

- 🧩 Apollo.io
Sign up and get your key here: Apollo.io API Keys
⚠️ Important: Toggle the “Master API Key” option to ON when generating your key. This ensures the same key can be used for all Apollo endpoints in this workflow.

- 🌐 RapidAPI (LinkedIn Data API)
Subscribe to the API here: LinkedIn Data API on RapidAPI
Use the key in the x-rapidapi-key header in the relevant nodes.

- ✉️ Mail.so
Sign up and get your key here: Mail.so API
💡 For both APIs, set up the credentials in n8n as “Generic Credential” types. This way, you won’t need to reconfigure the headers in each node.

🛠️ Customization Options
- Modify the Apollo filters (location, industry, seniority) to target your ideal customers.
- Change retry interval in the scheduler (e.g., weekly instead of 2 weeks).
- Connect the database to your email campaign tool like Mailchimp or Instantly.ai.
- Replace the AI nodes with your desired AI agents and customize the system messages further to get desired results.

🆕 Apify Update Guide
To use this workflow, you’ll need the following credentials:
Login to Apify, then open this link; https://console.apify.com/actors/2SyF0bVxmgGr8IVCZ/
Click on integrations and scroll down to API Solutions and select "Use API endpoints". Scroll to "Run Actor synchronously and get dataset items" and copy the actor endpoint URL then paste it in the placeholder inside the HTTP node of Apify alternative flow "apify-actor-endpoint". That's it, you are set to go.

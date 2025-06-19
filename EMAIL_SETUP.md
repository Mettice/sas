# Email Setup Guide

## Setting up EmailJS for Contact Form

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Verify your email address

### 2. Set up Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Contact Form Submission - {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Service Interest: {{service}}

Message:
{{message}}

---
This message was sent from your website contact form.
```

4. Note down your **Template ID**

### 4. Get Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

### 5. Environment Variables
Create a `.env` file in your project root with:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
REACT_APP_CONTACT_EMAIL=your-email@example.com
```

### 6. Test the Setup
1. Restart your development server
2. Fill out the contact form
3. Check your email for the notification

## Alternative: Using n8n Webhook

If you prefer to use n8n for email handling:

1. Create an n8n workflow with a webhook trigger
2. Add an email node to send notifications
3. Update the contact form to send to your n8n webhook instead of EmailJS

## Troubleshooting

- **Email not sending**: Check your EmailJS service configuration
- **Template not found**: Verify your template ID
- **Authentication failed**: Re-authenticate your email service
- **Environment variables not loading**: Restart your development server 
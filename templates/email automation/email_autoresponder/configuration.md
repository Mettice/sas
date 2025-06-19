# Email Auto-Responder Configuration

- n8n
- Gmail API
- OpenAI API Key

# Setup Steps
1. Import the workflow into n8n.
2. Set up your Gmail credentials in n8n.
3. Add your OpenAI API key to the environment variables.
4. Adjust the keyword list in the workflow settings.
5. Activate the workflow.

How It Works:

- Email Trigger: activates when new emails reach the Gmail inbox
- Assessment: uses OpenAI GPT-4 and a JSON parser to determine if a response is necessary
- Reply Generation: crafts a reply with OpenAI GPT-4 Turbo
- Draft Integration: after converting the text to HTML, it places the draft into the Gmail thread as a reply to the first message

Set Up Overview (~10 minutes):

1. OAuth Configuration:
- Setup Google OAuth in Google Cloud console.
- Make sure to add Gmail API with the modify scope.
- Add Google OAuth credentials in n8n.
- Make sure to add the n8n redirect URI to the Google Cloud Console consent screen settings.

2. OpenAI Configuration:
- Add OpenAI API Key in the credentials.

3. Tweaking the prompt:
- Edit the system prompt in the "Generate email reply" node to suit your needs.

Reach out to me here if you need help building automations for your business.
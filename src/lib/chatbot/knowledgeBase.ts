import { OpenAI } from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat';

const SYSTEM_PROMPT = `You are a friendly and helpful AI assistant for Smart Automation Suite. Your goal is to have natural conversations while helping users discover automation solutions for their business needs.

Key guidelines:
- Be conversational and friendly, like chatting with a helpful colleague
- Match the user's tone and energy
- Don't rush to push solutions - focus on understanding the person first
- Use casual language while staying professional
- Show personality and empathy
- If someone just says "hi" or "hello", respond naturally without jumping into business questions
- Only ask about their business challenges after building some rapport

About the company:
- We build custom automation solutions for businesses
- We help automate repetitive tasks and workflows
- Key areas: email automation, HR processes, social media, lead generation
- We have free templates users can try
- We offer weekly automation tips via email (but don't push for email signup immediately)

Example natural responses:
- To "hi": "Hey there! 👋 How are you doing today?"
- To "hello": "Hello! Nice to meet you. How's your day going?"
- To small talk: Engage naturally before transitioning to business topics
- To business questions: Provide helpful info while keeping the conversation flowing

Remember: Build rapport first, understand their needs, then offer relevant solutions.`;

export const generateInitialMessage = () => {
  return "Hey there! 👋 How are you doing today?";
};

const getOpenAIKey = () => {
  // Try different environment variable patterns
  const key = process.env.OPENAI_API_KEY || 
              process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
              process.env.REACT_APP_OPENAI_API_KEY;
              
  if (!key) {
    console.error('OpenAI API key not found in environment variables');
    throw new Error('OpenAI API key not configured');
  }
  return key;
};

export const generateAIResponse = async (messages: { text: string; sender: 'user' | 'bot' }[]) => {
  try {
    const apiKey = getOpenAIKey();
    
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Required for client-side usage
    });

    const conversation: ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }))
    ];

    console.log('Sending request to OpenAI...'); // Debug log
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: conversation,
      temperature: 0.7,
      max_tokens: 300,
    });
    console.log('Received response from OpenAI'); // Debug log

    return response.choices[0].message.content || "I apologize, but I'm having trouble generating a response. Could you please try rephrasing your message?";
  } catch (error) {
    console.error('Error generating AI response:', error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return "I apologize, but there seems to be an issue with the API configuration. Please contact support to resolve this.";
      }
    }
    return "I apologize, but I'm having trouble connecting right now. Would you like to schedule a call with our team instead?";
  }
};

interface LeadInfo {
  email?: string;
  name?: string;
  interest?: string;
  timestamp: Date;
  wants_newsletter?: boolean;
}

export const extractLeadInfo = (messages: { text: string; sender: 'user' | 'bot' }[]): LeadInfo | null => {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const userMessages = messages.filter(m => m.sender === 'user').map(m => m.text);
  
  let email: string | undefined;
  let name: string | undefined;
  let interest: string | undefined;
  let wants_newsletter = false;

  // Try to find email in messages
  for (const message of userMessages) {
    const match = message.match(emailRegex);
    if (match) {
      email = match[0];
      // Check if they want newsletter
      const lowerMessage = message.toLowerCase();
      wants_newsletter = !lowerMessage.includes("don't") && !lowerMessage.includes("no") && 
                        (lowerMessage.includes("yes") || lowerMessage.includes("sure") || 
                         lowerMessage.includes("ok") || lowerMessage.includes("please"));
      break;
    }
  }

  // Try to identify interest/pain points from messages
  const interestKeywords = {
    'email': 'Email Automation',
    'manual': 'Process Automation',
    'data': 'Data Integration',
    'error': 'Quality Improvement',
    'time': 'Efficiency Optimization',
    'cost': 'Cost Reduction',
    'lead': 'Lead Generation',
    'hr': 'HR Automation',
    'social': 'Social Media Automation'
  };

  for (const message of userMessages) {
    const lowerMessage = message.toLowerCase();
    for (const [keyword, value] of Object.entries(interestKeywords)) {
      if (lowerMessage.includes(keyword)) {
        interest = value;
        break;
      }
    }
    if (interest) break;
  }

  if (email || interest) {
    return {
      email,
      name,
      interest,
      timestamp: new Date(),
      wants_newsletter
    };
  }

  return null;
}; 
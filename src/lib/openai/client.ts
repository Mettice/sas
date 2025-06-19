import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export const initializeOpenAI = () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (apiKey) {
    openaiClient = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Note: In production, you should proxy requests through your backend
    });
  }
  return openaiClient;
};

export const getOpenAIClient = () => {
  if (!openaiClient) {
    return initializeOpenAI();
  }
  return openaiClient;
}; 
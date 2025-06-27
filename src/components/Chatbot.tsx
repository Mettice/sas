import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Download, ArrowLeft } from 'lucide-react';
import { generateAIResponse, generateInitialMessage, extractLeadInfo } from '../lib/chatbot/knowledgeBase';
import { supabase } from '../lib/supabase/client';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const TEMPLATE_CATEGORIES = {
  email: ['Email Auto-Responder', 'Email Auto-Label AI'],
  hr: ['CV Parser', 'Job Posting Automation'],
  lead: ['LinkedIn Profile Discovery', 'Lead Collection'],
  social: ['Multi-platform Posting', 'Content Automation']
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    text: generateInitialMessage(),
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasAskedForEmail, setHasAskedForEmail] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addTypingDelay = () => {
    return new Promise(resolve => {
      // Random delay between 500ms and 1500ms to simulate natural typing
      setTimeout(resolve, Math.random() * 1000 + 500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      text: inputValue.trim(),
      sender: 'user' as const,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Add typing delay for more natural conversation
    await addTypingDelay();

    try {
      const response = await generateAIResponse([...messages, userMessage]);
      
      setMessages(prev => [...prev, {
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [...prev, {
        text: "I apologize, but I'm having trouble connecting right now. Would you like to schedule a call with our team instead?",
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
    
    setIsTyping(false);
  };

  // Swipe to close functionality
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > 50; // Minimum swipe distance

    if (isSwipeUp) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Chat Button with Online Status */}
      <div className="fixed bottom-4 right-4 sm:bottom-4 sm:right-4 flex flex-col items-end gap-2 z-50">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Online</span>
          </motion.div>
        )}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 sm:bottom-20 sm:right-4 sm:inset-auto sm:w-96 bg-white dark:bg-gray-900 rounded-none sm:rounded-lg shadow-xl z-50 overflow-hidden border-0 sm:border sm:border-gray-200 dark:sm:border-gray-700"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Header with Swipe Indicator */}
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-blue-600 text-white">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Automation Assistant</h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                    {isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Swipe indicator for mobile */}
                <div className="hidden sm:block w-8 h-1 bg-white/30 rounded-full"></div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Swipe indicator for mobile */}
            <div className="sm:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-1"></div>

            {/* Messages */}
            <div className="h-[calc(100vh-180px)] sm:h-96 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-white dark:bg-gray-900">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-lg text-sm sm:text-base ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex gap-1 text-black dark:text-white">
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0 }}
                    >•</motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.2 }}
                    >•</motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.4 }}
                    >•</motion.span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input with Close Button */}
            <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 sm:p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                />
                <motion.button
                  type="submit"
                  className="p-3 sm:p-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Mobile Close Button - Always visible */}
              <div className="sm:hidden flex justify-center mt-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Close Chat</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 
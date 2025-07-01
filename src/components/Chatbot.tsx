import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ArrowLeft, Minus } from 'lucide-react';
import { generateAIResponse, generateInitialMessage, extractLeadInfo } from '../lib/chatbot/knowledgeBase';
import { supabase } from '../lib/supabase/client';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatbot-messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        return parsed.map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) }));
      } catch {
        // Fallback to initial message if parsing fails
        return [{ text: generateInitialMessage(), sender: 'bot', timestamp: new Date() }];
      }
    }
    return [{ text: generateInitialMessage(), sender: 'bot', timestamp: new Date() }];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const storedEmailsRef = useRef<Set<string>>(new Set());

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

    // Lead extraction and storage
    const updatedMessages = [...messages, userMessage];
    const lead = extractLeadInfo(updatedMessages);
    if (lead && lead.email && !storedEmailsRef.current.has(lead.email)) {
      try {
        await supabase.from('chat_leads').insert([
          {
            email: lead.email,
            name: lead.name || null,
            interest: lead.interest || null,
            timestamp: lead.timestamp.toISOString(),
            wants_newsletter: lead.wants_newsletter || false
          }
        ]);
        storedEmailsRef.current.add(lead.email);
      } catch (err) {
        console.error('Failed to store lead in Supabase:', err);
      }
    }

    // Add typing delay for more natural conversation
    await addTypingDelay();

    try {
      const response = await generateAIResponse(updatedMessages);
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

  // Overlay click handler
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only minimize if the overlay itself is clicked, not the chat window
    if (e.target === e.currentTarget) {
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

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={handleOverlayClick}
            aria-label="Chat overlay"
          />
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbox-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 sm:bottom-20 sm:right-4 sm:inset-auto sm:w-96 bg-white dark:bg-gray-900 rounded-none sm:rounded-lg shadow-xl z-50 overflow-hidden border-0 sm:border sm:border-gray-200 dark:sm:border-gray-700 cursor-auto"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            {/* Header with Minimize and Close */}
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-blue-600 text-white">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Automation Assistant</h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Minimize button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Minimize chat"
                  title="Minimize"
                >
                  <Minus className="w-5 h-5" />
                </button>
                {/* Close button with confirmation */}
                <button
                  onClick={() => setShowConfirmClose(true)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close chat"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Confirm Close Dialog */}
            {showConfirmClose && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-4 max-w-xs w-full">
                  <span className="text-gray-900 dark:text-white text-base font-semibold">Are you sure you want to close the chat? This will clear your chat history.</span>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setShowConfirmClose(false)}
                      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >Cancel</button>
                    <button
                      onClick={() => {
                        setShowConfirmClose(false);
                        setIsOpen(false);
                        setMessages([{ text: generateInitialMessage(), sender: 'bot', timestamp: new Date() }]);
                        setInputValue('');
                      }}
                      className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    >Close</button>
                  </div>
                </div>
              </div>
            )}

            {/* Swipe indicator for mobile */}
            <div className="sm:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-1"></div>

            {/* Messages */}
            <div className="h-[calc(100vh-180px)] sm:h-96 overflow-y-auto p-3 sm:p-4 space-y-5 sm:space-y-6 bg-white dark:bg-gray-900">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-end`}
                >
                  {message.sender === 'bot' && (
                    <span className="mr-2 flex-shrink-0" aria-label="Bot avatar">
                      <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      </span>
                    </span>
                  )}
                  <div
                    className={`max-w-xs sm:max-w-md p-3 rounded-2xl shadow text-sm sm:text-base ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                    }`}
                  >
                    {message.text}
                    <div className="mt-1 text-xs text-gray-400 dark:text-gray-500 text-right select-none">
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <span className="ml-2 flex-shrink-0" aria-label="User avatar">
                      <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                      </span>
                    </span>
                  )}
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
              <div className="flex gap-2 bg-gray-50 dark:bg-zinc-800 rounded-lg p-2 border border-gray-200 dark:border-zinc-700">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 sm:p-2 rounded-lg border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                  autoFocus
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

function formatTimestamp(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (isToday) return time;
  if (isYesterday) return `Yesterday, ${time}`;
  return d.toLocaleDateString() + ', ' + time;
} 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className = '', onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        service: 'general'
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-800/50 border border-white/10 p-8 rounded-xl text-center"
      >
        <MessageSquare className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2 text-white">Message Sent!</h3>
        <p className="text-zinc-300">
          Thank you for reaching out. We'll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-8 bg-zinc-800/50 border border-white/10 p-8 rounded-xl ${className}`}
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg border border-red-500/20 font-semibold">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="block text-base font-semibold mb-2 text-white">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-zinc-900/50 text-white text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-zinc-400"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-base font-semibold mb-2 text-white">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-zinc-900/50 text-white text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-zinc-400"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="block text-base font-semibold mb-2 text-white">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter your company name"
          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-zinc-900/50 text-white text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-zinc-400"
        />
      </div>
      <div>
        <label htmlFor="service" className="block text-base font-semibold mb-2 text-white">
          Service Interest
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-zinc-900/50 text-white text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="general">General Inquiry</option>
          <option value="workflow">Workflow Automation</option>
          <option value="ai">AI Integration</option>
          <option value="data">Data Automation</option>
          <option value="leadgen">Lead Generation</option>
          <option value="marketing">Marketing Automation</option>
          <option value="onboarding">Customer Onboarding</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-base font-semibold mb-2 text-white">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your automation needs..."
          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-zinc-900/50 text-white text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-zinc-400 min-h-[120px]"
          required
        />
      </div>
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-bold py-3 rounded-lg mt-6 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </motion.button>
    </motion.form>
  );
}; 
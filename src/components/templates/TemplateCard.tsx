// components/templates/TemplateCard.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string[];
  tools: string[];
  features: string[];
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => {
  return (
    <div 
      className="glass-card rounded-2xl p-8 transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={onClick}
      style={{ boxShadow: '0 4px 24px 0 rgba(31,38,135,0.12)' }}
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {template.category.map((cat, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-purple-600/10 text-purple-300 rounded-full text-xs font-semibold tracking-wide"
          >
            {cat}
          </span>
        ))}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 leading-tight">{template.title}</h3>
      <p className="text-zinc-300 mb-6 line-clamp-2 text-base font-medium">
        {template.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {template.tools.map((tool, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-cyan-600/10 text-cyan-300 rounded-full text-xs font-semibold"
          >
            {tool}
          </span>
        ))}
      </div>
      <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-bold shadow-lg transition-all duration-300">
        View Details
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
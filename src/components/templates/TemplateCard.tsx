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
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl active:scale-95"
      onClick={onClick}
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {template.category.map((cat, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white">{template.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm sm:text-base">
          {template.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {template.tools.map((tool, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-xs"
            >
              {tool}
            </span>
          ))}
        </div>

        <button className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 transition-colors text-sm sm:text-base">
          View Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
// components/templates/TemplateSearch.tsx
import React from 'react';

interface TemplateSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const TemplateSearch: React.FC<TemplateSearchProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories
}) => {
  const allCategories = ['all', ...categories];

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search templates..."
          className="w-full px-5 py-4 rounded-xl border border-white/10 bg-zinc-900/80 text-white text-lg font-medium placeholder:text-zinc-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-lg backdrop-blur-md"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-5 py-2 rounded-full text-base font-semibold transition-colors border border-white/10 shadow-sm backdrop-blur-md ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
                : 'bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700/80'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
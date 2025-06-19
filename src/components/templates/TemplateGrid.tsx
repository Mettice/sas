// components/templates/TemplateGrid.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase/client';
import { TemplateCard } from './TemplateCard';
import { TemplateSearch } from './TemplateSearch';
import { TemplateDetail } from './TemplateDetail';

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

export const TemplateGrid: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const fetchTemplates = async () => {
    try {
      console.log('Fetching templates...');
      console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
      
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching templates:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }
      
      console.log('Templates fetched successfully:', data);
      console.log('Number of templates:', data?.length || 0);
      if (data && data.length > 0) {
        console.log('First template:', data[0]);
      }
      
      setTemplates(data || []);
    } catch (err) {
      console.error('Error in fetchTemplates:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Get unique categories from all templates
  const categories = Array.from(new Set(
    templates.flatMap(template => template.category)
  )).sort();

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase())) ||
      template.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-600 py-8 text-sm sm:text-base">
      Error: {error}
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <TemplateSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
          No templates found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={() => setSelectedTemplate(template)}
            />
          ))}
        </div>
      )}

      {selectedTemplate && (
        <TemplateDetail
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  );
};
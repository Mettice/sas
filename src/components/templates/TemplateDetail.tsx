// components/templates/TemplateDetail.tsx
import React from 'react';
import { X, Download } from 'lucide-react';
import { DownloadButton } from './DownloadButton';

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

interface TemplateDetailProps {
  template: Template;
  onClose: () => void;
}

export const TemplateDetail: React.FC<TemplateDetailProps> = ({ template, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{template.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
            <p className="text-gray-600 dark:text-gray-400">{template.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {template.category.map((cat, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {template.tools.map((tool, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {template.features && template.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                {template.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Need Help?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you need assistance with this template or have questions about implementation, 
              our team is here to help.
            </p>
            <div className="flex gap-4">
              <DownloadButton templateId={template.id} className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Template
              </DownloadButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
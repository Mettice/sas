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
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" 
      onClick={handleBackdropClick}
    >
      <div className="bg-zinc-900/90 border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 backdrop-blur-md">
        <div className="sticky top-0 bg-zinc-900/80 border-b border-white/10 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white pr-4">{template.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-300 hover:text-white transition-colors flex-shrink-0 border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="py-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Description</h3>
            <p className="text-base text-zinc-300">{template.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {template.category.map((cat, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-purple-600/10 text-purple-300 rounded-full text-sm font-semibold border border-purple-500/20"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {template.tools.map((tool, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-cyan-600/10 text-cyan-300 rounded-full text-sm font-semibold border border-cyan-500/20"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          {template.features && template.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-base text-zinc-300">
                {template.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Need Help?</h3>
            <p className="text-base text-zinc-300 mb-4">
              If you need assistance with this template or have questions about implementation, 
              our team is here to help.
            </p>
            <div className="flex gap-4">
              <DownloadButton templateId={template.id} className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-5 py-3 rounded-lg font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-base" >
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
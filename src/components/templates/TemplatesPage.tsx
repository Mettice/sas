import React from 'react';
import { TemplateGrid } from './TemplateGrid';
import { Chatbot } from '../Chatbot';

interface TemplatesPageProps {
  isDark?: boolean;
  scrolled?: boolean;
}

const TemplatesPage: React.FC<TemplatesPageProps> = ({ isDark = true, scrolled = false }) => {
  return (
    <>
      <section className="min-h-screen bg-black text-white px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">Automation Templates</h1>
          <p className="text-lg text-zinc-300 text-center mb-12 max-w-2xl mx-auto">
            Browse our collection of free, ready-to-use automation templates for business workflows, AI, data, and more. Click any template to view details and download instantly.
          </p>
          <div className="mt-8">
            <TemplateGrid />
          </div>
        </div>
      </section>
      <Chatbot />
    </>
  );
};

export default TemplatesPage; 
import React from 'react';
import { TemplateGrid } from './TemplateGrid';

const TemplatesPage: React.FC = () => {
  return (
    <section className="min-h-screen bg-black text-white px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">Automation Templates</h1>
        <p className="text-lg text-zinc-300 text-center mb-12 max-w-2xl mx-auto">
          Browse our collection of free, ready-to-use automation templates for business workflows, AI, data, and more. Click any template to view details and download instantly.
        </p>
        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
          <TemplateGrid />
        </div>
      </div>
    </section>
  );
};

export default TemplatesPage; 
import { create } from 'zustand';

interface Template {
  id: string;
  title: string;
  description: string;
  tools: string[];
  categories: string[];
  preview_image?: string;
  features: string[];
  documentation_url?: string;
  video_url?: string;
}

interface TemplateStore {
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  setTemplates: (templates) => set({ templates }),
  selectedTemplate: null,
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
}));

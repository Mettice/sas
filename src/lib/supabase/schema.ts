export type Template = {
  id: string;
  title: string;
  description: string;
  category: string[];
  tools: string[];
  release_date: string;
  bundle_id?: string;
  file_path: string;
  video_url?: string;
  downloads: number;
  preview_image?: string;
  metadata: {
    complexity: 'basic' | 'intermediate' | 'advanced';
    estimated_setup_time: string;
    requirements: string[];
  };
};

export type WeeklyDrop = {
  id: string;
  title: string;
  release_date: string;
  templates: string[]; // Template IDs
  description: string;
  use_cases: {
    title: string;
    description: string;
  }[];
  downloads: number;
};

export type User = {
  id: string;
  email: string;
  downloads: {
    template_id: string;
    downloaded_at: string;
  }[];
  joined_date: string;
  newsletter_subscriber: boolean;
};

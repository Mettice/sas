// lib/download.ts
import { supabase } from './supabase/client';
import JSZip from 'jszip';

export const downloadTemplate = async (templateId: string): Promise<string> => {
  try {
    // First, get template info
    const { data: template, error: templateError } = await supabase
      .from('templates')
      .select('*')
      .eq('id', templateId)
      .single();

    if (templateError) {
      console.error('Template fetch error:', templateError);
      throw new Error('Failed to fetch template information');
    }

    if (!template) {
      throw new Error('Template not found');
    }

    // Create a new zip file
    const zip = new JSZip();
    
    // Get template folder path
    const templatePath = template.title.toLowerCase().replace(/ /g, '_');
    const categoryPath = template.category[0].toLowerCase().replace(/ /g, '_');
    const basePath = `/templates/${categoryPath}/${templatePath}`;

    // Files to include
    const files = [
      { name: 'workflow.json', type: 'text' },
      { name: 'configuration.md', type: 'text' },
      { name: 'metadata.json', type: 'text' },
      { name: 'preview.png', type: 'blob' }
    ];

    // Add files to zip
    for (const file of files) {
      try {
        const response = await fetch(`${basePath}/${file.name}`);
        if (!response.ok) {
          console.warn(`File ${file.name} not found, skipping...`);
          continue;
        }
        
        const content = file.type === 'text' 
          ? await response.text()
          : await response.blob();
        
        zip.file(file.name, content);
      } catch (err) {
        console.warn(`Error adding ${file.name} to zip:`, err);
        // Continue with other files if one fails
      }
    }

    // Generate zip file
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);

    // Log the download
    await supabase
      .from('download_leads')
      .insert([
        {
          template_id: templateId,
          downloaded_at: new Date().toISOString()
        }
      ]);

    return url;
  } catch (error) {
    console.error('Download error:', error);
    throw new Error('Failed to download template');
  }
};


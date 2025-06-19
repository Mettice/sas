require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Updated template paths based on the new structure
const TEMPLATES = [
  'email automation/email_autoresponder',
  'email automation/email_auto_label_ai',
  'HR/CV parser',
  'HR/JobPosting',
  'lead generation/linkedin2',
  'lead generation/linkedin leads',
  'Social Media/Multiplatform',
  'Social Media/linkedin'
];

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function uploadTemplate(templatePath) {
  try {
    // Read metadata
    const metadata = JSON.parse(
      fs.readFileSync(path.join('templates', templatePath, 'metadata.json'))
    );

    // Prepare data for database - only include fields that match our schema
    const templateData = {
      title: metadata.title,
      description: metadata.description,
      category: Array.isArray(metadata.category) ? metadata.category : [metadata.category],
      tools: Array.isArray(metadata.tools) ? metadata.tools : [metadata.tools],
      features: Array.isArray(metadata.features) ? metadata.features : [metadata.features],
      is_public: metadata.isPublic !== false, // defaults to true if not specified
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insert into database
    const { data: existingTemplate } = await supabase
      .from('templates')
      .select()
      .eq('title', metadata.title)
      .single();

    if (existingTemplate) {
      // Update existing template
      const { error: updateError } = await supabase
        .from('templates')
        .update({
          ...templateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingTemplate.id);

      if (updateError) throw updateError;
      console.log(`✅ Updated: ${metadata.title}`);
    } else {
      // Insert new template
      const { error: insertError } = await supabase
        .from('templates')
        .insert([templateData]);

      if (insertError) throw insertError;
      console.log(`✅ Inserted: ${metadata.title}`);
    }
  } catch (error) {
    console.error(`❌ Failed to upload ${templatePath}:`, error);
  }
}

// Upload all templates
async function uploadTemplates() {
  for (const templatePath of TEMPLATES) {
    await uploadTemplate(templatePath);
  }
}

uploadTemplates();
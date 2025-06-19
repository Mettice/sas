import { createClient } from '@supabase/supabase-js';

if (!process.env.REACT_APP_SUPABASE_URL) {
  throw new Error('Missing Supabase URL. Set REACT_APP_SUPABASE_URL in your .env file');
}

if (!process.env.REACT_APP_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase Anon Key. Set REACT_APP_SUPABASE_ANON_KEY in your .env file');
}

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Template functions
export const templateApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('release_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  getByCategory: async (category: string) => {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .contains('category', [category]);
    if (error) throw error;
    return data;
  }
};

// Weekly drops functions
export const weeklyDropApi = {
  getLatest: async () => {
    const { data, error } = await supabase
      .from('weekly_drops')
      .select('*')
      .order('release_date', { ascending: false })
      .limit(1)
      .single();
    if (error) throw error;
    return data;
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from('weekly_drops')
      .select('*')
      .order('release_date', { ascending: false });
    if (error) throw error;
    return data;
  }
};

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==================
// TYPES
// ==================
export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  capacity: string;
  image_url: string;
  status: string;
  completion_date: string | null;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  section: string;
  title: string;
  content: string;
  image_url: string;
  data: Record<string, unknown>;
  updated_at: string;
}

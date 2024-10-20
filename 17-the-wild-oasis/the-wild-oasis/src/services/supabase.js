import { createClient } from '@supabase/supabase-js';

// prettier-ignore
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZHdqZHFqY2RrbXRta3RwdXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMTY5OTgsImV4cCI6MjA0NDU5Mjk5OH0.LmdLeNOgvjMM5ZUk6Z-GhQUn6cOaxrplPXoeBfh5LoA';
export const supabaseUrl = 'https://cvdwjdqjcdkmtmktputu.supabase.co';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

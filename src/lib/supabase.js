import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SESSION_STORAGE_KEY = 'bracket_ai_session_id';
const BRACKET_STORAGE_KEY = 'bracket_ai_bracket_id';

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getOrCreateSessionId() {
  if (typeof window === 'undefined') {
    return null;
  }

  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const created = createId();
  window.localStorage.setItem(SESSION_STORAGE_KEY, created);
  return created;
}

export const sessionId = getOrCreateSessionId();
export const bracketStorageKey = BRACKET_STORAGE_KEY;

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key', {
  auth: {
    persistSession: false,
  },
  global: {
    headers: sessionId ? { 'x-session-id': sessionId } : {},
  },
});

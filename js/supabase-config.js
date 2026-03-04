// Supabase Configuration
// Initialize Supabase client for Goal Accelerator PWA

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ⚠️ IMPORTANT: Add your Supabase URL and ANON KEY from Supabase dashboard
// Project Settings → API → URL and anon key
const SUPABASE_URL = 'https://jqhnuglcvrcydqrzdzmc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaG51Z2xjdnJjeWRxcnpkem1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NjI0MzgsImV4cCI6MjA4ODIzODQzOH0.VuwF0AwY9hUvje1qIoNGpwV7zuChkqpa74fv1WlZRsw';

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Verify connection on load
console.log('🔌 Supabase initialized with URL:', SUPABASE_URL);
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ ERROR: Supabase credentials are missing! Check supabase-config.js');
}

// Authentication helper functions
export async function signUp(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Sign up error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Sign in error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Get user error:', error.message);
    return null;
  }
}

// Listen to auth changes
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session?.user || null);
  });
}

// Data helper functions
export async function saveGoals(goals) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  try {
    const { error } = await supabase
      .from('yearly_goals')
      .delete()
      .eq('user_id', user.id);

    for (const goal of goals) {
      const { error: insertError } = await supabase
        .from('yearly_goals')
        .insert({
          user_id: user.id,
          year: new Date().getFullYear(),
          category: goal.area || goal.category,
          title: goal.title,
          why: goal.why || '',
          area_index: goals.indexOf(goal),
        });

      if (insertError) throw insertError;
    }

    return { success: true };
  } catch (error) {
    console.error('Save goals error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function getGoals() {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  try {
    const { data, error } = await supabase
      .from('yearly_goals')
      .select('*')
      .eq('user_id', user.id)
      .eq('year', new Date().getFullYear())
      .order('area_index');

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Get goals error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function saveHabitLog(habitId, date, completed) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  try {
    const { error } = await supabase
      .from('habit_logs')
      .upsert({
        user_id: user.id,
        habit_id: habitId,
        date,
        completed,
      }, {
        onConflict: 'habit_id,date',
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Save habit log error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function getHabitLogs(habitId) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  try {
    const { data, error } = await supabase
      .from('habit_logs')
      .select('*')
      .eq('user_id', user.id)
      .eq('habit_id', habitId);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Get habit logs error:', error.message);
    return { success: false, error: error.message };
  }
}

// Import Tailwind CSS
import '../css/style.css';

// Import Supabase
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'your-supabase-url-here';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-supabase-key-here';

export const supabase = createClient(supabaseUrl, supabaseKey);

console.log('App initialized with Tailwind CSS and Supabase');

document.addEventListener("DOMContentLoaded", () => {
  const onboarding = document.getElementById("onboarding");
  const wheelOfLife = document.getElementById("wheel-of-life");
  const yearlyGoals = document.getElementById("yearly-goals");

  const nextToWheel = document.getElementById("next-to-wheel");
  const nextToGoals = document.getElementById("next-to-goals");
  const finishOnboarding = document.getElementById("finish-onboarding");

  // Show onboarding screen
  onboarding.classList.remove("hidden");

  // Navigate to Wheel of Life
  nextToWheel.addEventListener("click", () => {
    onboarding.classList.add("hidden");
    wheelOfLife.classList.remove("hidden");
  });

  // Navigate to Yearly Goals
  nextToGoals.addEventListener("click", () => {
    wheelOfLife.classList.add("hidden");
    yearlyGoals.classList.remove("hidden");
  });

  // Finish Onboarding
  finishOnboarding.addEventListener("click", () => {
    yearlyGoals.classList.add("hidden");
    alert("Onboarding Complete!");
  });
});

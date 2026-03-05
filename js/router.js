import { renderAuth } from './views/auth.js';
import { renderOnboarding } from './views/onboarding.js';
import { renderPlanning } from './views/planning.js';
import { renderMonth } from './views/month.js';
import { renderDashboard } from './views/dashboard.js';
import { renderReflect } from './views/reflect.js';
import { renderSettings } from './views/settings.js';
import { renderYearlyReflection } from './views/yearlyReflection.js';
import { renderAdmin } from './views/admin.js';
import { getCurrentUser } from './supabase-config.js';
import { tracker } from './visitor-tracker.js';

const appContainer = document.getElementById('app');

const views = {
  auth: renderAuth,
  onboarding: renderOnboarding,
  planning: renderPlanning,
  month: renderMonth,
  dashboard: renderDashboard,
  reflect: renderReflect,
  settings: renderSettings,
  yearlyReflection: renderYearlyReflection,
  admin: renderAdmin,
};

export function navigateTo(viewName) {
  const renderFn = views[viewName];
  if (!renderFn) {
    console.error(`View "${viewName}" not found`);
    return;
  }

  // Track page visit
  tracker.trackPageVisit(viewName);

  // Clear the app container and render the new view
  appContainer.innerHTML = '';
  renderFn(appContainer);

  // Store current view in localStorage for persistence
  localStorage.setItem('currentView', viewName);
}

// Initialize app on load
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🔄 Initializing app...');

  // Check if user is authenticated
  const user = await getCurrentUser();
  console.log('👤 User:', user ? `${user.email} (authenticated)` : 'Not logged in');

  if (user) {
    // User is logged in
    console.log('✅ User is authenticated');
    const savedView = localStorage.getItem('currentView');
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete');

    console.log('📊 Onboarding status:', hasCompletedOnboarding ? 'Complete' : 'Incomplete');
    console.log('📍 Last view:', savedView);

    if (hasCompletedOnboarding) {
      navigateTo(savedView || 'month');
    } else {
      navigateTo('onboarding');
    }
  } else {
    // No user logged in, show auth screen
    console.log('❌ No user, showing auth screen');
    navigateTo('auth');
  }
});

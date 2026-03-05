// Analytics & Tracking Module for Goal Accelerator

/**
 * Track PWA Installation
 * Fired when user installs the PWA
 */
export function trackPWAInstallation() {
  if (window.gtag) {
    // Track the install event
    gtag('event', 'pwa_install', {
      'event_category': 'engagement',
      'event_label': 'PWA Installation',
      'timestamp': new Date().toISOString()
    });

    console.log('📱 PWA Installation tracked');
  }
}

/**
 * Track PWA Before Install Prompt
 * Fired when the "Add to Home Screen" prompt is available
 */
export function trackBeforeInstallPrompt() {
  if (window.gtag) {
    gtag('event', 'pwa_before_install_prompt', {
      'event_category': 'engagement',
      'event_label': 'Install Prompt Shown',
      'timestamp': new Date().toISOString()
    });

    console.log('📣 Install Prompt shown');
  }
}

/**
 * Track Page View (Custom)
 * Track specific page views in the SPA
 */
export function trackPageView(pageName, pageTitle) {
  if (window.gtag) {
    gtag('event', 'page_view', {
      'page_path': `/${pageName}`,
      'page_title': pageTitle || pageName,
      'timestamp': new Date().toISOString()
    });

    console.log(`📊 Page view tracked: ${pageName}`);
  }
}

/**
 * Track User Action
 * Track specific actions (signup, goal creation, etc.)
 */
export function trackEvent(eventName, eventData = {}) {
  if (window.gtag) {
    gtag('event', eventName, {
      ...eventData,
      'timestamp': new Date().toISOString()
    });

    console.log(`✅ Event tracked: ${eventName}`, eventData);
  }
}

/**
 * Track User Sign Up
 */
export function trackSignUp(method = 'email') {
  if (window.gtag) {
    gtag('event', 'sign_up', {
      'method': method,
      'timestamp': new Date().toISOString()
    });

    console.log('👤 Sign up tracked');
  }
}

/**
 * Track Goal Creation
 */
export function trackGoalCreation(goalCount) {
  if (window.gtag) {
    gtag('event', 'goal_created', {
      'event_category': 'goals',
      'goal_count': goalCount,
      'timestamp': new Date().toISOString()
    });

    console.log(`🎯 Goal creation tracked (${goalCount} goals)`);
  }
}

/**
 * Track Onboarding Completion
 */
export function trackOnboardingComplete() {
  if (window.gtag) {
    gtag('event', 'onboarding_complete', {
      'event_category': 'engagement',
      'event_label': 'User Completed Onboarding',
      'timestamp': new Date().toISOString()
    });

    console.log('✅ Onboarding completion tracked');
  }
}

/**
 * Track Daily Habit Completion
 */
export function trackHabitCompletion(habitCount) {
  if (window.gtag) {
    gtag('event', 'habit_completed', {
      'event_category': 'habits',
      'habit_count': habitCount,
      'timestamp': new Date().toISOString()
    });

    console.log(`⚡ Habit completion tracked (${habitCount} habits)`);
  }
}

/**
 * Track Reflection Submission
 */
export function trackReflectionSubmitted(reflectionType) {
  if (window.gtag) {
    gtag('event', 'reflection_submitted', {
      'event_category': 'engagement',
      'reflection_type': reflectionType,
      'timestamp': new Date().toISOString()
    });

    console.log(`📝 ${reflectionType} reflection tracked`);
  }
}

/**
 * Initialize Analytics
 * Call this when app starts
 */
export function initializeAnalytics() {
  console.log('📊 Analytics initialized');

  // Track page view on app load
  trackPageView('app', 'Goal Accelerator');

  // Track PWA installation prompt
  window.addEventListener('beforeinstallprompt', () => {
    trackBeforeInstallPrompt();
  });

  // Track PWA installation
  window.addEventListener('appinstalled', () => {
    trackPWAInstallation();
    localStorage.setItem('pwa_installed', 'true');
  });
}

import { navigateTo } from '../router.js';
import { signOut } from '../supabase-config.js';

export function renderSettings(container) {
  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold mb-2 text-gray-900">Settings & Help</h1>
        <p class="text-gray-600 mb-8">Learn how to use Goal Accelerator and manage your account</p>

        <!-- FAQ Sections -->
        <div class="space-y-4 mb-8">

          <!-- Getting Started -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="getting-started">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🚀</span> Getting Started
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="getting-started" class="faq-content mt-4 space-y-3 text-gray-700">
              <p><strong>What is Goal Accelerator?</strong> A minimalist PWA that helps you define yearly goals, build daily habits, and track your progress.</p>
              <p><strong>How do I start?</strong> Complete the onboarding: Define your success, rate your Wheel of Life, and choose 6 areas to focus on.</p>
              <p><strong>Can I change my goals later?</strong> Currently, you'll need to reset your data and start fresh. We're planning to add goal editing in future updates.</p>
            </div>
          </div>

          <!-- Daily Tracking -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="daily-tracking">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>📅</span> Daily Tracking
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="daily-tracking" class="faq-content mt-4 space-y-3 text-gray-700 hidden">
              <p><strong>How do I track habits?</strong> Open the Month View, check off completed habits each day. Your progress updates in real-time.</p>
              <p><strong>What's a "Golden Day"?</strong> When you complete ALL habits in a single day, it's celebrated as a Golden Day! ✨</p>
              <p><strong>What's "Strength %"?</strong> It shows your completion rate for the month: (days completed ÷ days in month) × 100</p>
              <p><strong>What's a "Streak"?</strong> Your current consecutive days of completing that habit. Keep it going!</p>
            </div>
          </div>

          <!-- UI & Navigation -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="ui-navigation">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🎨</span> UI & Navigation
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="ui-navigation" class="faq-content mt-4 space-y-3 text-gray-700 hidden">
              <p><strong>What do the different button colors mean?</strong></p>
              <ul class="list-disc list-inside space-y-1 ml-2 mb-3">
                <li><strong>Blue buttons:</strong> Primary actions (Save, Next, Continue, Dashboard, Yearly Reflection)</li>
                <li><strong>Gray buttons:</strong> Back/return actions (go back to previous screen)</li>
                <li><strong>Red buttons:</strong> Danger actions (Reset All Data - careful with this!)</li>
              </ul>
              <p><strong>How do I navigate between screens?</strong> Each screen has navigation buttons at the bottom. Use gray buttons to go back and blue buttons to proceed forward.</p>
              <p><strong>Where do I see my monthly reflections summary?</strong> On the Yearly Reflection page, all your monthly reflections appear inline in the Monthly Progress Table's Reflection column, showing wins and challenges.</p>
              <p><strong>How do I access the Yearly Reflection?</strong> Go to Dashboard → Click "📊 Yearly Reflection" button (blue) at the bottom right.</p>
            </div>
          </div>

          <!-- Data & Privacy -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="goals-planning">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🎯</span> Goals & Planning
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="goals-planning" class="faq-content mt-4 space-y-3 text-gray-700 hidden">
              <p><strong>Why only 6 goals?</strong> Maximum 6 goals prevents overwhelm. We recommend focusing deeply on fewer goals rather than spreading thin.</p>
              <p><strong>What's a "Monthly Milestone"?</strong> A specific target for the current month tied to your yearly goal.</p>
              <p><strong>What's a "Daily Habit"?</strong> A small, repeatable action each day that builds toward your goal.</p>
              <p><strong>How do I plan my month?</strong> After onboarding, set your monthly milestones and daily habits on the Planning page.</p>
            </div>
          </div>

          <!-- Reflections -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="reflections">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>💭</span> Reflections (Weekly, Monthly, Yearly)
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="reflections" class="faq-content mt-4 space-y-3 text-gray-700 hidden">
              <p><strong>What are the three types of reflections?</strong></p>
              <ul class="list-disc list-inside space-y-2 ml-2 mb-3">
                <li><strong>Weekly (Days 1-27):</strong> Reflect on what worked, challenges, and insights from the current week</li>
                <li><strong>Monthly (Days 28-31):</strong> Comprehensive review of wins, challenges, and what to improve next month</li>
                <li><strong>Yearly:</strong> Deep reflection on 7 questions + Wheel of Life comparison from start to end of year</li>
              </ul>
              <p><strong>How do weekly reflections work?</strong> Each week, you'll see a reflection prompt on the Month View showing which week you're in. Answering helps you identify patterns and improve.</p>
              <p><strong>What about the Monthly Progress Table?</strong> On the Yearly Reflection page, you can see a table of all 12 months showing Goals completed, Habit Strength %, and Reflection status (✅ or ○) inline.</p>
              <p><strong>What should I include in reflections?</strong> Be honest! What went well? Obstacles? Insights? This data helps you grow and identify patterns.</p>
            </div>
          </div>

          <!-- Dashboard & Metrics -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="dashboard">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>📊</span> Dashboard & Metrics
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="dashboard" class="faq-content mt-4 space-y-3 text-gray-700 hidden">
              <p><strong>What does the Dashboard show?</strong> Your average habit strength, active goals, month progress, detailed goal metrics with milestones and habits, and Wheel of Life scores for each life area.</p>
              <p><strong>What are the goal cards showing?</strong> Each goal displays: title, life area category, your why/motivation, current monthly milestone, daily habit, progress metrics (days done, streak, month day), and a visual strength progress bar.</p>
              <p><strong>What's the Wheel of Life on Dashboard?</strong> 8 color-coded life areas (Health, Relationships, Career, Finance, Growth, Recreation, Family, Spirituality) showing your current score (0-10) for each with visual progress bars.</p>
              <p><strong>How do I see yearly overview?</strong> Click the "📊 Yearly Reflection" button (blue) at the bottom right of the Dashboard to see the full year summary with monthly progress table and 7 reflection questions.</p>
              <p><strong>How do I improve my metrics?</strong> Complete your daily habits to increase Strength %, maintain streaks, and update your Wheel of Life scores as you progress through the year.</p>
            </div>
          </div>

          <!-- Wheel of Life -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="wheel-of-life">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🎡</span> Wheel of Life
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="wheel-of-life" class="faq-content mt-4 space-y-3 text-gray-700 hidden">
              <p><strong>What are the 8 areas?</strong></p>
              <ul class="list-disc list-inside space-y-1 ml-2">
                <li>Health - Physical fitness, nutrition, sleep</li>
                <li>Relationships - Family, friends, romantic</li>
                <li>Career - Work, growth, satisfaction</li>
                <li>Finances - Income, savings, stability</li>
                <li>Personal Growth - Learning, development</li>
                <li>Recreation - Fun, hobbies, relaxation</li>
                <li>Family - Close relationships, quality time</li>
                <li>Spirituality - Purpose, values, connection</li>
              </ul>
              <p><strong>How often should I reassess?</strong> Monthly is ideal. Compare your scores to spot growth areas.</p>
            </div>
          </div>

          <!-- Yearly Reflection -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="yearly-reflection">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🏆</span> Yearly Reflection
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="yearly-reflection" class="faq-content mt-4 space-y-3 text-gray-700 hidden">
              <p><strong>What's the Yearly Reflection page?</strong> Accessible from the Dashboard via the "📊 Yearly Reflection" button, it shows your year-end summary with monthly progress and 7 deep reflection questions.</p>
              <p><strong>What are the 7 reflection questions?</strong></p>
              <ol class="list-decimal list-inside space-y-1 ml-2 mb-3">
                <li>What achievements am I most proud of this year?</li>
                <li>What people/activities added the most energy to my life this year?</li>
                <li>Where did I take risks this year, and where did I hold myself back?</li>
                <li>What did I learn this year, and what did I unlearn?</li>
                <li>Was I playing a game this year with a prize I actually want?</li>
                <li>What got too much of my attention this year, and what didn't get enough?</li>
                <li>What were my best days this year, and how can I create more of them?</li>
              </ol>
              <p><strong>What's the Monthly Progress Table?</strong> A table showing all 12 months (January-December) with Goals completed, Habit Strength %, and Reflection status inline. Quick overview of your year!</p>
              <p><strong>How does Wheel of Life comparison work?</strong> You set your starting scores in January. On the Yearly Reflection page, update your end-of-year scores and see your growth across all 8 life areas with up/down/stable indicators.</p>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="data-privacy">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🔒</span> Data & Privacy
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="data-privacy" class="faq-content mt-4 space-y-3 text-gray-700 hidden">
              <p><strong>Where is my data stored?</strong> Currently, all data is stored locally in your browser (localStorage). It never leaves your device.</p>
              <p><strong>Is my data safe?</strong> Your browser keeps it private. No one else can access it unless they use your device.</p>
              <p><strong>What happens if I clear my browser?</strong> Your data will be deleted. Be careful with "Clear browsing data"! Always reset properly via Settings if starting fresh.</p>
              <p><strong>What about cloud backup?</strong> Coming soon! We're planning to add Supabase integration for cloud sync, authentication, and multi-device access.</p>
              <p><strong>Can I export my data?</strong> Not yet, but it's on our roadmap!</p>
            </div>
          </div>

          <!-- Tips & Best Practices -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="tips">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>💡</span> Tips & Best Practices
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="tips" class="faq-content mt-4 space-y-3 text-gray-700 hidden">
              <p><strong>✅ Make daily habits tiny:</strong> Easier to complete = higher streak = better momentum</p>
              <p><strong>✅ Set realistic monthly milestones:</strong> Ambitious but achievable keeps you motivated</p>
              <p><strong>✅ Use the same time each day:</strong> Habit stacking (habit + existing routine) works great</p>
              <p><strong>✅ Reflect weekly:</strong> 5 minutes of reflection = better insights for next week</p>
              <p><strong>✅ Track consistency over perfection:</strong> Missing 1 day is fine. 7 straight wins is the goal!</p>
              <p><strong>✅ Review your Wheel monthly:</strong> Pick 1-2 weak areas to focus on next month</p>
            </div>
          </div>

          <!-- Troubleshooting -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <button class="faq-toggle w-full flex items-center justify-between" data-faq="troubleshooting">
              <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🔧</span> Troubleshooting
              </h2>
              <span class="text-2xl text-gray-500">▼</span>
            </button>
            <div id="troubleshooting" class="faq-content mt-4 space-y-3 text-gray-700 hidden">
              <p><strong>Why do my checkboxes reset?</strong> They don't! Only the current day's habits are shown. Each day is independent.</p>
              <p><strong>Why isn't my data saving?</strong> Check that your browser allows localStorage. Some private/incognito modes disable it.</p>
              <p><strong>How do I start over?</strong> Go to Settings → "Reset All Data" → Confirm. Then you can restart onboarding.</p>
              <p><strong>Is there a mobile app?</strong> Not yet! This is a PWA (Progressive Web App) - works like an app in your browser.</p>
            </div>
          </div>

        </div>

        <!-- Data Management Section -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>⚙️</span> Data Management
          </h2>
          <div class="space-y-3">
            <button
              id="reset-data"
              class="w-full border-2 border-red-500 text-red-600 px-4 py-3 rounded-lg hover:bg-red-50 transition text-left font-medium">
              🔄 Reset All Data (Start Over)
            </button>
            <p class="text-xs text-gray-500">This will permanently delete all your goals, habits, and data. You'll be asked to confirm.</p>
          </div>
        </div>

        <!-- Authentication Section -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🔐</span> Account
          </h2>
          <div class="space-y-3">
            <button
              id="sign-out-btn"
              class="w-full border-2 border-orange-500 text-orange-600 px-4 py-3 rounded-lg hover:bg-orange-50 transition text-left font-medium">
              🚪 Sign Out
            </button>
            <p class="text-xs text-gray-500">You'll be taken back to the login screen. Your data is safe in the cloud.</p>
          </div>
        </div>

        <!-- Support & Ko-fi Section -->
        <div class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 shadow-sm border-2 border-orange-300 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>☕</span> Support Goal Accelerator
          </h2>
          <p class="text-gray-700 mb-4">Love Goal Accelerator? Help support development and keep it free for everyone!</p>
          <a
            href="https://ko-fi.com/ntoweett"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-medium transition transform hover:scale-105">
            ☕ Buy Me a Coffee
          </a>
          <p class="text-xs text-gray-600 mt-3">Your support helps me continue building and improving Goal Accelerator!</p>
        </div>

        <!-- Admin Analytics -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📊</span> Analytics & Admin
          </h2>
          <button
            id="admin-btn"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition text-left font-medium">
            📈 View Visitor Analytics Dashboard
          </button>
          <p class="text-xs text-gray-500 mt-3">Simple, privacy-friendly visitor tracking with anonymous IDs (No PII)</p>
        </div>

        <!-- Navigation -->
        <div class="flex gap-3">
          <button
            id="back-btn"
            class="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-medium">
            ← Back to Month View
          </button>
        </div>
      </div>
    </div>
  `;

  // Toggle FAQ sections
  document.querySelectorAll('.faq-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const faqId = button.dataset.faq;
      const content = document.getElementById(faqId);
      const icon = button.querySelector('span:last-child');

      content.classList.toggle('hidden');
      icon.textContent = content.classList.contains('hidden') ? '▶' : '▼';
    });
  });

  document.getElementById('reset-data').addEventListener('click', () => {
    if (confirm('⚠️  Are you sure? This will permanently delete ALL your data.\n\nYou cannot undo this action.')) {
      if (confirm('Last chance to confirm: Delete everything?')) {
        localStorage.clear();
        window.location.reload();
      }
    }
  });

  document.getElementById('sign-out-btn').addEventListener('click', async () => {
    const result = await signOut();
    if (result.success) {
      localStorage.clear();
      navigateTo('auth');
    } else {
      alert('Sign out failed: ' + result.error);
    }
  });

  document.getElementById('back-btn').addEventListener('click', () => {
    navigateTo('month');
  });

  document.getElementById('admin-btn').addEventListener('click', () => {
    navigateTo('admin');
  });
}

import { navigateTo } from '../router.js';
import { getColorForArea } from '../constants.js';

let planningData = {
  goals: [],
  monthlyGoals: {},
  dailyHabits: {},
};

// Get current month name
function getCurrentMonth() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return months[new Date().getMonth()];
}

// Load data from localStorage
function loadPlanningData() {
  planningData.goals = JSON.parse(localStorage.getItem('yearlyGoals') || '[]');
  planningData.monthlyGoals = JSON.parse(localStorage.getItem('monthlyGoals') || '{}');
  planningData.dailyHabits = JSON.parse(localStorage.getItem('dailyHabits') || '{}');
}

export function renderPlanning(container) {
  loadPlanningData();

  const currentMonth = getCurrentMonth();
  let cardsHTML = '';

  planningData.goals.forEach((goal, index) => {
    const monthlyGoal = planningData.monthlyGoals[`goal-${index}`] || '';
    const dailyHabit = planningData.dailyHabits[`goal-${index}`] || '';
    const colors = getColorForArea(goal.area || goal.category);

    cardsHTML += `
      <div class="${colors.bg} border-2 ${colors.border} rounded-lg p-6 shadow-sm">
        <!-- Goal Header - Clearly Labeled -->
        <div class="mb-6 pb-4 border-b-2 ${colors.border}">
          <div class="text-xs font-bold ${colors.text} uppercase tracking-widest">📍 ${goal.area || goal.category}</div>
          <h3 class="text-xl font-bold text-gray-900 mt-2">${goal.title}</h3>
          ${goal.why ? `<p class="text-sm text-gray-600 mt-2 italic">"${goal.why}"</p>` : ''}
        </div>

        <div class="space-y-4">
          <!-- Monthly Milestone Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">📅 ${currentMonth} Milestone</label>
            <input
              type="text"
              placeholder="What do you want to achieve this month?"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 monthly-milestone"
              value="${monthlyGoal}"
              data-goal-id="goal-${index}">
          </div>

          <!-- Daily Habit Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">⚡ Daily Habit</label>
            <input
              type="text"
              placeholder="What's your daily action?"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 daily-habit"
              value="${dailyHabit}"
              data-goal-id="goal-${index}">
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-4xl font-bold mb-2">Plan Your Month</h1>
      <p class="text-gray-600 mb-8">${currentMonth} - Set milestones and daily habits for each goal</p>

      <!-- Goals Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        ${cardsHTML}
      </div>

      <!-- Navigation -->
      <div class="flex gap-3 mt-8">
        <button
          id="back-to-onboarding"
          class="flex-1 bg-gray-300 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-400 transition font-medium">
          ← Back
        </button>
        <button
          id="continue-to-month"
          class="flex-1 bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
          Start Tracking →
        </button>
      </div>
    </div>
  `;

  // Add event listeners for inputs - REAL-TIME saving
  document.querySelectorAll('.monthly-milestone').forEach((input) => {
    // Save on 'input' event (real-time as user types)
    input.addEventListener('input', (e) => {
      const goalId = e.target.dataset.goalId;
      planningData.monthlyGoals[goalId] = e.target.value;
      localStorage.setItem('monthlyGoals', JSON.stringify(planningData.monthlyGoals));
      console.log(`✅ Saved milestone for ${goalId}:`, e.target.value);
    });
  });

  document.querySelectorAll('.daily-habit').forEach((input) => {
    // Save on 'input' event (real-time as user types)
    input.addEventListener('input', (e) => {
      const goalId = e.target.dataset.goalId;
      planningData.dailyHabits[goalId] = e.target.value;
      localStorage.setItem('dailyHabits', JSON.stringify(planningData.dailyHabits));
      console.log(`✅ Saved habit for ${goalId}:`, e.target.value);
    });
  });

  document.getElementById('back-to-onboarding').addEventListener('click', () => {
    navigateTo('onboarding');
  });

  document.getElementById('continue-to-month').addEventListener('click', () => {
    navigateTo('month');
  });
}

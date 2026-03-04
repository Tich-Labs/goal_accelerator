import { navigateTo } from '../router.js';
import { getColorForArea } from '../constants.js';

export function renderDashboard(container) {
  const goals = JSON.parse(localStorage.getItem('yearlyGoals') || '[]');
  const wheelOfLife = JSON.parse(localStorage.getItem('wheelOfLife') || '{}');
  const habitLogs = JSON.parse(localStorage.getItem('habitLogs') || '{}');
  const monthlyGoals = JSON.parse(localStorage.getItem('monthlyGoals') || '{}');
  const dailyHabits = JSON.parse(localStorage.getItem('dailyHabits') || '{}');
  const successDefinition = localStorage.getItem('successDefinition') || '';

  // ...existing code...
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentDay = today.getDate();

  let totalStrength = 0;
  let habitCount = goals.length;

  // Calculate strength per goal
  const goalStrengths = {};
  Object.entries(habitLogs).forEach(([habitId, logs]) => {
    const completedDays = Object.values(logs).filter(v => v === true).length;
    const strength = Math.round((completedDays / daysInMonth) * 100);
    const goalIndex = parseInt(habitId.split('-')[1]);
    goalStrengths[goalIndex] = strength;
    totalStrength += strength;
  });

  const avgStrength = habitCount > 0 ? Math.round(totalStrength / habitCount) : 0;

  // Build detailed goals cards
  let goalsHTML = '';
  goals.forEach((goal, index) => {
    const goalTitle = goal.title || 'Unnamed Goal';
    const goalArea = goal.area || goal.category || '';
    const goalWhy = goal.why || '';
    const colors = getColorForArea(goalArea);
    const strength = goalStrengths[index] || 0;
    const monthlyGoal = monthlyGoals[`goal-${index}`] || '';
    const dailyHabit = dailyHabits[`goal-${index}`] || '';
    const habitId = `habit-${index}`;
    const habitLog = habitLogs[habitId] || {};
    const completedDays = Object.values(habitLog).filter(v => v === true).length;

    // Calculate streak
    let streak = 0;
    let date = new Date(today);
    while (true) {
      const dateKey = date.toISOString().split('T')[0];
      if (habitLog[dateKey]) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }

    goalsHTML += `
      <div class="${colors.bg} border-l-4 ${colors.border} rounded-lg p-6 shadow-sm">
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-grow">
            <h3 class="font-bold text-lg ${colors.text}">${goalTitle}</h3>
            <p class="text-xs font-semibold uppercase tracking-wide ${colors.text} mt-1">${goalArea}</p>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-gray-900">${strength}%</div>
            <p class="text-xs text-gray-500">Strength</p>
          </div>
        </div>

        <!-- Why section -->
        ${goalWhy ? `
          <div class="mb-4 pb-4 border-b ${colors.border}">
            <p class="text-sm text-gray-700 italic">"${goalWhy}"</p>
          </div>
        ` : ''}

        <!-- Monthly Milestone -->
        ${monthlyGoal ? `
          <div class="mb-4 p-3 bg-white rounded border ${colors.border}">
            <p class="text-xs font-semibold text-gray-600 uppercase">March Milestone</p>
            <p class="text-sm font-medium text-gray-900 mt-1">${monthlyGoal}</p>
          </div>
        ` : ''}

        <!-- Daily Habit -->
        ${dailyHabit ? `
          <div class="mb-4 p-3 bg-white rounded border ${colors.border}">
            <p class="text-xs font-semibold text-gray-600 uppercase">Daily Habit</p>
            <p class="text-sm font-medium text-gray-900 mt-1">${dailyHabit}</p>
          </div>
        ` : ''}

        <!-- Progress Metrics -->
        <div class="grid grid-cols-3 gap-3 text-center">
          <div class="p-3 bg-white rounded">
            <p class="text-2xl font-bold text-gray-900">${completedDays}</p>
            <p class="text-xs text-gray-600">Days Done</p>
          </div>
          <div class="p-3 bg-white rounded">
            <p class="text-2xl font-bold text-gray-900">${streak}</p>
            <p class="text-xs text-gray-600">Streak</p>
          </div>
          <div class="p-3 bg-white rounded">
            <p class="text-2xl font-bold text-gray-900">${currentDay}</p>
            <p class="text-xs text-gray-600">Month Day</p>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-4">
          <div class="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>${completedDays}/${daysInMonth} days</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div class="${colors.accent} h-3 rounded-full transition-all duration-300" style="width: ${strength}%"></div>
          </div>
        </div>
      </div>
    `;
  });

  // Wheel of Life with colors and comparison
  let wheelHTML = '';
  const categories = ['Health', 'Relationships', 'Career', 'Finances', 'Personal Growth', 'Recreation', 'Family', 'Spirituality'];
  categories.forEach((cat) => {
    const score = wheelOfLife[cat] || 0;
    const colors = getColorForArea(cat);
    wheelHTML += `
      <div class="${colors.light} border-2 ${colors.border} rounded-lg p-4 text-center">
        <div class="text-3xl font-bold ${colors.text}">${score}</div>
        <p class="text-xs font-semibold text-gray-700 mt-2">${cat}</p>
        <div class="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div class="${colors.accent} h-2 rounded-full" style="width: ${(score / 10) * 100}%"></div>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div class="max-w-4xl mx-auto">

        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p class="text-gray-600">Track your progress across all goals and life areas</p>
        </div>

        <!-- Your Success Definition -->
        ${successDefinition ? `
          <div class="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 rounded-lg p-6 shadow-sm">
            <h2 class="text-lg font-bold text-gray-900 mb-2">✨ Your Definition of Success</h2>
            <p class="text-gray-700 italic">"${successDefinition}"</p>
          </div>
        ` : ''}

        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p class="text-gray-600 text-sm font-medium">Avg Habit Strength</p>
            <p class="text-4xl font-bold text-blue-600 mt-2">${avgStrength}%</p>
            <div class="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: ${avgStrength}%"></div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p class="text-gray-600 text-sm font-medium">Active Goals</p>
            <p class="text-4xl font-bold text-green-600 mt-2">${goals.length}</p>
            <p class="text-xs text-gray-500 mt-3">Out of 6 selected areas</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p class="text-gray-600 text-sm font-medium">Month Progress</p>
            <p class="text-4xl font-bold text-amber-600 mt-2">${currentDay}/${daysInMonth}</p>
            <p class="text-xs text-gray-500 mt-3">Days into March</p>
          </div>
        </div>

        <!-- Detailed Goals Section -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span> Your Goals
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            ${goalsHTML || '<p class="text-gray-600 col-span-full">No goals yet. Complete onboarding to add goals.</p>'}
          </div>
        </div>

        <!-- Wheel of Life Summary -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎡</span> Wheel of Life
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${wheelHTML}
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex gap-3 mt-8">
          <button
            id="back-to-month"
            class="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-medium">
            ← Back to Month View
          </button>
          <button
            id="yearly-reflection-btn"
            class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
            📊 Yearly Reflection
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('back-to-month').addEventListener('click', () => {
    navigateTo('month');
  });

  document.getElementById('yearly-reflection-btn').addEventListener('click', () => {
    navigateTo('yearlyReflection');
  });
}

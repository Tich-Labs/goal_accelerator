import { navigateTo } from '../router.js';
import { getColorForArea } from '../constants.js';

let monthData = {
  goals: [],
  habits: [],
  habitLogs: {},
};

// Load data from localStorage
function loadMonthData() {
  const goals = JSON.parse(localStorage.getItem('yearlyGoals') || '[]');
  monthData.goals = goals;

  // Initialize habits for current month (one habit per goal - up to 8)
  if (localStorage.getItem('monthHabits')) {
    monthData.habits = JSON.parse(localStorage.getItem('monthHabits'));
  } else {
    monthData.habits = goals.slice(0, 8).map((goal, index) => ({
      id: `habit-${index}`,
      goalId: index,
      title: `${goal.title} - Daily Action`,
      completed: false,
    }));
  }

  // Load habit logs (completions)
  if (localStorage.getItem('habitLogs')) {
    monthData.habitLogs = JSON.parse(localStorage.getItem('habitLogs'));
  }
}

// Calculate habit metrics
function calculateStrength(habitId) {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const logsForHabit = monthData.habitLogs[habitId] || {};

  const completedDays = Object.values(logsForHabit).filter(v => v === true).length;
  return Math.round((completedDays / daysInMonth) * 100);
}

// Calculate streak
function calculateStreak(habitId) {
  const logsForHabit = monthData.habitLogs[habitId] || {};
  const today = new Date();
  let streak = 0;
  let date = new Date(today);

  while (true) {
    const dateKey = date.toISOString().split('T')[0];
    if (logsForHabit[dateKey]) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// Check if today is a golden day (all habits completed)
function isGoldenDay() {
  const today = new Date().toISOString().split('T')[0];
  return monthData.habits.every(habit => {
    const logsForHabit = monthData.habitLogs[habit.id] || {};
    return logsForHabit[today] === true;
  });
}

export function renderMonth(container) {
  loadMonthData();

  const today = new Date();
  const todayDateKey = today.toISOString().split('T')[0];
  const dayName = today.toLocaleString('default', { weekday: 'long' });
  const formattedDate = today.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });

  let habitsHTML = '';
  let completedCount = 0;
  let totalHabits = monthData.habits.length;

  monthData.habits.forEach((habit, index) => {
    const strength = calculateStrength(habit.id);
    const streak = calculateStreak(habit.id);
    const logsForHabit = monthData.habitLogs[habit.id] || {};
    const completedToday = logsForHabit[todayDateKey] === true;
    const goal = monthData.goals[index] || {};
    const area = goal.area || goal.category || '';
    const colors = getColorForArea(area);

    if (completedToday) completedCount++;

    habitsHTML += `
      <div class="${completedToday ? colors.light : 'bg-white'} border-l-4 ${completedToday ? colors.border : 'border-gray-300'} rounded-lg p-5 mb-4 habit-card transition transform hover:shadow-md" data-habit-id="${habit.id}">
        <div class="flex items-center justify-between gap-4">
          <!-- Checkbox -->
          <label class="flex-shrink-0 cursor-pointer">
            <input
              type="checkbox"
              class="habit-checkbox w-7 h-7 rounded-full accent-blue-500 cursor-pointer"
              ${completedToday ? 'checked' : ''}
              data-habit-id="${habit.id}">
          </label>

          <!-- Habit Details -->
          <div class="flex-grow">
            <h3 class="text-base font-semibold text-gray-900">${habit.title}</h3>
            ${area ? `<p class="text-xs ${colors.text} font-semibold mt-1 uppercase tracking-wide">${area}</p>` : ''}
          </div>

          <!-- Status Indicator -->
          <div class="flex-shrink-0 text-right">
            ${completedToday ? `
              <div class="flex flex-col items-center">
                <span class="text-2xl">✅</span>
                <span class="text-xs text-green-600 font-semibold">Done</span>
              </div>
            ` : `
              <div class="flex flex-col items-center">
                <span class="text-2xl">○</span>
                <span class="text-xs text-gray-500">Pending</span>
              </div>
            `}
          </div>
        </div>

        <!-- Progress Info -->
        <div class="mt-3 pt-3 border-t ${completedToday ? colors.border : 'border-gray-200'} flex items-center justify-between text-xs">
          <div class="flex gap-4">
            <span class="text-gray-600">📊 <strong>${strength}%</strong> strength</span>
            <span class="text-gray-600">🔥 <strong>${streak}</strong> day streak</span>
          </div>
          <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="${colors.accent} h-2 rounded-full" style="width: ${strength}%"></div>
          </div>
        </div>
      </div>
    `;
  });

  // Calculate golden day
  const isGoldenDay = completedCount === totalHabits && totalHabits > 0;

  // Determine current week (1-4) and if end of month
  const dayOfMonth = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentWeek = Math.ceil(dayOfMonth / 7);
  const isEndOfMonth = dayOfMonth >= daysInMonth - 3; // Last 3 days show monthly reflection

  // Load weekly and monthly reflections
  const weeklyReflections = JSON.parse(localStorage.getItem('weeklyReflections') || '{}');
  const monthlyReflection = JSON.parse(localStorage.getItem('monthlyReflection') || '{}');

  // Build reflection section
  let reflectionHTML = '';
  if (isEndOfMonth) {
    // Show monthly reflection at end of month
    reflectionHTML = `
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>📊</span> Monthly Reflection
          </h2>
          <button id="toggle-reflection" class="text-2xl text-gray-500 hover:text-gray-700">▼</button>
        </div>

        <div id="reflection-content" class="space-y-4">
          <!-- Overall Progress -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">How was your month overall?</label>
            <textarea
              id="reflection-overall"
              placeholder="Reflect on your overall progress this month..."
              class="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >${monthlyReflection.overall || ''}</textarea>
          </div>

          <!-- Wins -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">What were your biggest wins?</label>
            <textarea
              id="reflection-wins"
              placeholder="What achievements are you proud of?"
              class="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >${monthlyReflection.wins || ''}</textarea>
          </div>

          <!-- Challenges -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">What were the main challenges?</label>
            <textarea
              id="reflection-challenges"
              placeholder="What made things difficult?"
              class="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >${monthlyReflection.challenges || ''}</textarea>
          </div>

          <!-- Next Month -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">What will you do differently next month?</label>
            <textarea
              id="reflection-next"
              placeholder="Your plan for improvement..."
              class="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >${monthlyReflection.next || ''}</textarea>
          </div>

          <button
            id="save-reflection"
            class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
            Save Monthly Reflection
          </button>
        </div>
      </div>
    `;
  } else {
    // Show weekly reflection
    const currentWeekStart = (currentWeek - 1) * 7 + 1;
    const currentWeekEnd = Math.min(currentWeek * 7, daysInMonth);
    const weeklyKey = `week-${currentWeek}`;
    const weekReflection = weeklyReflections[weeklyKey] || {};

    // Build previous weeks summary
    let previousWeeksHTML = '';
    for (let i = 1; i < currentWeek; i++) {
      const weekData = weeklyReflections[`week-${i}`];
      previousWeeksHTML += `
        <div class="p-3 bg-white rounded-lg border border-gray-300">
          <p class="font-semibold text-sm text-gray-900">Week ${i}</p>
          <p class="text-xs text-gray-600 mt-2">${weekData ? '✅ Completed' : '⭕ No reflection yet'}</p>
        </div>
      `;
    }

    reflectionHTML = `
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>📅</span> Week ${currentWeek} Reflection (Mar ${currentWeekStart}-${currentWeekEnd})
          </h2>
          <button id="toggle-reflection" class="text-2xl text-gray-500 hover:text-gray-700">▼</button>
        </div>

        <div id="reflection-content" class="space-y-4">
          <!-- Week Summary -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">How was this week?</label>
            <textarea
              id="reflection-week"
              placeholder="How did this week go? What stood out?"
              class="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >${weekReflection.summary || ''}</textarea>
          </div>

          <!-- What Worked -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">What worked well this week?</label>
            <textarea
              id="reflection-worked"
              placeholder="What habits or actions helped?"
              class="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >${weekReflection.worked || ''}</textarea>
          </div>

          <!-- Challenges -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">What was challenging?</label>
            <textarea
              id="reflection-challenges"
              placeholder="Where did you struggle?"
              class="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >${weekReflection.challenges || ''}</textarea>
          </div>

          <button
            id="save-reflection"
            class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
            Save Week ${currentWeek} Reflection
          </button>
        </div>
      </div>

      <!-- Previous Weeks Summary -->
      ${currentWeek > 1 ? `
        <div class="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
          <h3 class="font-bold text-gray-900 mb-4">📚 Previous Weeks</h3>
          <div class="grid gap-3" style="grid-template-columns: repeat(${currentWeek - 1}, minmax(0, 1fr));">
            ${previousWeeksHTML}
          </div>
        </div>
      ` : ''}
    `;
  }

  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div class="max-w-2xl mx-auto">

        <!-- Header -->
        <div class="mb-8">
          <div class="text-center mb-6">
            <p class="text-sm text-gray-600 uppercase tracking-widest">Today</p>
            <h1 class="text-4xl font-bold text-gray-900 mt-1">${dayName}</h1>
            <p class="text-gray-600 mt-2">${formattedDate}</p>
          </div>

          <!-- Progress Summary -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm mb-1">Daily Progress</p>
                <p class="text-3xl font-bold text-gray-900">${completedCount}/${totalHabits}</p>
              </div>
              <div class="text-right">
                <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <div class="text-center">
                    <p class="text-3xl font-bold text-blue-600">${totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0}%</p>
                    <p class="text-xs text-gray-600 mt-1">Complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Golden Day Celebration -->
        ${isGoldenDay ? `
          <div class="mb-8 bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400 rounded-xl p-6 text-center shadow-lg">
            <p class="text-5xl mb-2">✨</p>
            <h2 class="text-2xl font-bold text-yellow-900">Golden Day!</h2>
            <p class="text-yellow-800 mt-2">You completed all your habits today!</p>
          </div>
        ` : ''}

        <!-- Habits Section -->
        <div class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📋</span> Today's Habits
          </h2>
          <div>
            ${habitsHTML}
          </div>
        </div>

        <!-- Weekly/Monthly Reflection Section -->
        ${reflectionHTML}

        <!-- Navigation -->
        <div class="mt-8 flex gap-3">
          <button
            id="view-dashboard"
            class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
            📊 Dashboard
          </button>
          <button
            id="settings"
            class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
            ⚙️ Settings
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners
  document.querySelectorAll('.habit-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const habitId = e.target.dataset.habitId;
      const isChecked = e.target.checked;

      if (!monthData.habitLogs[habitId]) {
        monthData.habitLogs[habitId] = {};
      }

      monthData.habitLogs[habitId][todayDateKey] = isChecked;

      // Save to localStorage
      localStorage.setItem('habitLogs', JSON.stringify(monthData.habitLogs));

      // Re-render to update UI
      renderMonth(container);
    });
  });

  // Reflection toggle
  document.getElementById('toggle-reflection').addEventListener('click', () => {
    const content = document.getElementById('reflection-content');
    const toggle = document.getElementById('toggle-reflection');

    if (content.style.display === 'none') {
      content.style.display = 'block';
      toggle.textContent = '▼';
    } else {
      content.style.display = 'none';
      toggle.textContent = '▶';
    }
  });

  // Save reflection
  document.getElementById('save-reflection').addEventListener('click', () => {
    const dayOfMonth = today.getDate();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const currentWeek = Math.ceil(dayOfMonth / 7);
    const isEndOfMonth = dayOfMonth >= daysInMonth - 3;

    if (isEndOfMonth) {
      // Save monthly reflection
      const monthlyReflection = {
        overall: document.getElementById('reflection-overall').value,
        wins: document.getElementById('reflection-wins').value,
        challenges: document.getElementById('reflection-challenges').value,
        next: document.getElementById('reflection-next').value,
        date: new Date().toISOString(),
      };
      localStorage.setItem('monthlyReflection', JSON.stringify(monthlyReflection));
    } else {
      // Save weekly reflection
      const weeklyReflections = JSON.parse(localStorage.getItem('weeklyReflections') || '{}');
      weeklyReflections[`week-${currentWeek}`] = {
        summary: document.getElementById('reflection-week').value,
        worked: document.getElementById('reflection-worked').value,
        challenges: document.getElementById('reflection-challenges').value,
        date: new Date().toISOString(),
      };
      localStorage.setItem('weeklyReflections', JSON.stringify(weeklyReflections));
    }

    // Show success message
    const button = document.getElementById('save-reflection');
    const originalText = button.textContent;
    button.textContent = '✅ Saved!';
    button.classList.add('bg-green-600');
    button.classList.remove('bg-blue-600');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('bg-green-600');
      button.classList.add('bg-blue-600');
    }, 2000);
  });

  document.getElementById('view-dashboard').addEventListener('click', () => {
    navigateTo('dashboard');
  });

  document.getElementById('settings').addEventListener('click', () => {
    navigateTo('settings');
  });
}

import { navigateTo } from '../router.js';
import { getColorForArea } from '../constants.js';

export function renderYearlyReflection(container) {
  const yearlyReflection = JSON.parse(localStorage.getItem('yearlyReflection') || '{}');
  const wheelOfLife = JSON.parse(localStorage.getItem('wheelOfLife') || '{}');
  const wheelOfLifeEndYear = JSON.parse(localStorage.getItem('wheelOfLifeEndYear') || '{}');
  const goals = JSON.parse(localStorage.getItem('yearlyGoals') || '[]');
  const habitLogs = JSON.parse(localStorage.getItem('habitLogs') || '{}');

  // Calculate yearly stats
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const daysInYear = (today.getFullYear() % 4 === 0 && today.getFullYear() % 100 !== 0) || today.getFullYear() % 400 === 0 ? 366 : 365;

  let totalStrength = 0;
  let habitCount = goals.length;

  Object.values(habitLogs).forEach((logs) => {
    const completedDays = Object.values(logs).filter(v => v === true).length;
    totalStrength += Math.round((completedDays / daysInYear) * 100);
  });

  const avgStrength = habitCount > 0 ? Math.round(totalStrength / habitCount) : 0;

  // Calculate monthly stats
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthAbbrev = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const monthlyReflections = JSON.parse(localStorage.getItem('monthlyReflections') || '{}');
  const weeklyReflections = JSON.parse(localStorage.getItem('weeklyReflections') || '{}');

  // Build table rows
  let tableRowsHTML = '';

  months.forEach((month, monthIndex) => {
    // Calculate monthly habit strength for this month
    let monthlyDaysCompleted = 0;
    let monthlyDaysInMonth = 0;

    Object.values(habitLogs).forEach((logs) => {
      const year = new Date().getFullYear();
      const daysInThisMonth = new Date(year, monthIndex + 1, 0).getDate();
      monthlyDaysInMonth += daysInThisMonth;

      for (let day = 1; day <= daysInThisMonth; day++) {
        const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (logs[dateStr] === true) {
          monthlyDaysCompleted++;
        }
      }
    });

    const monthlyStrength = monthlyDaysInMonth > 0 ? Math.round((monthlyDaysCompleted / monthlyDaysInMonth) * 100) : 0;
    const monthReflection = monthlyReflections[`month-${monthIndex}`];

    // Build reflection text for the cell
    let reflectionText = 'No reflection';
    if (monthReflection) {
      const wins = monthReflection.wins ? monthReflection.wins.substring(0, 50) + (monthReflection.wins.length > 50 ? '...' : '') : '';
      const challenges = monthReflection.challenges ? monthReflection.challenges.substring(0, 50) + (monthReflection.challenges.length > 50 ? '...' : '') : '';
      reflectionText = `${wins ? '✅ ' + wins : ''}${wins && challenges ? ' | ' : ''}${challenges ? '⚠️ ' + challenges : ''}`;
    }

    // Build table row
    tableRowsHTML += `
      <tr class="border-b border-gray-200 hover:bg-gray-50 transition">
        <td class="px-4 py-3 font-semibold text-gray-900">${month}</td>
        <td class="px-4 py-3 text-center">
          <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">0 🏆</span>
        </td>
        <td class="px-4 py-3 text-center">
          <div class="flex items-center justify-center gap-2">
            <span class="text-lg font-bold text-green-600">${monthlyStrength}%</span>
            <div class="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div class="bg-green-500 h-2 rounded-full" style="width: ${monthlyStrength}%"></div>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-left text-xs">
          <div class="${monthReflection ? 'text-gray-700 bg-blue-50 p-2 rounded' : 'text-gray-400 italic'}" title="${monthReflection ? (monthReflection.wins || '') + ' | ' + (monthReflection.challenges || '') : ''}">
            ${reflectionText}
          </div>
        </td>
      </tr>
    `;
  });

  let monthlyStatsHTML = `
    <!-- Monthly Stats Table -->
    <div class="overflow-x-auto mb-8">
      <table class="w-full border-collapse bg-white rounded-lg shadow-sm">
        <thead>
          <tr class="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <th class="px-4 py-3 text-left font-semibold">Month</th>
            <th class="px-4 py-3 text-center font-semibold">Goals 🏆</th>
            <th class="px-4 py-3 text-center font-semibold">Strength 💪</th>
            <th class="px-4 py-3 text-center font-semibold">Reflection</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHTML}
        </tbody>
      </table>
    </div>
  `;

  // Build wheel comparison
  let wheelComparisonHTML = '';
  const categories = ['Health', 'Relationships', 'Career', 'Finances', 'Personal Growth', 'Recreation', 'Family', 'Spirituality'];
  categories.forEach((cat) => {
    const scoreStart = wheelOfLife[cat] || 0;
    const scoreEnd = wheelOfLifeEndYear[cat] || scoreStart;
    const change = scoreEnd - scoreStart;
    const colors = getColorForArea(cat);

    wheelComparisonHTML += `
      <div class="${colors.light} border-2 ${colors.border} rounded-lg p-4">
        <p class="font-semibold text-gray-900 mb-2">${cat}</p>
        <div class="flex items-center justify-between mb-2">
          <div class="text-center flex-1">
            <p class="text-xs text-gray-600">Start</p>
            <p class="text-2xl font-bold ${colors.text}">${scoreStart}</p>
          </div>
          <div class="px-2">→</div>
          <div class="text-center flex-1">
            <p class="text-xs text-gray-600">End</p>
            <p class="text-2xl font-bold ${colors.text}">${scoreEnd}</p>
          </div>
        </div>
        <div class="text-center">
          <p class="text-sm font-semibold ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'}">
            ${change > 0 ? '↑' : change < 0 ? '↓' : '→'} ${Math.abs(change)}
          </p>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div class="max-w-4xl mx-auto">

        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Yearly Reflection 2026</h1>
          <p class="text-gray-600">Answer these 7 questions to finish the year strong and hit the ground running in 2027.</p>
        </div>

        <!-- Yearly Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p class="text-gray-600 text-sm font-medium">Yearly Goals Completed</p>
            <p class="text-4xl font-bold text-blue-600 mt-2">🏆</p>
            <p class="text-xs text-gray-500 mt-3">Tap to mark goals as complete</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p class="text-gray-600 text-sm font-medium">Overall Habit Strength</p>
            <p class="text-4xl font-bold text-green-600 mt-2">${avgStrength}%</p>
            <div class="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-600 h-2 rounded-full" style="width: ${avgStrength}%"></div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p class="text-gray-600 text-sm font-medium">Days Into Year</p>
            <p class="text-4xl font-bold text-amber-600 mt-2">${dayOfYear}/${daysInYear}</p>
            <p class="text-xs text-gray-500 mt-3">${Math.round((dayOfYear / daysInYear) * 100)}% complete</p>
          </div>
        </div>

        <!-- Monthly Progress Overview Section -->
        <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Monthly Progress Overview</h2>
          <p class="text-gray-600 mb-6">Track your monthly goals, habit strength, and reflections throughout 2026</p>

          ${monthlyStatsHTML}
        </div>

        <!-- Yearly Reflection Questions -->
        <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Reflection Questions</h2>

          <div class="space-y-6">
            <!-- Question 1 -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">1. What achievements am I most proud of this year?</label>
              <textarea
                id="q1"
                placeholder="Share your proudest accomplishments..."
                class="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >${yearlyReflection.q1 || ''}</textarea>
            </div>

            <!-- Question 2 -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">2. What people/activities added the most energy to my life this year?</label>
              <textarea
                id="q2"
                placeholder="Who and what energized you most..."
                class="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >${yearlyReflection.q2 || ''}</textarea>
            </div>

            <!-- Question 3 -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">3. Where did I take risks this year, and where did I hold myself back?</label>
              <textarea
                id="q3"
                placeholder="Reflect on your risks and hesitations..."
                class="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >${yearlyReflection.q3 || ''}</textarea>
            </div>

            <!-- Question 4 -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">4. What did I learn this year, and what did I unlearn?</label>
              <textarea
                id="q4"
                placeholder="What new insights and old beliefs did you let go of?..."
                class="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >${yearlyReflection.q4 || ''}</textarea>
            </div>

            <!-- Question 5 -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">5. Was I playing a game this year with a prize I actually want?</label>
              <textarea
                id="q5"
                placeholder="Reflect on your priorities and goals..."
                class="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >${yearlyReflection.q5 || ''}</textarea>
            </div>

            <!-- Question 6 -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">6. What got too much of my attention this year, and what didn't get enough?</label>
              <textarea
                id="q6"
                placeholder="What was your balance like?..."
                class="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >${yearlyReflection.q6 || ''}</textarea>
            </div>

            <!-- Question 7 -->
            <div>
              <label class="block text-sm font-semibold text-gray-900 mb-3">7. What were my best days this year, and how can I create more of them?</label>
              <textarea
                id="q7"
                placeholder="Describe your best days and the pattern..."
                class="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >${yearlyReflection.q7 || ''}</textarea>
            </div>

            <button
              id="save-yearly-reflection"
              class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg">
              Save Yearly Reflection
            </button>
          </div>
        </div>

        <!-- Wheel of Life: Start vs End of Year -->
        <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Wheel of Life: January → December</h2>
          <p class="text-gray-600 mb-6">Update your end-of-year scores to see your growth across all life areas</p>

          <!-- Edit End-of-Year Scores -->
          <div class="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-4">Update Your End-of-Year Scores (0-10)</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              ${categories.map((cat) => `
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">${cat}</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value="${wheelOfLifeEndYear[cat] || wheelOfLife[cat] || 5}"
                    class="w-full end-year-slider"
                    data-category="${cat}">
                  <div class="text-center mt-1">
                    <span class="text-lg font-bold text-blue-600">${wheelOfLifeEndYear[cat] || wheelOfLife[cat] || 5}</span>
                  </div>
                </div>
              `).join('')}
            </div>
            <button
              id="save-wheel-scores"
              class="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold mt-6">
              Save End-of-Year Scores
            </button>
          </div>

          <!-- Comparison Display -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${wheelComparisonHTML}
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex gap-3">
          <button
            id="back-btn"
            class="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-medium">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  `;

  // Event listeners for reflection questions
  document.getElementById('save-yearly-reflection').addEventListener('click', () => {
    const reflection = {
      q1: document.getElementById('q1').value,
      q2: document.getElementById('q2').value,
      q3: document.getElementById('q3').value,
      q4: document.getElementById('q4').value,
      q5: document.getElementById('q5').value,
      q6: document.getElementById('q6').value,
      q7: document.getElementById('q7').value,
      date: new Date().toISOString(),
    };

    localStorage.setItem('yearlyReflection', JSON.stringify(reflection));

    // Show success message
    const button = document.getElementById('save-yearly-reflection');
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

  // Event listeners for wheel of life sliders
  document.querySelectorAll('.end-year-slider').forEach((slider) => {
    slider.addEventListener('input', (e) => {
      const category = e.target.dataset.category;
      const value = e.target.value;
      e.target.parentElement.querySelector('span').textContent = value;
    });
  });

  document.getElementById('save-wheel-scores').addEventListener('click', () => {
    const wheelScores = {};
    document.querySelectorAll('.end-year-slider').forEach((slider) => {
      const category = slider.dataset.category;
      wheelScores[category] = parseInt(slider.value);
    });

    localStorage.setItem('wheelOfLifeEndYear', JSON.stringify(wheelScores));

    // Show success message
    const button = document.getElementById('save-wheel-scores');
    const originalText = button.textContent;
    button.textContent = '✅ Scores Saved!';
    button.classList.add('bg-green-700');
    button.classList.remove('bg-green-600');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('bg-green-700');
      button.classList.add('bg-green-600');
      window.location.reload(); // Refresh to show updated comparison
    }, 1500);
  });

  document.getElementById('back-btn').addEventListener('click', () => {
    navigateTo('dashboard');
  });
}

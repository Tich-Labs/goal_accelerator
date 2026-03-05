import { navigateTo } from '../router.js';
import { categoryColors, getColorForArea } from '../constants.js';

const wheelCategories = ['Health', 'Relationships', 'Career', 'Finances', 'Personal Growth', 'Recreation', 'Family', 'Spirituality'];

let onboardingState = {
  successDefinition: '',
  wheelOfLife: {},
  selectedAreas: [], // Track which 6 areas user selected
  yearlyGoals: [],
};

// Step 1: Define Success
function renderDefineSuccess(container) {
  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <div class="text-6xl mb-4">🎯</div>
          <h1 class="text-4xl font-bold mb-4 text-gray-900">Welcome to Goal Accelerator</h1>
          <p class="text-lg text-gray-600">Let's define what success means to you this year.</p>
        </div>

        <!-- Success Definition Form -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-xl font-bold text-gray-900 mb-2">Step 1: Define Your Success</h2>
          <p class="text-gray-600 mb-6">What would make 2026 a successful year for you? Be honest and specific.</p>

          <form id="success-form">
            <label class="block text-sm font-medium text-gray-700 mb-3">Your Definition of Success</label>
            <textarea id="success-input" class="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Example: Get healthier, earn more income, spend more time with family, develop a new skill..."></textarea>

            <div class="mt-6 flex justify-end">
              <button
                type="button"
                id="next-to-wheel"
                class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
                Next → (Wheel of Life)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById('next-to-wheel').addEventListener('click', () => {
    const input = document.getElementById('success-input').value.trim();
    if (input) {
      onboardingState.successDefinition = input;
      localStorage.setItem('successDefinition', input);
      renderWheelOfLife(container);
    } else {
      alert('Please define your success before continuing.');
    }
  });

  // Auto-save success definition as user types
  const successInput = document.getElementById('success-input');
  successInput.addEventListener('input', (e) => {
    onboardingState.successDefinition = e.target.value;
    localStorage.setItem('successDefinition', e.target.value);
  });
}

// Step 2: Wheel of Life with visual wheel chart
function renderWheelOfLife(container) {
  let sliderHTML = '';

  wheelCategories.forEach((category, index) => {
    const value = onboardingState.wheelOfLife[category] || 5;
    sliderHTML += `
      <div class="mb-8">
        <div class="flex justify-between mb-3">
          <label class="font-semibold text-gray-700 text-lg">${category}</label>
          <div class="flex items-center gap-2">
            <span class="text-blue-600 font-bold text-2xl" id="value-${index}">${value}</span>
            <span class="text-gray-500">/10</span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value="${value}"
          class="w-full h-3 bg-gradient-to-r from-red-400 to-green-500 rounded-lg appearance-none cursor-pointer slider"
          data-category="${category}"
          data-index="${index}"
          style="accent-color: #3b82f6;">
        <div class="flex justify-between text-xs text-gray-500 mt-2 px-1">
          <span>0</span>
          <span>2</span>
          <span>4</span>
          <span>6</span>
          <span>8</span>
          <span>10</span>
        </div>
      </div>
    `;
  });

  // Generate wheel SVG
  const wheelSVG = generateWheelChart(onboardingState.wheelOfLife);

  container.innerHTML = `
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-3xl font-bold mb-2 text-center">Wheel of Life</h2>
      <p class="text-center text-gray-600 mb-8">Rate each area of your life from 0 (needs work) to 10 (excellent).</p>

      <!-- Wheel Chart at Top -->
      <div class="flex items-center justify-center mb-12">
        ${wheelSVG}
      </div>

      <!-- Sliders Below -->
      <form id="wheel-form" class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        ${sliderHTML}
      </form>

      <div class="mt-8 flex justify-between">
        <button
          type="button"
          id="back-to-success"
          class="bg-gray-300 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-400 transition font-medium">
          Back
        </button>
        <button
          type="button"
          id="next-to-goals"
          class="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
          Next
        </button>
      </div>
    </div>
  `;

  // Add event listeners for sliders
  document.querySelectorAll('input[type="range"]').forEach((slider) => {
    slider.addEventListener('input', (e) => {
      const category = e.target.dataset.category;
      const index = e.target.dataset.index;
      const value = e.target.value;

      onboardingState.wheelOfLife[category] = parseInt(value);
      document.getElementById(`value-${index}`).textContent = value;

      // Update wheel chart
      const newWheelSVG = generateWheelChart(onboardingState.wheelOfLife);
      document.querySelector('svg').replaceWith(createSVGElement(newWheelSVG));
    });
  });

  document.getElementById('back-to-success').addEventListener('click', () => {
    renderDefineSuccess(container);
  });

  document.getElementById('next-to-goals').addEventListener('click', () => {
    // Save wheel of life data to localStorage before moving to next step
    localStorage.setItem('wheelOfLife', JSON.stringify(onboardingState.wheelOfLife));
    console.log('✅ Saved Wheel of Life data');

    // Move to area selection (which is before goals)
    renderAreaSelection(container);
  });
}

// Function to generate wheel chart SVG
function generateWheelChart(wheelData) {
  const size = 300;
  const center = size / 2;
  const maxValue = 10;

  let points = [];
  let labels = [];

  wheelCategories.forEach((category, index) => {
    const angle = (index / wheelCategories.length) * Math.PI * 2 - Math.PI / 2;
    const value = wheelData[category] || 0;
    const radius = (value / maxValue) * (size / 3);

    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);

    points.push({ x, y, category, value });
    labels.push({
      x: center + (size / 2.5) * Math.cos(angle),
      y: center + (size / 2.5) * Math.sin(angle),
      category,
      value
    });
  });

  // Create SVG
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;

  // Draw grid circles
  for (let i = 1; i <= 5; i++) {
    const r = (i / 5) * (size / 3);
    svg += `<circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="#e5e7eb" stroke-width="1"/>`;
  }

  // Draw axes
  wheelCategories.forEach((category, index) => {
    const angle = (index / wheelCategories.length) * Math.PI * 2 - Math.PI / 2;
    const x = center + (size / 3) * Math.cos(angle);
    const y = center + (size / 3) * Math.sin(angle);
    svg += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
  });

  // Draw filled polygon
  let polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  svg += `<polygon points="${polygonPoints}" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" stroke-width="2"/>`;

  // Draw points
  points.forEach(p => {
    svg += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#3b82f6" stroke="white" stroke-width="2"/>`;
  });

  // Draw labels with values
  labels.forEach(label => {
    svg += `<text x="${label.x}" y="${label.y}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1f2937">${label.category.substring(0, 3)}: ${label.value}</text>`;
  });

  svg += '</svg>';
  return svg;
}

function createSVGElement(svgString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  return doc.documentElement;
}

// Step 3: Yearly Goals - Choose 6 areas and set one goal per area
function renderYearlyGoals(container) {
  // If not already selected, show area selection first
  if (onboardingState.selectedAreas.length === 0) {
    return renderAreaSelection(container);
  }

  // Show goal inputs for selected areas only
  let goalsHTML = '';

  onboardingState.selectedAreas.forEach((areaIndex, position) => {
    const area = wheelCategories[areaIndex];
    const goal = onboardingState.yearlyGoals[position] || { title: '', why: '' };
    const colors = getColorForArea(area);

    goalsHTML += `
      <div class="${colors.bg} border-2 ${colors.border} rounded-lg p-6 shadow-sm">
        <h3 class="font-semibold text-lg ${colors.text} mb-4">${area}</h3>

        <div class="space-y-4">
          <!-- Goal Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Your Goal</label>
            <input
              type="text"
              placeholder="What do you want to achieve in ${area.toLowerCase()}?"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style="--tw-ring-color: ${categoryColors[area].hex};"
              value="${goal.title}"
              data-position="${position}">
          </div>

          <!-- Why -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Why is this important?</label>
            <textarea
              placeholder="What does this goal mean to you?"
              class="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style="--tw-ring-color: ${categoryColors[area].hex};"
              data-position="${position}">${goal.why || ''}</textarea>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-3xl font-bold mb-2 text-center">Your Yearly Goals</h2>
      <p class="text-center text-gray-600 mb-8">Set one goal for each of your 6 chosen life areas.</p>

      <!-- Goals Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        ${goalsHTML}
      </div>

      <!-- Navigation -->
      <div class="mt-8 flex justify-between">
        <button
          type="button"
          id="back-to-areas"
          class="bg-gray-300 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-400 transition font-medium">
          ← Change Areas
        </button>
        <button
          type="button"
          id="next-to-planning"
          class="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
          Next →
        </button>
      </div>
    </div>
  `;

  // Add event listeners - REAL-TIME saving
  document.querySelectorAll('.goal-title').forEach((input) => {
    input.addEventListener('input', (e) => {
      const position = parseInt(e.target.dataset.position);
      onboardingState.yearlyGoals[position] = onboardingState.yearlyGoals[position] || {};
      onboardingState.yearlyGoals[position].title = e.target.value;
      // Auto-save to localStorage while typing
      localStorage.setItem('yearlyGoals', JSON.stringify(onboardingState.yearlyGoals));
    });
  });

  document.querySelectorAll('.goal-why').forEach((textarea) => {
    textarea.addEventListener('input', (e) => {
      const position = parseInt(e.target.dataset.position);
      onboardingState.yearlyGoals[position] = onboardingState.yearlyGoals[position] || {};
      onboardingState.yearlyGoals[position].why = e.target.value;
      // Auto-save to localStorage while typing
      localStorage.setItem('yearlyGoals', JSON.stringify(onboardingState.yearlyGoals));
    });
  });

  document.getElementById('back-to-areas').addEventListener('click', () => {
    onboardingState.selectedAreas = [];
    renderYearlyGoals(container);
  });

  document.getElementById('next-to-planning').addEventListener('click', () => {
    // Save onboarding data to localStorage
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('wheelOfLife', JSON.stringify(onboardingState.wheelOfLife));
    localStorage.setItem('selectedAreas', JSON.stringify(onboardingState.selectedAreas));
    localStorage.setItem('yearlyGoals', JSON.stringify(onboardingState.yearlyGoals));

    // Navigate to planning view
    navigateTo('planning');
  });
}

// New: Step 2b - Area Selection
function renderAreaSelection(container) {
  let areasHTML = '';

  wheelCategories.forEach((area, index) => {
    const isSelected = onboardingState.selectedAreas.includes(index);
    const wheelScore = onboardingState.wheelOfLife[area] || 5;
    const colors = getColorForArea(area);

    areasHTML += `
      <div class="area-card cursor-pointer transition transform hover:scale-105 ${isSelected ? colors.bg + ' border-2 ' + colors.border : 'border-2 border-gray-300 bg-white'} rounded-lg p-6" data-index="${index}">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-semibold text-lg text-gray-900">${area}</h3>
            <p class="text-sm text-gray-600 mt-2">Score: <span class="font-bold ${colors.text}">${wheelScore}/10</span></p>
          </div>
          <div class="checkbox w-6 h-6 border-2 rounded ${isSelected ? colors.accent + ' border-' + colors.accent.split('-')[1] : 'border-gray-300'} flex items-center justify-center">
            ${isSelected ? '<span class="text-white font-bold">✓</span>' : ''}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-3xl font-bold mb-2 text-center">Choose Your Focus Areas</h2>
      <p class="text-center text-gray-600 mb-2">Select 6 life areas you want to focus on this year</p>
      <p class="text-center text-gray-500 text-sm mb-8" id="selection-count">Selected: <span id="count">0</span>/6</p>

      <!-- Areas Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        ${areasHTML}
      </div>

      <!-- Navigation -->
      <div class="mt-8 flex justify-between">
        <button
          type="button"
          id="back-to-wheel"
          class="bg-gray-300 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-400 transition font-medium">
          ← Back
        </button>
        <button
          type="button"
          id="continue-to-goals"
          class="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          ${onboardingState.selectedAreas.length !== 6 ? 'disabled' : ''}>
          Next → (${onboardingState.selectedAreas.length}/6)
        </button>
      </div>
    </div>
  `;

  // Add click handlers for area cards
  document.querySelectorAll('.area-card').forEach((card) => {
    card.addEventListener('click', () => {
      const index = parseInt(card.dataset.index);

      if (onboardingState.selectedAreas.includes(index)) {
        // Deselect
        onboardingState.selectedAreas = onboardingState.selectedAreas.filter(i => i !== index);
      } else if (onboardingState.selectedAreas.length < 6) {
        // Select (max 6)
        onboardingState.selectedAreas.push(index);
      }

      // Refresh UI
      renderAreaSelection(container);
    });
  });

  document.getElementById('back-to-wheel').addEventListener('click', () => {
    renderWheelOfLife(container);
  });

  document.getElementById('continue-to-goals').addEventListener('click', () => {
    console.log('Continue to goals clicked. Selected areas:', onboardingState.selectedAreas.length);
    if (onboardingState.selectedAreas.length === 6) {
      // Save selected areas to localStorage BEFORE moving to next step
      localStorage.setItem('selectedAreas', JSON.stringify(onboardingState.selectedAreas));

      // Initialize yearlyGoals array with selected areas
      onboardingState.yearlyGoals = onboardingState.selectedAreas.map(index => ({
        area: wheelCategories[index],
        areaIndex: index,
        title: '',
        why: ''
      }));

      // Save yearlyGoals to localStorage
      localStorage.setItem('yearlyGoals', JSON.stringify(onboardingState.yearlyGoals));

      console.log('Moving to yearly goals...');
      renderYearlyGoals(container);
    } else {
      console.log('Button clicked but only', onboardingState.selectedAreas.length, 'areas selected. Need 6!');
    }
  });
}

export function renderOnboarding(container) {
  renderDefineSuccess(container);
}

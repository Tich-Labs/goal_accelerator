import { navigateTo } from '../router.js';

export function renderReflect(container) {
  container.innerHTML = `
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Monthly Reflection</h1>
      <p class="text-gray-600 mb-8">Take a moment to reflect on this month.</p>

      <form id="reflection-form">
        <div class="mb-6">
          <label class="block font-semibold mb-2">What worked well this month?</label>
          <textarea
            id="worked-well"
            class="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What habits or achievements are you proud of?">
          </textarea>
        </div>

        <div class="mb-6">
          <label class="block font-semibold mb-2">What didn't work?</label>
          <textarea
            id="didnt-work"
            class="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Where did you struggle? What got in the way?">
          </textarea>
        </div>

        <div class="mb-6">
          <label class="block font-semibold mb-2">What can you change next month?</label>
          <textarea
            id="next-change"
            class="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What will you do differently?">
          </textarea>
        </div>

        <div class="flex justify-between mt-8">
          <button
            type="button"
            id="back-btn"
            class="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition">
            Back
          </button>
          <button
            type="submit"
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Save Reflection
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('reflection-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const reflection = {
      workedWell: document.getElementById('worked-well').value,
      didntWork: document.getElementById('didnt-work').value,
      nextChange: document.getElementById('next-change').value,
      date: new Date().toISOString(),
    };

    localStorage.setItem('lastReflection', JSON.stringify(reflection));
    alert('Reflection saved!');
    navigateTo('month');
  });

  document.getElementById('back-btn').addEventListener('click', () => {
    navigateTo('month');
  });
}

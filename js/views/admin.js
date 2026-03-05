import { navigateTo } from '../router.js';
import { tracker } from '../visitor-tracker.js';

export function renderAdmin(container) {
  const summary = tracker.getAnalyticsSummary();
  const exportData = tracker.exportData();

  // Format date
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString();
  };

  // Build visits by page table
  let pageStatsHTML = '';
  Object.entries(summary.visits_by_page).forEach(([page, count]) => {
    pageStatsHTML += `
      <tr class="border-b border-gray-200 hover:bg-gray-50">
        <td class="px-4 py-3 font-medium text-gray-900">${page}</td>
        <td class="px-4 py-3 text-gray-600">${count}</td>
      </tr>
    `;
  });

  // Build recent visitors list
  let visitorsHTML = '';
  if (summary.visitor_list && summary.visitor_list.length > 0) {
    summary.visitor_list.reverse().forEach(visitor => {
      visitorsHTML += `
        <div class="px-4 py-2 bg-gray-50 rounded border border-gray-200 text-sm font-mono text-gray-600">
          ${visitor}
        </div>
      `;
    });
  }

  container.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">📊 Visitor Analytics</h1>
          <p class="text-gray-600">Simple, privacy-friendly visitor tracking (No PII)</p>
        </div>

        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <!-- Unique Visitors -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p class="text-gray-600 text-sm font-medium">Unique Visitors</p>
            <p class="text-4xl font-bold text-blue-600 mt-2">${summary.unique_visitors}</p>
            <p class="text-xs text-gray-500 mt-2">Tracked with anonymous IDs</p>
          </div>

          <!-- Total Page Views -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p class="text-gray-600 text-sm font-medium">Total Page Views</p>
            <p class="text-4xl font-bold text-green-600 mt-2">${summary.total_visits}</p>
            <p class="text-xs text-gray-500 mt-2">All pages combined</p>
          </div>

          <!-- Last Visit -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p class="text-gray-600 text-sm font-medium">Last Visit</p>
            <p class="text-sm font-mono text-gray-900 mt-2">${summary.last_visit ? formatDate(summary.last_visit) : 'No visits yet'}</p>
            <p class="text-xs text-gray-500 mt-2">Most recent activity</p>
          </div>
        </div>

        <!-- Views by Page -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4">📄 Page Views Breakdown</h2>
          ${Object.keys(summary.visits_by_page).length > 0 ? `
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="border-b-2 border-gray-300">
                  <tr>
                    <th class="px-4 py-3 font-semibold text-gray-900">Page</th>
                    <th class="px-4 py-3 font-semibold text-gray-900">Views</th>
                  </tr>
                </thead>
                <tbody>
                  ${pageStatsHTML}
                </tbody>
              </table>
            </div>
          ` : '<p class="text-gray-600">No page views tracked yet</p>'}
        </div>

        <!-- Recent Visitors -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4">👥 Recent Visitor IDs (Last 10)</h2>
          ${summary.visitor_list && summary.visitor_list.length > 0 ? `
            <div class="space-y-2">
              ${visitorsHTML}
            </div>
            <p class="text-xs text-gray-500 mt-4">These are anonymous visitor IDs - no personal data is tracked</p>
          ` : '<p class="text-gray-600">No visitors tracked yet</p>'}
        </div>

        <!-- Privacy Notice -->
        <div class="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8">
          <h3 class="font-bold text-green-900 mb-2">🔒 Privacy Notice</h3>
          <p class="text-green-800 text-sm">
            <strong>No PII (Personally Identifiable Information) is collected:</strong>
          </p>
          <ul class="text-green-800 text-sm mt-3 space-y-1">
            <li>✅ Only anonymous visitor IDs are tracked</li>
            <li>✅ No emails, names, or personal data collected</li>
            <li>✅ No location data or IP logging</li>
            <li>✅ Data stored only in browser localStorage</li>
            <li>✅ Completely GDPR compliant</li>
            <li>✅ Users can clear data anytime</li>
          </ul>
        </div>

        <!-- Data Management -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4">⚙️ Data Management</h2>
          <div class="space-y-3">
            <button
              id="export-data"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition text-left font-medium">
              📥 Export Analytics Data (JSON)
            </button>
            <button
              id="clear-data"
              class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition text-left font-medium">
              🗑️ Clear All Analytics Data
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-3">Export lets you backup data. Clear removes all tracking.</p>
        </div>

        <!-- Current Visitor ID -->
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
          <h3 class="font-bold text-blue-900 mb-2">Your Visitor ID</h3>
          <p class="text-sm font-mono bg-white p-3 rounded border border-blue-200 text-gray-900">${tracker.visitorId}</p>
          <p class="text-xs text-blue-800 mt-3">This ID is unique to your browser and persists across sessions.</p>
        </div>

        <!-- Navigation -->
        <div class="flex gap-3">
          <button
            id="back-btn"
            class="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-medium">
            ← Back
          </button>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  document.getElementById('export-data').addEventListener('click', () => {
    const data = tracker.exportData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `goal-accelerator-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('✅ Analytics data exported');
  });

  document.getElementById('clear-data').addEventListener('click', () => {
    if (confirm('⚠️ Are you sure? This will clear ALL analytics data.\n\nYou cannot undo this action.')) {
      if (confirm('Last chance - really clear all analytics?')) {
        tracker.clearAllData();
        alert('✅ All analytics data cleared');
        location.reload();
      }
    }
  });

  document.getElementById('back-btn').addEventListener('click', () => {
    navigateTo('month');
  });
}

// Simple Anonymous Visitor Tracking (No PII)
// Tracks unique visitor IDs and page access counts

export class VisitorTracker {
  constructor() {
    this.STORAGE_KEY = 'app_visitor_id';
    this.VISITS_KEY = 'visitor_visits';
    this.visitorId = this.getOrCreateVisitorId();
  }

  /**
   * Generate or retrieve visitor ID
   * ID format: UUID-like string (no personal data)
   * Example: "visitor_a7f9e8d3c2b1"
   */
  getOrCreateVisitorId() {
    let id = localStorage.getItem(this.STORAGE_KEY);

    if (!id) {
      // Generate new visitor ID (anonymous, no PII)
      id = `visitor_${Math.random().toString(36).substr(2, 12)}`;
      localStorage.setItem(this.STORAGE_KEY, id);
      console.log(`📊 New visitor tracked: ${id}`);
    }

    return id;
  }

  /**
   * Track a page visit
   * @param {string} pageName - Name of page (e.g., 'month', 'dashboard')
   */
  trackPageVisit(pageName) {
    const visits = this.getAllVisits();
    const timestamp = new Date().toISOString();

    const visit = {
      visitor_id: this.visitorId,
      page: pageName,
      timestamp: timestamp,
    };

    visits.push(visit);

    // Keep only last 1000 visits to avoid storage bloat
    if (visits.length > 1000) {
      visits.shift();
    }

    localStorage.setItem(this.VISITS_KEY, JSON.stringify(visits));
    console.log(`📍 Page visit tracked: ${pageName}`);
  }

  /**
   * Get all visits from localStorage
   */
  getAllVisits() {
    const data = localStorage.getItem(this.VISITS_KEY);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Get analytics summary
   * Returns: unique visitors, total visits, visits by page
   */
  getAnalyticsSummary() {
    const visits = this.getAllVisits();

    if (visits.length === 0) {
      return {
        unique_visitors: 0,
        total_visits: 0,
        visits_by_page: {},
        last_visit: null,
      };
    }

    // Count unique visitors
    const uniqueVisitors = new Set(visits.map(v => v.visitor_id));

    // Count visits by page
    const visitsByPage = {};
    visits.forEach(visit => {
      visitsByPage[visit.page] = (visitsByPage[visit.page] || 0) + 1;
    });

    // Get last visit timestamp
    const lastVisit = visits[visits.length - 1].timestamp;

    return {
      unique_visitors: uniqueVisitors.size,
      total_visits: visits.length,
      visits_by_page: visitsByPage,
      last_visit: lastVisit,
      visitor_list: Array.from(uniqueVisitors).slice(-10), // Last 10 unique visitors
    };
  }

  /**
   * Clear all visitor data
   * (Useful for testing or privacy reset)
   */
  clearAllData() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.VISITS_KEY);
    console.log('🧹 All visitor data cleared');
  }

  /**
   * Export data as JSON (for backup)
   */
  exportData() {
    return {
      visitor_id: this.visitorId,
      all_visits: this.getAllVisits(),
      summary: this.getAnalyticsSummary(),
      export_date: new Date().toISOString(),
    };
  }
}

// Initialize tracker globally
export const tracker = new VisitorTracker();

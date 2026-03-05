# 📊 Simple Visitor Tracking System

## Overview

A **privacy-friendly** visitor analytics system that tracks unique visitors without collecting any PII (Personally Identifiable Information).

---

## 🎯 What It Tracks

✅ **Unique Visitor IDs** - Anonymous identifier per browser
✅ **Total Page Views** - How many times pages are visited
✅ **Views by Page** - Breakdown of visits per page
✅ **Last Visit Time** - When visitors were last active
✅ **Recent Visitors** - Last 10 unique visitor IDs

❌ **What It Does NOT Track:**
- ❌ Names, emails, or personal data
- ❌ IP addresses
- ❌ Location data
- ❌ User behavior beyond page visits
- ❌ Passwords or authentication info

---

## 🔒 Privacy Features

| Feature | Description |
|---------|-------------|
| **Anonymous IDs** | Random identifiers like `visitor_a7f9e8d3c2b1` |
| **Local Storage Only** | Data stays in browser, never sent to servers |
| **No Cloud Sync** | Analytics never leave user's device |
| **User Controlled** | Users can clear data anytime |
| **GDPR Compliant** | No personal data = no GDPR concerns |
| **Transparent** | Users see exactly what's tracked |

---

## 📁 Files Added

### 1. **js/visitor-tracker.js** - Core Tracking Module
Provides the `VisitorTracker` class:
- `getOrCreateVisitorId()` - Gets or creates unique visitor ID
- `trackPageVisit(pageName)` - Logs page visits
- `getAnalyticsSummary()` - Returns analytics data
- `exportData()` - Export analytics as JSON
- `clearAllData()` - Clear all tracking data

### 2. **js/views/admin.js** - Analytics Dashboard
Beautiful admin interface showing:
- Unique visitor count
- Total page views
- Views by page table
- Recent visitor list
- Export & clear buttons
- Privacy notice

### 3. **Updated Files**
- `js/router.js` - Added admin view
- `js/views/settings.js` - Added analytics button + Ko-fi link
- `index.html` - Updated Ko-fi link

---

## 💾 How It Works

### Visitor ID Creation
When a user first visits:
1. Check localStorage for existing visitor ID
2. If none exists, generate new random ID: `visitor_a7f9e8d3c2b1`
3. Store in localStorage - persists across sessions

### Page Visit Tracking
Each page view records:
```javascript
{
  visitor_id: "visitor_a7f9e8d3c2b1",
  page: "month",
  timestamp: "2026-03-05T10:30:00.000Z"
}
```

### Data Storage
- Stored in browser's localStorage
- Key: `visitor_visits`
- Format: JSON array
- Max 1000 entries (prevents bloat)
- User can view and clear anytime

---

## 🎨 Admin Dashboard

Access via: **Settings → View Visitor Analytics Dashboard**

Shows:
- **Unique Visitors** - Purple badge with count
- **Total Page Views** - Green badge with count
- **Last Visit** - Timestamp of most recent activity
- **Page Views Breakdown** - Table showing visits per page
- **Recent Visitors** - List of last 10 visitor IDs
- **Export/Clear Buttons** - Download or reset data

---

## 🔧 Integration

### Automatic Tracking
Already integrated in `router.js`:
- Tracks page views on navigation
- Auto-creates visitor ID on first load

### Manual Tracking
If needed, import and use:
```javascript
import { tracker } from './visitor-tracker.js';

// Track a page visit
tracker.trackPageVisit('custom_page');

// Get analytics
const summary = tracker.getAnalyticsSummary();
console.log(`Unique visitors: ${summary.unique_visitors}`);

// Export data
const data = tracker.exportData();

// Clear all data
tracker.clearAllData();
```

---

## 📊 Example Analytics Output

```json
{
  "unique_visitors": 42,
  "total_visits": 156,
  "visits_by_page": {
    "month": 89,
    "dashboard": 45,
    "reflect": 22
  },
  "last_visit": "2026-03-05T10:30:00.000Z",
  "visitor_list": [
    "visitor_a7f9e8d3c2b1",
    "visitor_f3k8j2m9n4p2",
    "visitor_x9q2w1e3r5t8"
  ]
}
```

---

## ✨ Key Features

✅ **Zero PII** - Only anonymous visitor tracking
✅ **Self-Contained** - Works offline, no backend needed
✅ **User Transparent** - Show exact visitor ID, allow clear
✅ **Export Friendly** - Download data as JSON
✅ **GDPR Compliant** - No personal data collected
✅ **Lightweight** - Minimal code, minimal storage
✅ **Privacy First** - No third-party tracking

---

## 🚀 Usage

### For Users
1. Go to **Settings**
2. Click **"View Visitor Analytics Dashboard"**
3. See your visitor ID and page visits
4. Export data or clear history

### For You (Developer)
1. Check admin dashboard for visitor stats
2. Monitor page popularity
3. Export data for analysis
4. Completely privacy-safe tracking

---

## ⚙️ Configuration

No configuration needed! Everything works out of the box.

Optional: Change max stored visits
```javascript
// In visitor-tracker.js, line ~35
if (visits.length > 1000) {  // Change 1000 to your limit
  visits.shift();
}
```

---

## 🔐 Security Notes

- **No Encryption Needed** - No PII to encrypt
- **No Backend Access** - Data never leaves browser
- **User Owns Data** - Only accessible via admin dashboard
- **Clear Anytime** - Users have full control

---

## 📈 What You Can Learn

From this simple tracking system:
- Which pages are most visited
- How many unique visitors you have
- Visitor retention (repeat visits)
- When visitors are active
- Total engagement metrics

All **without violating privacy**! 🎉

---

## 🎯 Perfect For

✅ Privacy-conscious developers
✅ GDPR compliance requirements
✅ Small projects that don't need complex analytics
✅ Users who prefer local-only data
✅ Transparent analytics

---

## 📞 Need Help?

- **Admin Dashboard:** Settings → Analytics button
- **View Data:** Check "Recent Visitors" section
- **Export Data:** Click "Export Analytics Data (JSON)"
- **Clear Data:** Click "Clear All Analytics Data"

---

**Status:** ✅ Fully implemented and ready to use!

# Goal Accelerator PWA

A minimalist, mobile-first Progressive Web App that helps users define yearly goals, break them into monthly milestones, build daily habits, and reflect consistently.

## 🚀 Quick Start

### Deploy in 35 Minutes
1. **Read:** [docs/START_HERE.md](./docs/START_HERE.md)
2. **Follow:** [docs/IMPLEMENTATION_CHECKLIST.md](./docs/IMPLEMENTATION_CHECKLIST.md)
3. **Live!** 🎉

### 📚 Documentation (All in `/docs`)
- [START_HERE.md](./docs/START_HERE.md) - Overview & quick links
- [IMPLEMENTATION_CHECKLIST.md](./docs/IMPLEMENTATION_CHECKLIST.md) - 7-step deployment
- [QUICK_REFERENCE.md](./docs/QUICK_REFERENCE.md) - 1-page cheat sheet
- [SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md) - Cloud configuration
- [GITHUB_PAGES_DEPLOYMENT.md](./docs/GITHUB_PAGES_DEPLOYMENT.md) - Deploy guide
- [COMPLETE_GUIDE.md](./docs/COMPLETE_GUIDE.md) - Full user guide
- [TECH_STACK.md](./docs/TECH_STACK.md) - Architecture & technology

### Local Development
```bash
npm install
npm run serve
# Visit http://localhost:8080
```

---

## 📘 Product Requirements Document (PRD)

### Product Name
Goal Accelerator PWA

### TL;DR
A minimalist, mobile-first Progressive Web App that helps users define yearly goals, break them into monthly milestones, build daily habits, and reflect consistently — with hard constraints (max 6 goals & habits) to prevent overwhelm.

Designed to feel like a calm coach — not a spreadsheet.

### 1. Problem Statement
The existing Google Sheet is powerful but:
- Visually overwhelming
- Desktop-first
- Not intuitive for daily use
- Too manual (checkbox grids, formulas)
- Encourages over-planning

Users need a guided, simple, mobile-first system that:
- Reduces cognitive load
- Encourages consistency
- Makes daily habit tracking frictionless
- Encourages reflection
- Prevents goal overload

### 2. Goals
#### 🎯 Business Goals
- Launch MVP PWA
- Achieve <30 second daily interaction time
- Achieve 70%+ habit completion retention over 30 days
- Ship V1 in under 6 weeks

#### 👤 User Goals
- Define what success means personally
- Identify weak life areas (Wheel of Life)
- Set ≤6 yearly goals
- Break goals into actionable habits
- Track habits in under 30 seconds per day
- Reflect monthly and yearly

#### 🚫 Non-Goals (V1)
- Social features
- Multi-year tracking
- Gamification economy
- Leaderboards
- AI goal generation
- Unlimited goals/habits
- Native mobile apps
- Complex analytics dashboards

### 3. Target User
- Individual high-performer
- Self-directed
- Values simplicity
- Overwhelmed by overly complex systems
- Wants structure but not friction

### 4. Core User Flow
#### A. First-Time User (Onboarding)
1. Welcome screen
2. Define “What would make this year successful?”
3. Complete Wheel of Life (slider-based)
4. Create up to 6 yearly goals
5. Plan current month only:
   - Define monthly milestone
   - Define smallest daily habit
6. Land on current month dashboard

#### B. Daily User Flow (Primary Use Case)
1. Open app
2. See today's habits
3. Tap to complete
4. See streak + strength update
5. Close app

Target: <30 seconds

#### C. End-of-Month Flow
1. App detects month end
2. Prompts reflection
3. User answers:
   - What worked?
   - What didn’t?
   - What can I change?
4. Shows month summary stats
5. Prompts next month planning

### 5. Features (V1 Scope)
#### 5.1 Guided Setup
- Define Success
  - Large journal input
  - Autosave
- Wheel of Life
  - 8 sliders (0–10)
  - Radar chart visualization
  - Highlight lowest 2 categories
- Yearly Goals
  - Max 6
  - Required: category + title
  - Optional: why
  - Cannot add more than 6

#### 5.2 Monthly Planning
- For current month only:
  - Define monthly milestone per goal
  - Define 1 habit per goal (max 6 habits total)
  - Habit frequency: daily only (V1)

#### 5.3 Habit Tracking
- Each habit displays:
  - Title
  - Streak (current month only)
  - Strength % (month completion rate)
  - Daily toggle:
    - Tap = mark complete
    - Animate fill
    - If all habits complete → Golden Day
- Golden Day:
  - Visual highlight
  - Counter displayed

#### 5.4 Dashboard
- Displays:
  - Yearly goals completed count
  - Monthly goals completed count
  - Avg habit strength
  - Monthly trend chart
  - Wheel of Life comparison (start vs current)

#### 5.5 Reflection
- Weekly
  - Optional prompt every Sunday
- Monthly
  - Required before next month unlocks
- Yearly
  - 7 guided questions

### 6. UX Principles
- Mobile-first
- Minimal cognitive load
- Hard constraints (max 6 goals/habits)
- Progressive disclosure
- Celebrate consistency
- Calm tone (non-judgmental)

### 7. Success Metrics
- Daily active usage rate
- Habit completion rate
- Month-to-month retention
- % users who complete reflection
- Time-to-complete daily session

### 8. Milestones & Sequencing
#### Phase 1 – Core Infrastructure (2–3 weeks)
- Auth
- Database
- Basic CRUD

#### Phase 2 – Onboarding & Month View (2 weeks)
- Guided setup
- Habit tracking
- Streak logic

#### Phase 3 – Dashboard & Reflection (1–2 weeks)
- Charts
- Wheel comparison
- Reflection system

#### Phase 4 – PWA Optimization (1 week)
- Service worker
- Offline support
- Deploy to GitHub Pages

---

## 📙 Technical Requirements Document (TRD)

### Target Stack
- HTML
- Tailwind CSS
- Vanilla JS
- Supabase (Auth + Postgres)
- GitHub Pages (Static hosting)

### 1. Architecture
- Client-side only PWA.
- Static frontend
- Supabase as BaaS
- No custom backend server
- Supabase RLS enabled

### 2. Database Schema
- **users**: Handled by Supabase Auth
- **year_settings**: Stores yearly success definitions
- **wheel_of_life**: Tracks life area scores
- **yearly_goals**: Stores yearly goals
- **monthly_goals**: Tracks monthly milestones
- **habits**: Tracks daily habits
- **habit_logs**: Logs daily habit completions
- **reflections**: Stores user reflections

### 3. Core Logic Requirements
#### 3.1 Habit Strength %
`(completed_days / total_days_in_month) * 100`

#### 3.2 Streak Logic
- Query `habit_logs` ordered by date desc
- Count consecutive `completed = true`
- Stop at first `false`

#### 3.3 Golden Day Logic
- For date D:
  - IF all habits for month have `completed = true` for date D
  - THEN `golden_day = true`
- Store in derived calculation (no DB table required V1).

### 4. Routing Structure
- `/`: Month view
- `/onboarding`
- `/dashboard`
- `/reflect`
- `/settings`

Single-page architecture preferred.

### 5. PWA Requirements
- `manifest.json`
- `service-worker.js`
- Offline caching of:
  - `index.html`
  - CSS
  - JS
  - Supabase requests require network

### 6. Security
- Supabase Row Level Security
- All tables enforce:
  - `user_id = auth.uid()`

### 7. Performance Targets
- Initial load < 2 seconds
- Habit toggle latency < 200ms
- Mobile Lighthouse score > 90

### 8. Deployment
- Static files pushed to GitHub
- GitHub Pages enabled
- Supabase project URL + anon key stored in JS config
- Redirect URLs configured in Supabase

### 9. Folder Structure
```
/index.html
/js/
   app.js
   supabase.js
   habits.js
/styles/
   tailwind.css
/manifest.json
/service-worker.js
```

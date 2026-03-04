# 🛠️ Tech Stack & Architecture

## Frontend Stack

### Core Technologies
- **HTML5** - Semantic markup
- **Vanilla JavaScript (ES6+)** - No frameworks (lightweight)
- **Tailwind CSS** - Utility-first styling
- **Service Worker** - PWA offline support

### Architecture
```
index.html (Entry point)
  ↓
js/router.js (Navigation)
  ↓
js/views/ (Page components)
  ├── auth.js (Login/Signup)
  ├── onboarding.js (Setup)
  ├── planning.js (Monthly planning)
  ├── month.js (Daily tracking + reflections)
  ├── dashboard.js (Progress metrics)
  ├── yearlyReflection.js (Yearly review)
  ├── reflect.js (Archive reflections)
  └── settings.js (FAQ & account)
```

---

## Backend/Cloud Stack

### Supabase (BaaS)
- **Authentication** - Email/password signup & login
- **PostgreSQL Database** - Cloud data storage
- **Row Level Security** - Data protection
- **Real-time Sync** - Multi-device updates
- **API** - REST endpoints for CRUD

### Database Schema
```
┌─────────────────────┐
│   auth.users        │ (Managed by Supabase)
│  ├─ id              │
│  ├─ email           │
│  └─ created_at      │
└─────────────────────┘
         ↓
┌─────────────────────┐
│  yearly_goals       │
│  ├─ id              │
│  ├─ user_id (FK)    │
│  ├─ year            │
│  ├─ category        │
│  ├─ title           │
│  └─ why             │
└─────────────────────┘
         ↓
┌─────────────────────┐
│     habits          │
│  ├─ id              │
│  ├─ user_id (FK)    │
│  ├─ title           │
│  └─ month           │
└─────────────────────┘
         ↓
┌─────────────────────┐
│   habit_logs        │
│  ├─ id              │
│  ├─ habit_id (FK)   │
│  ├─ date            │
│  └─ completed       │
└─────────────────────┘
         ↓
┌─────────────────────┐
│  reflections        │
│  ├─ id              │
│  ├─ user_id (FK)    │
│  ├─ type            │
│  ├─ content (JSONB) │
│  └─ created_at      │
└─────────────────────┘
```

---

## Deployment Stack

### GitHub
- **Repository** - Version control & source code
- **GitHub Pages** - Static hosting (free tier)
- **GitHub Actions** - CI/CD (optional future)

### CDNs (Current)
- **Tailwind CDN** - CSS styling (production: should be built)
- **Supabase JS Library** - Cloud client (ESM import)

---

## Development Tools

```
package.json
├── live-server (Local dev server)
├── webpack (Optional bundling)
├── postcss (CSS processing)
└── tailwindcss (Styling)
```

### Commands
```bash
npm install        # Install dependencies
npm run serve      # Local dev server (port 8080)
npm run build      # Build for production (optional)
```

---

## Data Flow

### Signup/Login
```
User Input (Email/Password)
         ↓
supabase-config.js (signUp/signIn)
         ↓
Supabase Auth API
         ↓
JWT Token Stored in Browser
         ↓
Redirect to Onboarding
```

### Data Save (Example: Goal)
```
User Action (Create Goal)
         ↓
JavaScript Event Handler
         ↓
supabase-config.js (saveGoals)
         ↓
Supabase REST API
         ↓
PostgreSQL Database (Secured by RLS)
         ↓
Real-time Sync to Other Devices
```

### Data Fetch (Example: Get Goals)
```
App Loads / User Navigates
         ↓
renderDashboard()
         ↓
getGoals() from supabase-config.js
         ↓
Supabase REST API
         ↓
Check User ID (RLS)
         ↓
Return Only User's Data
         ↓
Render UI
```

---

## Security Model

### Row Level Security (RLS)
```sql
-- Users can only see their own data
POLICY: auth.uid() = user_id

-- Example:
SELECT * FROM yearly_goals
WHERE user_id = current_user_id;  -- Enforced by RLS
```

### Authentication Flow
```
1. User submits credentials
2. Supabase verifies password
3. Server returns JWT token
4. Token stored in browser
5. All requests include token
6. Server validates token = RLS user
7. Only matching data returned
```

### API Keys
```
SUPABASE_ANON_KEY (Public - Safe to expose)
  ├─ Used for client-side requests
  ├─ Restricted by RLS policies
  └─ Cannot perform admin actions

SUPABASE_SERVICE_KEY (Private - Never expose)
  ├─ Used for server-side requests
  ├─ Bypasses RLS
  └─ Keep in environment variables
```

---

## Performance Metrics

### Target Metrics
- Initial Load: < 2 seconds
- Habit Toggle: < 200ms
- Dashboard Load: < 1 second
- Mobile Lighthouse: > 90

### Optimizations
- Vanilla JS (no framework overhead)
- Minimal dependencies
- Tailwind CSS (utility-first, no unused CSS)
- Service Worker (offline caching)
- Lazy loading (views loaded on demand)

---

## Browser Compatibility

### Supported
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Android

### Features Used
- ES6 Modules
- Fetch API
- localStorage
- Service Workers
- IndexedDB (optional for offline)

---

## File Size Budget

```
Index.html        ~15 KB
router.js         ~5 KB
supabase-config   ~8 KB
auth.js           ~6 KB
onboarding.js     ~12 KB
month.js          ~14 KB
dashboard.js      ~10 KB
yearlyReflection  ~12 KB
settings.js       ~8 KB
constants.js      ~3 KB
Tailwind CSS      ~50 KB (CDN)
───────────────────────
Total:            ~140 KB (with CSS CDN)
```

---

## Future Tech Debt

### Current Limitations
- Tailwind CDN (should be built for production)
- No bundling/minification
- localStorage fallback (after Supabase)
- No caching strategy optimization

### Future Improvements
- Webpack bundling
- CSS minification
- Service worker advanced caching
- Static site generation (11ty/Hugo)
- Database migrations tool
- Analytics integration
- Error monitoring (Sentry)

---

## Environment Setup

### Development Machine
```
Node.js v18+
npm v9+
Git
Code Editor (VS Code recommended)
```

### Supabase Project
```
PostgreSQL Database
Auth System (Email/Password)
RESTful API
Real-time Subscriptions
```

### GitHub
```
Repository
GitHub Pages Hosting
Actions for CI/CD (optional)
```

---

## Deployment Checklist

- [x] Supabase project created
- [x] Database tables defined
- [x] RLS policies enabled
- [x] Auth configured
- [x] Code committed to GitHub
- [x] GitHub Pages enabled
- [x] Redirect URLs configured
- [ ] Production credentials verified
- [ ] SSL certificate (auto via GitHub Pages)
- [ ] Domain custom (optional)

---

## Cost Breakdown

| Service | Tier | Cost | Notes |
|---------|------|------|-------|
| Supabase | Free | $0 | 500MB DB, unlimited users |
| GitHub | Free | $0 | Public repo, Pages hosting |
| Domain | Optional | $0-15/yr | Custom domain optional |
| **Total** | | **$0-15/yr** | Production ready! |

---

## Scaling Path

If app grows:

1. **Users > 1000**
   - Supabase Pro ($25/mo)
   - Custom domain (Google Domains)

2. **Users > 10,000**
   - Analytics integration
   - CDN edge caching
   - Database optimization

3. **Enterprise**
   - Custom backend
   - Advanced analytics
   - White-labeling

---

**Architecture ready for production! 🚀**

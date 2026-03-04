# 🔌 Connect Supabase - Quick Start

## TL;DR - Do This Now

### Step 1: Create Supabase Project (5 min)
```
1. Go to https://supabase.com
2. Click "Sign in" or start new project
3. Click "New Project"
4. Name: goal-accelerator
5. Create strong password
6. Choose your region
7. Wait 2-3 minutes
```

### Step 2: Get Credentials (2 min)
```
In Supabase Dashboard:
1. Go to Settings → API
2. Copy Project URL (looks like: https://xxxxx.supabase.co)
3. Copy Anon Key (long string starting with eyJ...)
```

### Step 3: Add to App (1 min)
Edit `js/supabase-config.js` (lines 8-9):

**BEFORE:**
```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
```

**AFTER:** (paste YOUR actual values)
```javascript
const SUPABASE_URL = 'https://yourproject.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### Step 4: Enable Email Auth (1 min)
```
Supabase → Authentication → Providers
Make sure "Email" toggle is ON
```

### Step 5: Create Database Tables (10 min)
See `docs/SUPABASE_SETUP.md` **Step 5** for 5 SQL queries to copy-paste into Supabase SQL Editor.

Each query creates one table. Run them one at a time.

### Step 6: Add Redirect URLs (2 min)
```
Supabase → Authentication → URL Configuration

Add two URLs:
- http://localhost:8080
- https://YOUR_USERNAME.github.io/goal_accelerator
```

### Step 7: Test (5 min)
```bash
npm run serve
# Visit http://localhost:8080
# Try to sign up: test@example.com / password123
```

---

## ✅ Done!

Your app is now connected to Supabase!

**Next:** Deploy to GitHub Pages (see `docs/GITHUB_PAGES_DEPLOYMENT.md`)

---

## 📖 Full Guide

For detailed step-by-step instructions with screenshots, see:
**`docs/SUPABASE_SETUP.md`**

It has everything explained in detail with troubleshooting!

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid credentials" | Check URL & key in `js/supabase-config.js` - copy exact values |
| "Failed to sign up" | Email auth must be ENABLED in Supabase |
| "Can't see user created" | Go to Supabase → Authentication → Users, then refresh |
| SQL query fails | Copy ENTIRE query block, run one at a time |

---

**Ready? Start with Step 1 above!** 🚀

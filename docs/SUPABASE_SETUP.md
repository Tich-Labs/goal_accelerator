# 🚀 Supabase Setup Guide

## Prerequisites
- Supabase account (free tier available at https://supabase.com)
- GitHub account
- Node.js & npm installed

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: `goal-accelerator`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to you
4. Click **"Create new project"** (takes 2-3 minutes)

---

## Step 2: Get Your Credentials

1. Once project is created, go to **Settings → API**
2. Copy your:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key
3. Update `js/supabase-config.js`:
   ```javascript
   const SUPABASE_URL = 'YOUR_URL_HERE';
   const SUPABASE_ANON_KEY = 'YOUR_KEY_HERE';
   ```

---

## Step 3: Create Database Tables

In Supabase, go to **SQL Editor** and run these queries:

### 1. Users (handled by Supabase Auth)
```sql
-- Supabase Auth automatically creates users table
-- Just enable Email authentication in Authentication → Providers
```

### 2. Yearly Goals
```sql
CREATE TABLE yearly_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  year INT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  why TEXT DEFAULT '',
  area_index INT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, year, title)
);

ALTER TABLE yearly_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own goals"
  ON yearly_goals
  FOR ALL
  USING (auth.uid() = user_id);
```

### 3. Habits
```sql
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  year INT NOT NULL,
  month INT NOT NULL,
  title TEXT NOT NULL,
  monthly_goal_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own habits"
  ON habits
  FOR ALL
  USING (auth.uid() = user_id);
```

### 4. Habit Logs
```sql
CREATE TABLE habit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(habit_id, date)
);

ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own habit logs"
  ON habit_logs
  FOR ALL
  USING (auth.uid() = user_id);
```

### 5. Reflections
```sql
CREATE TABLE reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  year INT NOT NULL,
  month INT,
  type TEXT NOT NULL, -- 'weekly', 'monthly', 'yearly'
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own reflections"
  ON reflections
  FOR ALL
  USING (auth.uid() = user_id);
```

---

## Step 4: Enable Authentication

1. Go to **Authentication → Providers**
2. Make sure **Email** is enabled
3. Go to **Authentication → Redirect URLs**
4. Add these URLs:
   - Local: `http://localhost:8080`
   - GitHub Pages: `https://YOUR_USERNAME.github.io/goal_accelerator`

---

## Step 5: Deploy to GitHub Pages

1. Push code to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/goal_accelerator.git
   git branch -M main
   git push -u origin main
   ```

2. Go to GitHub repo → **Settings → Pages**
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** / **root**
4. Click **Save**

5. Your app is now live at: `https://YOUR_USERNAME.github.io/goal_accelerator`

---

## Step 6: Test Everything

1. Visit your GitHub Pages URL
2. Create a new account (email & password)
3. Complete the onboarding
4. Add goals and track habits
5. Check Supabase dashboard to see data being saved

---

## 📋 Troubleshooting

### "Invalid credentials" error
- Check your Supabase URL and anon key in `supabase-config.js`
- Make sure Email authentication is enabled

### Data not saving
- Check RLS policies are enabled in Supabase
- Verify tables were created correctly
- Check browser console for errors (F12)

### GitHub Pages not updating
- Wait 2-3 minutes for deployment
- Hard refresh (Ctrl+Shift+R)
- Check "Actions" tab in GitHub for deployment status

---

## 🔐 Security Notes

- **anon key** is safe to expose (public key)
- RLS policies protect data (users can only see their own)
- Never commit private keys to GitHub
- Store secrets in GitHub Secrets for CI/CD

---

## Next Steps

- [ ] Create Supabase project
- [ ] Get credentials
- [ ] Create tables
- [ ] Enable authentication
- [ ] Push to GitHub
- [ ] Deploy to GitHub Pages
- [ ] Test full flow

Happy habit tracking! 🎯

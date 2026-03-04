# 🔌 Supabase Connection Guide

Complete step-by-step guide to set up Supabase and connect it to Goal Accelerator.

---

## Step 1: Create Supabase Project ⏱️ (5 minutes)

### 1.1 Sign Up / Login
- Go to: https://supabase.com
- Click **"Sign in"** or **"Start your project"**
- Sign in with GitHub or email

### 1.2 Create New Project
- Click **"New Project"**
- Fill in:
  - **Project Name**: `goal-accelerator`
  - **Database Password**: Create a strong password (save this!)
  - **Region**: Choose closest to you
- Click **"Create new project"**
- ⏳ Wait 2-3 minutes for project to initialize

### 1.3 Verify Project Created
- You'll see a "Project is being set up" message
- Once ready, you'll see the Supabase dashboard

---

## Step 2: Get Your Credentials ⏱️ (2 minutes)

### 2.1 Find API Settings
1. In Supabase dashboard, go to **Settings** (left sidebar)
2. Click **"API"**
3. You'll see two keys to copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (a long string)

### 2.2 Copy the Values
```
Project URL: https://xxxxx.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 3: Add Credentials to App ⏱️ (1 minute)

### 3.1 Open File
Edit: `js/supabase-config.js`

### 3.2 Replace Placeholder Values
Find these lines (around line 8-9):
```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
```

Replace with **your actual values** from Step 2:
```javascript
const SUPABASE_URL = 'https://yourproject.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### 3.3 Save File
- Save and close the file

---

## Step 4: Enable Email Authentication ⏱️ (2 minutes)

### 4.1 Go to Authentication
1. In Supabase dashboard, click **"Authentication"** (left sidebar)
2. Click **"Providers"**
3. Find **"Email"** and make sure it's **enabled** (toggle switch ON)

### 4.2 Configure Email Settings (Optional)
- You can leave defaults or customize
- Make sure "Confirm email" is enabled for security

---

## Step 5: Create Database Tables ⏱️ (10 minutes)

### 5.1 Open SQL Editor
1. Click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Copy-paste each query below, one at a time

### 5.2 Run These 5 SQL Queries

**Query 1: Yearly Goals Table**
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

**Query 2: Habits Table**
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

**Query 3: Habit Logs Table**
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

**Query 4: Reflections Table**
```sql
CREATE TABLE reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  year INT NOT NULL,
  month INT,
  type TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own reflections"
  ON reflections
  FOR ALL
  USING (auth.uid() = user_id);
```

**Query 5: Year Settings Table**
```sql
CREATE TABLE year_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  year INT NOT NULL,
  success_definition TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, year)
);

ALTER TABLE year_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own settings"
  ON year_settings
  FOR ALL
  USING (auth.uid() = user_id);
```

### 5.3 Execute Queries
For each query:
1. Paste the SQL code in the editor
2. Click **"Run"** (or Cmd+Enter)
3. Wait for "Query executed successfully" message
4. Clear and move to next query

✅ All 5 tables should be created

---

## Step 6: Configure Redirect URLs ⏱️ (2 minutes)

### 6.1 Go to Authentication Settings
1. Click **"Authentication"** (left sidebar)
2. Click **"URL Configuration"**
3. Under "Redirect URLs", click **"Add URL"**

### 6.2 Add Local URL
```
http://localhost:8080
```
Click **"Add URL"**

### 6.3 Add Production URL
```
https://YOUR_USERNAME.github.io/goal_accelerator
```
Click **"Add URL"**

Replace `YOUR_USERNAME` with your actual GitHub username!

---

## Step 7: Test Connection ⏱️ (5 minutes)

### 7.1 Start Local Server
```bash
npm run serve
```

### 7.2 Open App
- Visit: http://localhost:8080
- You should see login screen (not onboarding)

### 7.3 Create Test Account
1. Click **"Sign Up"**
2. Enter: `test@example.com` / `password123`
3. Should show success message or redirect

### 7.4 Check Supabase
1. Go back to Supabase dashboard
2. Click **"Authentication"** → **"Users"**
3. You should see your test user created! ✅

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] Step 1: Supabase project created
- [ ] Step 2: Got Project URL & Anon Key
- [ ] Step 3: Updated `js/supabase-config.js` with credentials
- [ ] Step 4: Email authentication enabled
- [ ] Step 5: All 5 SQL tables created (check Supabase "Tables" menu)
- [ ] Step 6: Redirect URLs configured
- [ ] Step 7: Test account created successfully
- [ ] Step 7: User appears in Supabase authentication

**If all checked ✅ → Supabase is connected!**

---

## 🆘 Troubleshooting

### "Invalid credentials" Error
- **Solution:** Check `js/supabase-config.js` has correct URL and key
- Verify you copied the EXACT values from Supabase
- No extra spaces or quotes

### "Failed to create user"
- **Solution:** Check email authentication is ENABLED
- Verify password is 6+ characters
- Check email format is valid

### "Can't see user in Supabase"
- **Solution:** Refresh the Supabase dashboard
- Make sure you're in right project
- Check the "Users" tab under Authentication

### SQL Query Fails
- **Solution:** Check syntax carefully
- Copy entire query block including ALTER statements
- Run one query at a time
- Check for typos in table names

### Tables Not Appearing
- **Solution:** Go to Supabase "SQL Editor"
- Click "Database" → "Tables" to see all tables
- Refresh if needed
- Check project is correct

---

## 🎉 You're Connected!

Your Goal Accelerator is now:
- ✅ Connected to Supabase cloud
- ✅ Using real authentication
- ✅ Storing data in cloud database
- ✅ Ready for multi-device sync
- ✅ Production ready!

**Next:** Deploy to GitHub Pages following [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)

---

## 📚 Reference

| What | Where |
|------|-------|
| Project URL | Supabase → Settings → API |
| Anon Key | Supabase → Settings → API |
| Create tables | Supabase → SQL Editor |
| View users | Supabase → Authentication → Users |
| View data | Supabase → Table Editor |
| Configure auth | Supabase → Authentication → Providers |

---

**Questions? Check docs/COMPLETE_GUIDE.md for more details!**

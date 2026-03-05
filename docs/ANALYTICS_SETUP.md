# 📊 Analytics & Tracking Setup Guide

## What's Been Added

### 1. **Google Analytics** - Track Visitors
- Unique visitors
- Returning visitors
- Page views
- User interactions
- Demographics & behavior

### 2. **PWA Installation Tracking**
- Track when users install the app
- Know how many are using it as a PWA
- See install prompt engagement

### 3. **Custom Event Tracking**
- Sign ups
- Goal creation
- Habit completions
- Reflections submitted
- Onboarding completed

### 4. **Ko-fi Link**
- Support/donation link in Settings
- Help fund ongoing development

---

## 🔧 **Setup Instructions**

### Step 1: Create Google Analytics Account

1. **Go to:** https://analytics.google.com
2. **Click:** "Start measuring" or "Create property"
3. **Property name:** `Goal Accelerator`
4. **Property type:** Web
5. **Website URL:** `https://tich-labs.github.io/goal_accelerator`
6. **Create property**
7. **Select:** Web (for websites)
8. **Enter stream name:** `Goal Accelerator PWA`
9. **Enter website URL:** `https://tich-labs.github.io/goal_accelerator`
10. **Create stream**
11. **Copy the Measurement ID** (looks like: `G-XXXXXXXXXX`)

### Step 2: Update Your Website

1. **Open:** `index.html`
2. **Find:** The Google Analytics script tag (lines ~18-25)
3. **Replace** `G-XXXXXXXXXX` with your actual Measurement ID (2 places)

**Example:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF45"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC123DEF45');  ← Use YOUR ID here
</script>
```

### Step 3: Update Ko-fi Link

1. **Open:** `js/views/settings.js`
2. **Find:** The Ko-fi link (around line 265)
3. **Replace** `YOUR_KOFI_USERNAME` with your actual Ko-fi username

**Example:**
```html
href="https://ko-fi.com/tich_labs"  ← Use YOUR Ko-fi username
```

---

## 📊 **What You'll Track**

### Visitor Analytics
- ✅ Unique visitors per month
- ✅ Returning visitor rate
- ✅ Device type (mobile, desktop, tablet)
- ✅ Browser type
- ✅ Location
- ✅ Time on page
- ✅ Bounce rate

### PWA Installation Analytics
- ✅ Users who installed the PWA
- ✅ Install prompt shown count
- ✅ Installation rate
- ✅ Actual app usage

### User Behavior
- ✅ Sign up count
- ✅ Goals created
- ✅ Daily active users
- ✅ Habit completion rate
- ✅ Reflections submitted

---

## 🎯 **Custom Events Being Tracked**

The app automatically tracks:

1. **Sign Up** - When user creates account
2. **Goal Created** - When user adds yearly goals
3. **Onboarding Complete** - When user finishes setup
4. **Habit Completed** - When user completes daily habits
5. **Reflection Submitted** - When user writes reflections
6. **PWA Installed** - When user adds to home screen
7. **Install Prompt Shown** - When install prompt appears

---

## 📈 **How to View Analytics**

### In Google Analytics:

1. **Go to:** https://analytics.google.com
2. **Select:** Your property (Goal Accelerator)
3. **View:**
   - **Overview** - Real-time visitors
   - **Events** - Custom events (PWA installs, signups, etc.)
   - **Users** - Unique & returning visitors
   - **Demographics** - Location, devices, browsers

### Daily Monitoring:
- Check "Real-time" to see live visitors
- Check "Events" to see PWA installations
- Check "Users" for growth trends

---

## ☕ **Ko-fi Integration**

### What's Included:
- Beautiful Ko-fi button in Settings
- Direct link to your Ko-fi page
- Encourages community support

### Get Started:
1. **Go to:** https://ko-fi.com
2. **Sign up** for a free account
3. **Get your username** (from your profile)
4. **Update** the Ko-fi link in `settings.js`

---

## 🔒 **Privacy & GDPR**

Google Analytics tracks visitors with full GDPR compliance:
- ✅ Anonymous IP enabled
- ✅ No personal data collected
- ✅ User privacy respected
- ✅ You own all your data

---

## 📋 **Checklist**

- [ ] Created Google Analytics account
- [ ] Got Measurement ID (G-XXXXXXXXXX)
- [ ] Updated `index.html` with Measurement ID
- [ ] Updated Ko-fi link in `settings.js`
- [ ] Pushed changes to GitHub
- [ ] Analytics appears in Google Analytics dashboard (can take 24-48 hours)

---

## ✅ **Done!**

Once you complete the setup:
- ✅ Analytics tracking active
- ✅ PWA installations tracked
- ✅ Ko-fi link visible to users
- ✅ Full visibility into user behavior

---

## 💡 **Pro Tips**

1. **Give it 24-48 hours** for data to appear in Google Analytics
2. **Check Real-time tab** to verify tracking is working
3. **Set goals in GA** for conversions (signups, etc.)
4. **Monitor PWA installs** in Events tab
5. **Share Ko-fi link** in your README or social media

---

## 🚀 **Next Steps**

1. Get your Google Analytics Measurement ID
2. Update `index.html`
3. Update Ko-fi link
4. Push to GitHub
5. Check Analytics dashboard after 24 hours

You're all set! 📊

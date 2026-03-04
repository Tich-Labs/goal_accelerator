# 🚀 GitHub Pages Deployment Guide

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Tich-Labs/goal_accelerator.git
cd goal_accelerator
```

### 2. Set Up Supabase
- Follow **SUPABASE_SETUP.md** to create your Supabase project
- Update `js/supabase-config.js` with your credentials

### 3. Test Locally
```bash
npm install
npm run serve
```
- Visit `http://localhost:8080`
- Test authentication and basic flow

### 4. Commit and Push to GitHub
```bash
git add .
git commit -m "Initial commit: Goal Accelerator PWA"
git push origin main
```

### 5. Enable GitHub Pages
1. Go to repo **Settings → Pages**
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** / **root**
3. Click **Save**

### 6. Update Supabase Redirect URLs
In Supabase dashboard:
1. Go to **Authentication → Redirect URLs**
2. Add: `https://YOUR_USERNAME.github.io/goal_accelerator`
3. Save

### 7. Your App is Live! 🎉
Visit: `https://YOUR_USERNAME.github.io/goal_accelerator`

---

## File Structure

```
goal_accelerator/
├── index.html              # Main entry point
├── package.json            # Dependencies
├── js/
│   ├── app.js             # Main app logic
│   ├── router.js          # Navigation
│   ├── supabase-config.js # Supabase setup
│   ├── constants.js       # Color scheme
│   └── views/
│       ├── auth.js        # Login/Signup
│       ├── onboarding.js  # Setup flow
│       ├── planning.js    # Monthly planning
│       ├── month.js       # Daily tracking
│       ├── dashboard.js   # Progress metrics
│       ├── yearlyReflection.js
│       ├── reflect.js
│       └── settings.js
├── css/
│   └── style.css
└── docs/
    ├── README.md
    ├── SUPABASE_SETUP.md
    └── GITHUB_PAGES.md
```

---

## Environment Variables (Future)

For more security, use GitHub Secrets:

1. **Settings → Secrets and variables → Actions**
2. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY`
3. Use in CI/CD pipeline

---

## Maintenance

### Updating Code
1. Make changes locally
2. Test with `npm run serve`
3. Commit: `git commit -m "Your message"`
4. Push: `git push origin main`
5. Wait 2-3 minutes for GitHub Pages to update

### Rollback
```bash
git revert <commit-hash>
git push origin main
```

### View Deployment Status
- Go to **Actions** tab in GitHub
- Check latest workflow run

---

## Features Ready to Deploy ✅

- [x] Authentication (Email/Password via Supabase)
- [x] Onboarding flow (Success → Wheel → Goals)
- [x] Daily habit tracking
- [x] Weekly/Monthly/Yearly reflections
- [x] Dashboard with metrics
- [x] Wheel of Life comparison
- [x] Settings & Help
- [x] Color-coded categories
- [x] Responsive design (mobile-first)
- [x] PWA capabilities (offline-ready)

---

## Future Enhancements

- [ ] Data export/import
- [ ] Custom notifications
- [ ] Native mobile apps
- [ ] Social features
- [ ] AI goal suggestions
- [ ] Advanced analytics

---

## Support

- Issues? Check GitHub Issues
- Questions? See SUPABASE_SETUP.md
- Want to contribute? Open a PR!

---

Happy goal tracking! 🎯

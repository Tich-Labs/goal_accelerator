#!/bin/bash

cd /home/tich/IdeaProjects/Habit_tracker_V2026

echo "🚀 Fixing onboarding duplication..."

git add .
git commit -m "fix: remove duplicate 'How It Works' from onboarding Step 1 - focus on action"
git push origin master:main

echo ""
echo "✅ Fix pushed!"
echo ""
echo "📋 What changed:"
echo "   ❌ Removed: Repeated '5 steps' from onboarding"
echo "   ✅ Kept: Clean, focused success definition form"
echo ""
echo "🧪 Test at: https://tich-labs.github.io/goal_accelerator"
echo "   1. Sign up as new user"
echo "   2. See Step 1 - just the form, NO repeated steps"

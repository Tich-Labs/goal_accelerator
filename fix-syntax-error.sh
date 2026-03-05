#!/bin/bash

cd /home/tich/IdeaProjects/Habit_tracker_V2026

echo "🔧 Fixing syntax error in onboarding.js..."

git add .
git commit -m "fix: remove duplicate code causing syntax error in onboarding"
git push origin master:main

echo ""
echo "✅ Syntax error fixed!"
echo ""
echo "📋 What was wrong:"
echo "   ❌ Leftover button code fragment"
echo "   ❌ Duplicate closing tags"
echo ""
echo "🧪 Test locally:"
echo "   npm run serve"
echo "   Should see no syntax errors now"
echo ""
echo "🌐 Live at: https://tich-labs.github.io/goal_accelerator"

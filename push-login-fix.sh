#!/bin/bash

cd /home/tich/IdeaProjects/Habit_tracker_V2026

echo "🚀 Pushing login redirect fix..."

git add .
git commit -m "fix: proper redirect after login - check onboarding completion status"
git push origin master:main

echo "✅ Login redirect fixed and pushed!"
echo ""
echo "📋 What should happen now:"
echo "  1. Login → First time? Goes to Onboarding"
echo "  2. Complete Onboarding → Goes to Month View"
echo "  3. Login again → Goes directly to Month View"
echo ""
echo "🌐 Test at: https://tich-labs.github.io/goal_accelerator"

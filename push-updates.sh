#!/bin/bash

cd /home/tich/IdeaProjects/Habit_tracker_V2026

# Add all changes
git add .

# Commit with message
git commit -m "feat: add Ko-fi footer to homepage and center Sign In form for better layout balance"

# Push to GitHub
git push origin master:main

echo "✅ Homepage updates pushed to GitHub!"
echo "Visit: https://tich-labs.github.io/goal_accelerator"

# 🚀 Deployment Guide

## Quick Start - Commit & Push to GitHub

Follow these simple steps to commit your awesome new portfolio and push it to GitHub:

### Step 1: Navigate to your project directory
```bash
cd ~/Documents/GitHub/0xkhush/you-blog
```

### Step 2: Check the status of your files
```bash
git status
```

### Step 3: Stage all your changes
```bash
git add .
```

### Step 4: Commit your changes with a message
```bash
git commit -m "✨ Redesigned portfolio with stunning animations and modern UI"
```

### Step 5: Push to GitHub
```bash
git push origin main
```

> **Note:** If your default branch is named differently (like `master`), use that instead:
> ```bash
> git push origin master
> ```

---

## 🌐 Deploy to GitHub Pages

After pushing your code, deploy it to GitHub Pages:

```bash
npm run deploy
```

This will:
1. Build your project
2. Push the built files to the `gh-pages` branch
3. Make your site live at `https://0xkhush.github.io/`

---

## 🔧 If You Encounter Issues

### If you haven't initialized git yet:
```bash
git init
git add .
git commit -m "✨ Initial commit with stunning portfolio"
git branch -M main
git remote add origin https://github.com/0xkhush/0xkhush.github.io.git
git push -u origin main
```

### If remote already exists:
```bash
git remote set-url origin https://github.com/0xkhush/0xkhush.github.io.git
```

### If you need to pull changes first:
```bash
git pull origin main --rebase
git push origin main
```

---

## 📋 Complete Workflow Summary

```bash
# 1. Navigate to project
cd ~/Documents/GitHub/0xkhush/you-blog

# 2. Add all changes
git add .

# 3. Commit with a descriptive message
git commit -m "✨ Redesigned portfolio with stunning animations and modern UI"

# 4. Push to GitHub
git push origin main

# 5. Deploy to GitHub Pages
npm run deploy
```

---

## 🎉 That's It!

Your portfolio will be live at: **https://0xkhush.github.io/**

It might take a few minutes for GitHub Pages to update after deployment.

---

## 💡 Pro Tips

- Always check `git status` before committing to see what files have changed
- Use descriptive commit messages so you can track changes later
- Run `npm run dev` locally first to test before deploying
- You can view the build output in the `dist` folder after running `npm run build`

---

**Need help?** Check the README.md for more information!
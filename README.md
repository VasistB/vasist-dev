# Vasist Vamsi Bhukya — Android Engineer Portfolio

Production React portfolio built with **React 18**, **Vite**, **Tailwind CSS**, **Lucide Icons**, **AOS**, and **GSAP** (ScrollTrigger animations & Pixel phone mockup transforms).

## 🚀 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start local development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌐 GitHub Pages Deployment Guide

There are **two easy ways** to host this React Vite portfolio on **GitHub Pages**:

### Option 1: Automatic GitHub Actions Deployment (Recommended ⭐)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Convert portfolio to React + Vite for GitHub Pages"
   git push origin main
   ```
2. On GitHub, go to your repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! Every time you push to `main`, GitHub Actions will automatically build the Vite React app and publish it to GitHub Pages.

---

### Option 2: Manual Command Line Deployment (`gh-pages`)

1. Run the deploy command in your terminal:
   ```bash
   npm run deploy
   ```
2. On GitHub, go to your repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Branch**, select `gh-pages` and folder `/ (root)`.
4. Click **Save**.

---

## 📦 Asset Architecture
Images, SVGs, and PDFs are placed inside `/public/assets/` to ensure Vite bundles them with relative paths (`./assets/...`) so they load correctly on GitHub Pages regardless of your repository name.

# VOLT — Minimalist Cyber-Editorial Portfolio

> High-retention video editor & motion designer portfolio. Engineered to Awwwards Site-of-the-Day caliber and a $20,000 creative agency standard.

Developed by: **omar,_p** • [mfyo.online](https://mfyo.online)

---

## ⚡ Highlights & Features

- **Fullscreen 4K Video Preloader**: Seamless branded video introduction with real-time progress HUD and instant skip.
- **Unobstructed Retro CRT Canvas**: 4K butterfly timeline video loop with custom liquid-metal typography.
- **Interactive Channels Dock**: Logos, metrics, and instant-jump showcases for client channels (Built By Gamers, TheLastRamen, Mine Center, More Warpstone).
- **Segmented Filter Bar & Dynamic Metadata Strip**: Real-time category filtering (Gaming, Motion Graphics, Viral Shorts) with dynamic tool & term updates.
- **Interactive 3D Perspective Cards**: Cursor-reactive 3D spatial tilt and cyan spotlight tracking throttled to 60/120 FPS.
- **Native Lightbox Video Player**: Ad-free, clean HTML5 video player modal with vertical 9:16 and horizontal 16:9 aspect ratios.
- **Glassy "Let's Talk" Contact Modal**: WhatsApp direct link & one-click Discord handle copy with feedback toast.
- **Floating Glass Developer Badge**: Minimal frosted capsule linking to [mfyo.online](https://mfyo.online) following the page on the right.
- **Ultra-Smooth Butter Performance**: Pure hardware-accelerated transforms (`translate3d`), tuned Lenis momentum scrolling, zero layout thrashing.

---

## 📁 Project Structure

```text
Volt/
├── index.html                      # Main semantic HTML5 document
├── styles.css                      # Luxury cyber-glass design system & animations
├── app.js                          # Core interactive portfolio engine
├── vercel.json                     # Vercel deployment & video streaming headers
├── server.js                       # Local development HTTP server (range support)
├── hero section video/             # Fullscreen intro & ambient video loops
│   ├── Creating_loading_screen_for_logo_20260923133100.mp4
│   └── hero-loop.mp4
├── thumbnails/                     # Showcase video files and HD poster artwork
│   ├── new_jjs_update.mp4          # TikTok stream (New JJS Update)
│   ├── jogo_jjs_update.mp4         # TikTok stream (Jogo Added To JJS?)
│   ├── dynamic_narrative_cut.mp4   # Master Cut 16:9
│   ├── viral_vertical_short.mp4    # Short Cut 9:16
│   └── ...
├── logo/                           # Brand monograms & client logos
├── vendor/                         # Localized lightweight vendor libraries (Lenis)
└── README.md                       # Project documentation
```

---

## 🚀 Running Locally

### Option 1: Native Node.js Server (Recommended for video range requests)
```bash
node local-dev-server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Any Static Web Server
You can also use Python, VS Code Live Server, or Nginx:
```bash
python -m http.server 3000
# or
npx serve .
```

---

## 🌐 Deploying to Vercel

### Method 1: Connect with GitHub (Recommended)
1. Push this repository to GitHub (see GitHub setup below).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Leave build settings as default (Framework Preset: **Other**, Output Directory: `.`).
5. Click **"Deploy"**. Your site will be live with free global CDN and SSL!

### Method 2: Vercel CLI
```bash
npx vercel
# Follow prompts to link and deploy, then run for production:
npx vercel --prod
```

---

© 2026 VOLT. Built for high-retention storytelling.

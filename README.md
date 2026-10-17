# 🔮 Liquid Glass Icon Studio

> **iOS 26-inspired Liquid Glass Icon Generator for Android.**  
> Dark translucent circular glass bubbles, crisp white vector logos, subtle fluid refractions, frosted glass depth, realistic specular highlights, and natural rim lighting.

[![Deploy to GitHub Pages](https://github.com/VenZ9/Liquid-Glass-Icon-Studio/actions/workflows/deploy.yml/badge.svg)](https://github.com/VenZ9/Liquid-Glass-Icon-Studio/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-sky?style=flat&logo=github)](https://venz9.github.io/Liquid-Glass-Icon-Studio/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)

---

## ✨ Features

- **iOS 26 Liquid Glass Aesthetics**:
  - Dark translucent glass bubble physics with customizable darkness and opacity.
  - Specular curved liquid meniscus reflections and internal caustic bouncing.
  - Multi-layer frosted glass diffusion and light refraction.
  - Crescent rim lighting and delicate bevel highlights.
  - Realistic dual-layer ambient drop shadows.
- **53+ Curated App Presets**:
  - Claude, ChatGPT, Gemini, Grok, DeepSeek, Kimi AI, Qwen, Mistral.
  - SPCK Editor, Termux, Play Store, Roblox, Discord, Pinterest, ZArchiver.
  - Camera, Phone, Gallery, Microsoft Edge, Flipkart, Jio, IPPB, MX Player.
  - WhatsApp, Gmail, Meesho, Google, Background Remover, Chrome, YouTube.
  - Instagram, Clock, Snapchat, Snaptube, Threads, Reddit, Telegram, X.
  - Spotify, Netflix, Google Maps, Messages, Calculator, Settings, Files.
  - YouTube Studio, Alight Motion, Shazam, Auto Clicker, Speedtest, JioHotstar, Supreme Duelist, Blinkit.
- **Custom Logo Uploader**:
  - Upload any custom PNG or SVG image.
  - Automatic monochrome white filter for flawless iOS 26 aesthetics.
  - Saves custom icons to local storage.
- **Instant High-Res Exports**:
  - Single icon download: 512×512 transparent 32-bit RGBA PNG.
  - Batch export: Bundle all or selected icons into a ZIP archive with `jszip`.
- **Live Android Homescreen Mockup**:
  - Interactive phone shell with status bar, clock widget, Google search bar, 4×4 grid, and bottom dock.
  - Switchable wallpaper backdrops (Midnight OLED, Obsidian Aurora, Cosmic Violet, Emerald Forest, Cyber Dusk, or upload custom wallpaper).
- **Shortcut Maker Integration Guide**:
  - Step-by-step instructions to apply icons on Android via **Shortcut Maker** or custom launchers (Nova, Lawnchair, Smart Launcher, Samsung Good Lock Theme Park).
  - Pro tips on removing the shortcut arrow badge using Android widget mode.
- **Persistent Local Settings**:
  - All slider tweaks, curated styles, and custom uploaded icons persist via `localStorage`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 20 / 22 / 24)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/VenZ9/Liquid-Glass-Icon-Studio.git
cd Liquid-Glass-Icon-Studio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build & Test

```bash
# Run unit tests
npm test

# Build for production (outputs to ./dist)
npm run build

# Preview production build locally
npm run preview
```

---

## 📱 How to Apply Icons on Android

1. **Export PNGs**: Download individual icons or the full ZIP pack from Liquid Glass Icon Studio.
2. **Install Shortcut Maker**: Get [Shortcut Maker](https://play.google.com/store/apps/details?id=rk.android.app.shortcutmaker) from Google Play.
3. **Select App**: Open Shortcut Maker → Apps → Choose target app.
4. **Choose Icon**: Tap "Tap to Edit Label or Icon" → Select "Image (Gallery)" → Choose your 512×512 Liquid Glass PNG.
5. **Create Shortcut**: Tap checkmark → Tap "Create Shortcut" → Add to Home screen.
6. **Pro Tip (Zero Arrow Badge)**: Place a *Shortcut Maker 1×1 Widget* on your home screen instead of a standard shortcut to eliminate the Android watermark arrow!

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Archiving**: JSZip
- **Testing**: Vitest
- **CI/CD**: GitHub Actions → GitHub Pages

---

## 📄 License

MIT License. Designed and built with ❤️.

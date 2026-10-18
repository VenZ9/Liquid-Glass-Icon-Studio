import * as si from 'simple-icons';
import fs from 'fs';

async function fetchIcon(name) {
  const res = await fetch(`https://api.iconify.design/${name}.svg`);
  if (!res.ok) throw new Error(`Failed to fetch ${name}`);
  const text = await res.text();
  // Extract viewBox
  const vbMatch = text.match(/viewBox="([^"]+)"/);
  const viewBox = vbMatch ? vbMatch[1] : '0 0 24 24';
  
  // Extract all <path d="..." .../>
  const paths = [];
  const pathRegex = /<path[^>]+d="([^"]+)"/g;
  let match;
  while ((match = pathRegex.exec(text)) !== null) {
    paths.push(match[1]);
  }
  return { viewBox, paths };
}

async function buildAll() {
  console.log('Building full 53 apps dataset...');

  // Map of apps
  const apps = [
    // --- AI ---
    { id: 'claude', name: 'Claude', category: 'ai', icon: si.siClaude },
    { id: 'chatgpt', name: 'ChatGPT', category: 'ai', iconify: 'logos:openai-icon' },
    { id: 'gemini', name: 'Gemini', category: 'ai', icon: si.siGooglegemini },
    { id: 'grok', name: 'Grok', category: 'ai', iconify: 'hugeicons:grok' },
    { id: 'deepseek', name: 'DeepSeek', category: 'ai', icon: si.siDeepseek },
    { id: 'kimi-ai', name: 'Kimi AI', category: 'ai', icon: si.siKimi || null, iconify: 'simple-icons:kimi' },
    { id: 'qwen', name: 'Qwen', category: 'ai', icon: si.siQwen },
    { id: 'mistral', name: 'Mistral', category: 'ai', icon: si.siMistralai },

    // --- Tools & Dev ---
    { id: 'spck-editor', name: 'SPCK Editor', category: 'tools', iconify: 'arcticons:spck' },
    {
      id: 'termux',
      name: 'Termux',
      category: 'tools',
      viewBox: '0 0 108 108',
      paths: [
        'M34,38 h6 l12,16 l-12,16 h-6 l12,-16 Z',
        'M56,66 h18 v4 h-18 Z'
      ]
    },
    { id: 'play-store', name: 'Play Store', category: 'system', icon: si.siGoogleplay },
    { id: 'roblox', name: 'Roblox', category: 'gaming', icon: si.siRoblox },
    { id: 'discord', name: 'Discord', category: 'social', icon: si.siDiscord },
    { id: 'pinterest', name: 'Pinterest', category: 'social', icon: si.siPinterest },
    { id: 'zarchiver', name: 'ZArchiver', category: 'tools', iconify: 'arcticons:zarchiver' },
    
    // --- System ---
    {
      id: 'camera',
      name: 'Camera',
      category: 'system',
      viewBox: '0 0 24 24',
      paths: [
        'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10m-7-2h3l1.8-2h4.4L16 5h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-3.8l-1.8-2h-2.8L7.8 7z'
      ]
    },
    {
      id: 'phone',
      name: 'Phone',
      category: 'system',
      viewBox: '0 0 24 24',
      paths: [
        'M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z'
      ]
    },
    {
      id: 'gallery',
      name: 'Gallery',
      category: 'system',
      viewBox: '0 0 24 24',
      paths: [
        'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'
      ]
    },
    { id: 'microsoft-edge', name: 'Microsoft Edge', category: 'tools', iconify: 'logos:microsoft-edge' },
    { id: 'flipkart', name: 'Flipkart', category: 'shopping', iconify: 'arcticons:flipkart' },
    { id: 'jio', name: 'Jio', category: 'shopping', icon: si.siJio },
    { id: 'ippb', name: 'IPPB', category: 'shopping', iconify: 'arcticons:ippb-mobile' },
    { id: 'mx-player', name: 'MX Player', category: 'media', iconify: 'arcticons:mx' },
    { id: 'whatsapp', name: 'WhatsApp', category: 'social', icon: si.siWhatsapp },
    { id: 'gmail', name: 'Gmail', category: 'system', icon: si.siGmail },
    { id: 'meesho', name: 'Meesho', category: 'shopping', iconify: 'arcticons:meesho' },
    { id: 'google', name: 'Google', category: 'tools', icon: si.siGoogle },
    { id: 'background-remover', name: 'Background Remover', category: 'tools', iconify: 'arcticons:background-eraser' },
    { id: 'chrome', name: 'Chrome', category: 'tools', icon: si.siGooglechrome },
    { id: 'youtube', name: 'YouTube', category: 'media', icon: si.siYoutube },
    { id: 'instagram', name: 'Instagram', category: 'social', icon: si.siInstagram },
    {
      id: 'clock',
      name: 'Clock',
      category: 'system',
      viewBox: '0 0 24 24',
      paths: [
        'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.1.8-1.3-4.5-2.7V7z'
      ]
    },
    { id: 'snapchat', name: 'Snapchat', category: 'social', icon: si.siSnapchat },
    { id: 'snaptube', name: 'Snaptube', category: 'media', iconify: 'arcticons:snaptube' },
    { id: 'threads', name: 'Threads', category: 'social', icon: si.siThreads },
    { id: 'reddit', name: 'Reddit', category: 'social', icon: si.siReddit },
    { id: 'telegram', name: 'Telegram', category: 'social', icon: si.siTelegram },
    { id: 'x', name: 'X', category: 'social', icon: si.siX },
    { id: 'spotify', name: 'Spotify', category: 'media', icon: si.siSpotify },
    { id: 'netflix', name: 'Netflix', category: 'media', icon: si.siNetflix },
    { id: 'google-maps', name: 'Google Maps', category: 'tools', icon: si.siGooglemaps },
    {
      id: 'messages',
      name: 'Messages',
      category: 'social',
      viewBox: '0 0 24 24',
      paths: [
        'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z'
      ]
    },
    {
      id: 'calculator',
      name: 'Calculator',
      category: 'system',
      viewBox: '0 0 24 24',
      paths: [
        'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zM7 7h3v2H7zm0 4h3v2H7zm0 4h3v2H7zm4-8h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6z'
      ]
    },
    {
      id: 'settings',
      name: 'Settings',
      category: 'system',
      viewBox: '0 0 24 24',
      paths: [
        'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6'
      ]
    },
    {
      id: 'files',
      name: 'Files',
      category: 'tools',
      viewBox: '0 0 24 24',
      paths: [
        'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 12H4V8h16z'
      ]
    },
    { id: 'youtube-studio', name: 'YouTube Studio', category: 'tools', icon: si.siYoutubestudio },
    { id: 'alight-motion', name: 'Alight Motion', category: 'tools', iconify: 'arcticons:alight-motion' },
    { id: 'shazam', name: 'Shazam', category: 'media', icon: si.siShazam },
    { id: 'auto-clicker', name: 'Auto Clicker', category: 'tools', iconify: 'arcticons:auto-clicker' },
    { id: 'speedtest', name: 'Speedtest', category: 'tools', icon: si.siSpeedtest },
    { id: 'jiohotstar', name: 'JioHotstar', category: 'media', iconify: 'arcticons:jiohotstar' },
    { id: 'supreme-duelist', name: 'Supreme Duelist', category: 'gaming', iconify: 'arcticons:supreme-duelist-stickman' },
    { id: 'blinkit', name: 'Blinkit', category: 'shopping', iconify: 'arcticons:blinkit' }
  ];

  console.log(`Total apps to process: ${apps.length}`);

  const processed = [];

  for (const a of apps) {
    let viewBox = a.viewBox || '0 0 24 24';
    let paths = a.paths || [];
    let isStroked = false;

    if (a.icon) {
      viewBox = '0 0 24 24';
      paths = [a.icon.path];
    } else if (a.iconify) {
      try {
        const fetched = await fetchIcon(a.iconify);
        viewBox = fetched.viewBox;
        paths = fetched.paths;
        if (a.iconify.startsWith('arcticons:')) {
          isStroked = true;
        }
      } catch (e) {
        console.error(`Error fetching ${a.name}:`, e.message);
      }
    }

    processed.push({
      id: a.id,
      name: a.name,
      category: a.category,
      viewBox,
      paths,
      isStroked,
      keywords: [a.name.toLowerCase(), a.category]
    });
  }

  // Output file content
  const content = `import { AppPreset } from '../types';

export const APP_PRESETS: AppPreset[] = ${JSON.stringify(processed, null, 2)};
`;

  fs.writeFileSync('src/data/presets.ts', content, 'utf8');
  console.log(`Successfully generated src/data/presets.ts with ${processed.length} apps!`);
}

buildAll().catch(console.error);

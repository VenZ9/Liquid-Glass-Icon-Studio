import { AppPreset } from '../types';

export const APP_PRESETS: AppPreset[] = [
  // --- AI Category ---
  {
    id: 'claude',
    name: 'Claude',
    category: 'ai',
    description: 'Anthropic Claude AI Assistant',
    viewBox: '0 0 24 24',
    keywords: ['anthropic', 'claude', 'ai', 'llm', 'chat'],
    paths: [
      'M12 2a1 1 0 0 1 1 1v2.5a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm6.364 3.636a1 1 0 0 1 0 1.414l-1.768 1.768a1 1 0 0 1-1.414-1.414l1.768-1.768a1 1 0 0 1 1.414 0zM22 12a1 1 0 0 1-1 1h-2.5a1 1 0 0 1 0-2H21a1 1 0 0 1 1 1zm-3.636 6.364a1 1 0 0 1-1.414 0l-1.768-1.768a1 1 0 0 1 1.414-1.414l1.768 1.768a1 1 0 0 1 0 1.414zM12 22a1 1 0 0 1-1-1v-2.5a1 1 0 0 1 2 0V21a1 1 0 0 1-1 1zm-6.364-3.636a1 1 0 0 1 0-1.414l1.768-1.768a1 1 0 0 1 1.414 1.414l-1.768 1.768a1 1 0 0 1-1.414 0zM2 12a1 1 0 0 1 1-1h2.5a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm3.636-6.364a1 1 0 0 1 1.414 0l1.768 1.768a1 1 0 0 1-1.414 1.414L5.636 7.05a1 1 0 0 1 0-1.414zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z'
    ]
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'ai',
    description: 'OpenAI ChatGPT Intelligence',
    viewBox: '0 0 24 24',
    keywords: ['chatgpt', 'openai', 'gpt', 'ai', 'chatbot'],
    paths: [
      'M20.5 11.2c-.3-1.8-1.7-3.2-3.5-3.5-.4-.7-.9-1.3-1.6-1.7-1.4-.9-3.2-.8-4.5.2-1.3-.7-2.9-.6-4.1.2-1.2.8-1.8 2.2-1.7 3.6-.9.4-1.6 1.1-2 2-.8 1.5-.6 3.3.4 4.5.3 1.8 1.7 3.2 3.5 3.5.4.7.9 1.3 1.6 1.7 1.4.9 3.2.8 4.5-.2 1.3.7 2.9.6 4.1-.2 1.2-.8 1.8-2.2 1.7-3.6.9-.4 1.6-1.1 2-2 .8-1.4.6-3.1-.4-4.5zm-5.7 8.2c-.7.4-1.5.5-2.3.3l.5-1.9c.4.1.8.1 1.2-.1.8-.4 1.3-1.3 1.1-2.2l1.9.5c.3 1.5-.6 3-2.4 3.4zm4.4-4.8c-.3.7-.8 1.3-1.5 1.7l-.9-1.7c.4-.2.6-.5.8-.9.4-.8.1-1.8-.6-2.3l1.1-1.6c1.2.9 1.6 2.6 1.1 4.8zm-2.8-6.1l-1.3 1.4c-.3-.3-.7-.5-1.1-.6-.9-.2-1.8.3-2.2 1.1L10 9.8c.6-1.4 2.2-2.2 3.8-1.8.9.2 1.8.8 2.6 1.5zm-8.8-1.6c.7-.4 1.5-.5 2.3-.3l-.5 1.9c-.4-.1-.8-.1-1.2.1-.8.4-1.3 1.3-1.1 2.2l-1.9-.5c-.3-1.5.6-3 2.4-3.4zm-4.4 4.8c.3-.7.8-1.3 1.5-1.7l.9 1.7c-.4.2-.6.5-.8.9-.4.8-.1 1.8.6 2.3l-1.1 1.6c-1.2-.9-1.6-2.6-1.1-4.8zm6.5 4.7l1.3-1.4c.3.3.7.5 1.1.6.9.2 1.8-.3 2.2-1.1l1.8.6c-.6 1.4-2.2 2.2-3.8 1.8-.9-.2-1.8-.8-2.6-1.5z'
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'ai',
    description: 'Google Gemini Multimodal AI',
    viewBox: '0 0 24 24',
    keywords: ['gemini', 'google', 'bard', 'deepmind', 'ai'],
    paths: [
      'M12 2C12 7.523 7.523 12 2 12C7.523 12 12 16.477 12 22C12 16.477 16.477 12 22 12C16.477 12 12 7.523 12 2Z'
    ]
  },
  {
    id: 'grok',
    name: 'Grok',
    category: 'ai',
    description: 'xAI Grok Intelligence',
    viewBox: '0 0 24 24',
    keywords: ['grok', 'xai', 'elon', 'musk', 'ai'],
    paths: [
      'M4 4h4.5l4 6.5 4-6.5H20l-6.5 10.5L20 20h-4.5l-3.5-5.5L8.5 20H4l6.5-9.5L4 4z'
    ]
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    category: 'ai',
    description: 'DeepSeek AI & Reasoning Models',
    viewBox: '0 0 24 24',
    keywords: ['deepseek', 'r1', 'v3', 'ai', 'reasoning'],
    paths: [
      'M3.5 13.5c1.5-4 5.5-6.5 10-6 3.5.4 6.5 2.5 8 5.5-1.5 4-5.5 6.5-10 6-3.5-.4-6.5-2.5-8-5.5zm10-3c-2.5 0-4.5 1.8-4.5 4s2 4 4.5 4 4.5-1.8 4.5-4-2-4-4.5-4zm0 2c1.4 0 2.5 1 2.5 2s-1.1 2-2.5 2-2.5-1-2.5-2 1.1-2 2.5-2z'
    ]
  },
  {
    id: 'kimi-ai',
    name: 'Kimi AI',
    category: 'ai',
    description: 'Moonshot Kimi AI Assistant',
    viewBox: '0 0 24 24',
    keywords: ['kimi', 'moonshot', 'ai', 'assistant'],
    paths: [
      'M6 4h3.5v6.5L15 4h4.5l-6.5 7.5L20 20h-4.5l-4-6.5V20H6V4z'
    ]
  },
  {
    id: 'qwen',
    name: 'Qwen',
    category: 'ai',
    description: 'Alibaba Qwen Large Language Model',
    viewBox: '0 0 24 24',
    keywords: ['qwen', 'tongyi', 'alibaba', 'ai'],
    paths: [
      'M12 2L4 7v10l8 5 8-5V7l-8-5zm0 3.2L17.5 8 12 11.2 6.5 8 12 5.2zM6 9.8l5 2.9v5.7l-5-3.1V9.8zm12 5.5l-5 3.1v-5.7l5-2.9v5.5z'
    ]
  },
  {
    id: 'mistral',
    name: 'Mistral',
    category: 'ai',
    description: 'Mistral AI Frontier Models',
    viewBox: '0 0 24 24',
    keywords: ['mistral', 'lechat', 'ai', 'open-weights'],
    paths: [
      'M3 5h3v3H3V5zm15 0h3v3h-3V5zm-12 5h3v3H6v-3zm9 0h3v3h-3v-3zm-6 4h6v3H9v-3zm-6 4h3v3H3v-3zm15 0h3v3h-3v-3z'
    ]
  },

  // --- Tools & Developer Category ---
  {
    id: 'spck-editor',
    name: 'SPCK Editor',
    category: 'tools',
    description: 'Mobile Code & Web IDE',
    viewBox: '0 0 24 24',
    keywords: ['spck', 'code', 'editor', 'html', 'javascript', 'ide'],
    paths: [
      'M8.5 7.5L4 12l4.5 4.5 1.4-1.4L6.8 12l3.1-3.1L8.5 7.5zm7 0L14.1 8.9l3.1 3.1-3.1 3.1 1.4 1.4 4.5-4.5-4.5-4.5zM13.2 5.5l-3.5 13h1.8l3.5-13h-1.8z'
    ]
  },
  {
    id: 'termux',
    name: 'Termux',
    category: 'tools',
    description: 'Android Terminal Emulator & Linux Environment',
    viewBox: '0 0 24 24',
    keywords: ['termux', 'terminal', 'shell', 'bash', 'linux', 'cli'],
    paths: [
      'M4 5.5L11.5 12 4 18.5V15l4.5-3L4 9V5.5zm8 11.5h8v2h-8v-2z'
    ]
  },
  {
    id: 'play-store',
    name: 'Play Store',
    category: 'system',
    description: 'Google Play Store App Market',
    viewBox: '0 0 24 24',
    keywords: ['play', 'store', 'google', 'apps', 'android'],
    paths: [
      'M3.6 2.5a1.2 1.2 0 0 0-.6 1.1v16.8a1.2 1.2 0 0 0 .6 1.1l9.8-9.5L3.6 2.5zm11.3 8.3L12 13.7l2.9 2.9 4.3-2.5c1.2-.7 1.2-1.9 0-2.6l-4.3-2.7zM4.7 2.1l8.1 8.1-2 2-7.5-7.5c.4-.9.9-1.6 1.4-1.6zm8.1 11.7l-8.1 8.1c-.5 0-1-.7-1.4-1.6l7.5-7.5 2 2z'
    ]
  },
  {
    id: 'roblox',
    name: 'Roblox',
    category: 'gaming',
    description: 'Roblox Virtual Universe',
    viewBox: '0 0 24 24',
    keywords: ['roblox', 'game', 'metaverse', 'gaming'],
    paths: [
      'M5.4 2.8L2.8 18.6 18.6 21.2 21.2 5.4 5.4 2.8zm8.1 9.8l-3.2-.5.5-3.2 3.2.5-.5 3.2z'
    ]
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'social',
    description: 'Discord Voice & Text Chat',
    viewBox: '0 0 24 24',
    keywords: ['discord', 'chat', 'voice', 'gaming', 'community'],
    paths: [
      'M19.3 5.3a15.8 15.8 0 0 0-3.9-1.2.1.1 0 0 0-.1.1c-.2.3-.4.8-.5 1.1a14.7 14.7 0 0 0-5.6 0c-.2-.3-.4-.8-.5-1.1a.1.1 0 0 0-.1-.1 15.8 15.8 0 0 0-3.9 1.2.1.1 0 0 0 0 .1C2.3 8.9 1.6 12.4 2 15.8a.1.1 0 0 0 0 .1 16 16 0 0 0 4.8 2.4.1.1 0 0 0 .2-.1c.4-.5.7-1.1 1-1.7a.1.1 0 0 0-.1-.2 10.5 10.5 0 0 1-1.5-.7.1.1 0 0 1 0-.2c.1-.1.2-.2.3-.3a11.4 11.4 0 0 0 10.6 0c.1.1.2.2.3.3a.1.1 0 0 1 0 .2 10.5 10.5 0 0 1-1.5.7.1.1 0 0 0-.1.2c.3.6.6 1.2 1 1.7a.1.1 0 0 0 .2.1 16 16 0 0 0 4.8-2.4.1.1 0 0 0 0-.1c.5-4-0.8-7.5-2.8-10.5a.1.1 0 0 0 0-.1zM8.5 13.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2c1 0 1.8.9 1.8 2s-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2c1 0 1.8.9 1.8 2s-.8 2-1.8 2z'
    ]
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    category: 'social',
    description: 'Visual Inspiration & Idea Pinning',
    viewBox: '0 0 24 24',
    keywords: ['pinterest', 'pins', 'ideas', 'photo', 'design'],
    paths: [
      'M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.1-2.1.1-3 .2-.8 1.4-5.9 1.4-5.9s-.4-.7-.4-1.8c0-1.7 1-2.9 2.2-2.9 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.2 0 3.8-2.3 3.8-5.6 0-2.9-2.1-5-5.1-5-3.5 0-5.5 2.6-5.5 5.3 0 1 .4 2.2 1 2.8.1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.3-.3.4-.6.2-2.1-1-3.4-4-3.4-6.4 0-5.2 3.8-10 10.9-10 5.7 0 10.2 4.1 10.2 9.5 0 5.7-3.6 10.3-8.6 10.3-1.7 0-3.3-.9-3.8-2l-1 4c-.4 1.5-1.4 3.3-2.1 4.4A10 10 0 0 0 12 22a10 10 0 0 0 0-20z'
    ]
  },
  {
    id: 'zarchiver',
    name: 'ZArchiver',
    category: 'tools',
    description: 'Archive File Manager & Extractor (ZIP, 7z, RAR)',
    viewBox: '0 0 24 24',
    keywords: ['zarchiver', 'zip', 'rar', 'archive', 'unzip', 'compress'],
    paths: [
      'M4 4h16v16H4V4zm2 2v3h3V6H6zm5 0v3h2V6h-2zm4 0v3h3V6h-3zm-9 5v3h3v-3H6zm5 0v3h2v-3h-2zm4 0v3h3v-3h-3zm-9 5v3h3v-3H6zm5 0v3h2v-3h-2zm4 0v3h3v-3h-3z'
    ]
  },
  {
    id: 'camera',
    name: 'Camera',
    category: 'system',
    description: 'System Camera & Video Recorder',
    viewBox: '0 0 24 24',
    keywords: ['camera', 'photo', 'picture', 'system', 'video'],
    paths: [
      'M9 4L7.5 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L15 4H9zm3 13a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
    ]
  },
  {
    id: 'phone',
    name: 'Phone',
    category: 'system',
    description: 'Dialer & Voice Calls',
    viewBox: '0 0 24 24',
    keywords: ['phone', 'call', 'dialer', 'system', 'contact'],
    paths: [
      'M6.6 3.5a1.5 1.5 0 0 1 1.6-.2l3 1.5a1.5 1.5 0 0 1 .8 1.5l-.6 2.8a12.5 12.5 0 0 0 4.8 4.8l2.8-.6a1.5 1.5 0 0 1 1.5.8l1.5 3a1.5 1.5 0 0 1-.2 1.6l-2.4 2.4c-1.3 1.3-3.4 1.5-5 .6a21.4 21.4 0 0 1-9.4-9.4c-.9-1.6-.7-3.7.6-5L6.6 3.5z'
    ]
  },
  {
    id: 'gallery',
    name: 'Gallery',
    category: 'system',
    description: 'Photo Gallery & Albums',
    viewBox: '0 0 24 24',
    keywords: ['gallery', 'photos', 'album', 'images', 'system'],
    paths: [
      'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5zM8 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'
    ]
  },
  {
    id: 'microsoft-edge',
    name: 'Microsoft Edge',
    category: 'tools',
    description: 'Fast & Secure Web Browser',
    viewBox: '0 0 24 24',
    keywords: ['edge', 'microsoft', 'browser', 'web', 'internet'],
    paths: [
      'M12 2a10 10 0 0 0-10 10c0 4.2 2.6 7.8 6.3 9.3-.3-.9-.4-1.8-.4-2.8 0-3.5 2.5-6.5 6-7.1 2.3-.4 4.5.3 6 1.8.1-1.2-.2-2.3-.8-3.3-1.6-2.7-4.6-4.5-8-4.5-.4 0-.8 0-1.2.1C11.5 3.3 13.6 2 16 2a10 10 0 0 0-4 0zm0 13c-2.2 0-4 1.8-4 4 0 1.5.8 2.8 2 3.5 1.2.7 2.6.9 4 .5 3.2-1 5.3-3.9 5.3-7.2 0-.2 0-.4 0-.6-1.5 1.6-3.8 2.3-6 2.3-.4 0-.9 0-1.3-.1v-2.4z'
    ]
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    category: 'shopping',
    description: 'Online Shopping & Deals',
    viewBox: '0 0 24 24',
    keywords: ['flipkart', 'shopping', 'ecommerce', 'store', 'buy'],
    paths: [
      'M5 6h14l-1.5 14H6.5L5 6zm7-4a3.5 3.5 0 0 0-3.5 3.5H10A2 2 0 0 1 12 3.5a2 2 0 0 1 2 2h1.5A3.5 3.5 0 0 0 12 2zm-1 8h-2v2h2v4h2v-4h2v-2h-2V9.5c0-.6.4-1 1-1h1V7h-1.5a2.5 2.5 0 0 0-2.5 2.5V10z'
    ]
  },
  {
    id: 'jio',
    name: 'Jio',
    category: 'shopping',
    description: 'Reliance Jio Digital Services',
    viewBox: '0 0 24 24',
    keywords: ['jio', 'reliance', 'telecom', 'myjio', 'recharge'],
    paths: [
      'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.8 14.5c-1.3 0-2.2-.9-2.2-2.2v-4.8h1.8v4.6c0 .4.3.7.7.7s.7-.3.7-.7V9.5h1.8v4.8c0 1.3-.9 2.2-2.2 2.2zm4.5 0c-1.5 0-2.5-1.1-2.5-2.6v-2.3c0-1.5 1-2.6 2.5-2.6s2.5 1.1 2.5 2.6v2.3c0 1.5-1 2.6-2.5 2.6zm0-1.7c.5 0 .8-.5.8-1.1v-1.9c0-.6-.3-1.1-.8-1.1s-.8.5-.8 1.1v1.9c0 .6.3 1.1.8 1.1z'
    ]
  },
  {
    id: 'ippb',
    name: 'IPPB',
    category: 'shopping',
    description: 'India Post Payments Bank',
    viewBox: '0 0 24 24',
    keywords: ['ippb', 'post', 'bank', 'india', 'money', 'payments'],
    paths: [
      'M12 2L2 7v3h20V7L12 2zm-7 9v7h3v-7H5zm5 0v7h4v-7h-4zm6 0v7h3v-7h-3zM2 20v2h20v-2H2z'
    ]
  },
  {
    id: 'mx-player',
    name: 'MX Player',
    category: 'media',
    description: 'Video Player & Streaming',
    viewBox: '0 0 24 24',
    keywords: ['mx', 'player', 'video', 'movie', 'media'],
    paths: [
      'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2.5 5.5l7 4.5-7 4.5V7.5z'
    ]
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'social',
    description: 'Messaging & Calls by Meta',
    viewBox: '0 0 24 24',
    keywords: ['whatsapp', 'meta', 'chat', 'call', 'message'],
    paths: [
      'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.7 14.3c-.2.7-1.3 1.3-1.8 1.4-.5.1-1.1.2-3.2-.7-2.6-1.1-4.3-3.7-4.4-3.8-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2.1 1-2.4.3-.3.6-.4.9-.4.2 0 .4 0 .6.1.2.4.7 1.8.8 2 .1.1.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.3-.1.7.5.9 1.4 1.7 2.3 2.2.4.2.7.2.9-.1.2-.3.7-.8.9-1.1.2-.3.4-.2.7-.1.3.1 1.9.9 2.2 1.1.3.2.5.3.6.4.1.2.1.8-.1 1.5z'
    ]
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'system',
    description: 'Google Email Service',
    viewBox: '0 0 24 24',
    keywords: ['gmail', 'google', 'email', 'mail', 'inbox'],
    paths: [
      'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
    ]
  },
  {
    id: 'meesho',
    name: 'Meesho',
    category: 'shopping',
    description: 'Affordable Online Fashion & Home Shopping',
    viewBox: '0 0 24 24',
    keywords: ['meesho', 'shopping', 'clothes', 'fashion', 'deals'],
    paths: [
      'M4 7h16l-1.5 13.5a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5L4 7zm4.5 4v2a3.5 3.5 0 0 0 7 0v-2h-2v2a1.5 1.5 0 0 1-3 0v-2h-2zM9 4a3 3 0 0 1 6 0h2a5 5 0 0 0-10 0h2z'
    ]
  },
  {
    id: 'google',
    name: 'Google',
    category: 'tools',
    description: 'Google Search & Discover',
    viewBox: '0 0 24 24',
    keywords: ['google', 'search', 'alphabet', 'web', 'discover'],
    paths: [
      'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10h-10v4h5.8c-.5 2.5-2.6 4-5.8 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.6 0 3 .6 4.1 1.7l2.8-2.8C17.2 3.3 14.8 2 12 2z'
    ]
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    category: 'tools',
    description: 'AI Image Background Cutout & Eraser',
    viewBox: '0 0 24 24',
    keywords: ['cutout', 'bg', 'remover', 'eraser', 'transparent', 'png'],
    paths: [
      'M14.5 2.5l7 7L19 12l-7-7 2.5-2.5zm-5 5L4 13v7h7l5.5-5.5-7-7zm-1 8.5l-2-2 4-4 2 2-4 4zM2 20h20v2H2v-2z'
    ]
  },
  {
    id: 'chrome',
    name: 'Chrome',
    category: 'tools',
    description: 'Google Chrome Fast Web Browser',
    viewBox: '0 0 24 24',
    keywords: ['chrome', 'google', 'browser', 'web', 'internet'],
    paths: [
      'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 6a4 4 0 1 1-4 4 4 4 0 0 1 4-4zm-8 4a8 8 0 0 1 3.5-6.6L10.7 11H7a5.9 5.9 0 0 0-3 1zm8 8a8 8 0 0 1-6.6-3.5L9.6 13a5.9 5.9 0 0 0 2.4 2.8v4.2zm6.6-3.5A8 8 0 0 1 12 20v-4.2a5.9 5.9 0 0 0 3.6-2.1l3.6 2.8h-.6z'
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'media',
    description: 'Online Video Sharing & Music',
    viewBox: '0 0 24 24',
    keywords: ['youtube', 'video', 'google', 'media', 'stream'],
    paths: [
      'M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z'
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'social',
    description: 'Photo & Video Sharing by Meta',
    viewBox: '0 0 24 24',
    keywords: ['instagram', 'reels', 'meta', 'social', 'photo'],
    paths: [
      'M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.7 1.6 4.8 4.8.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.6 4.7-4.8 4.8-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.2-.1-4.7-1.6-4.8-4.8-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-3.2 1.6-4.7 4.8-4.8 1.2-.1 1.6-.1 4.8-.1zm0 2.2c-3.1 0-3.5 0-4.7.1-2.4.1-3.4 1.1-3.5 3.5-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 2.4 1.1 3.4 3.5 3.5 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c2.4-.1 3.4-1.1 3.5-3.5.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-2.4-1.1-3.4-3.5-3.5-1.2-.1-1.6-.1-4.7-.1zm0 3.6a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 2.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zm6.4-3.8a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0z'
    ]
  },
  {
    id: 'clock',
    name: 'Clock',
    category: 'system',
    description: 'Alarm, Timer, Stopwatch & World Clock',
    viewBox: '0 0 24 24',
    keywords: ['clock', 'alarm', 'timer', 'time', 'system'],
    paths: [
      'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm.5-13h-1.5v6l5.2 3.1.8-1.3-4.5-2.7V7z'
    ]
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    category: 'social',
    description: 'Instant Snaps, Filters & Stories',
    viewBox: '0 0 24 24',
    keywords: ['snapchat', 'snaps', 'ghost', 'camera', 'chat'],
    paths: [
      'M12 2.5c-3.3 0-5.4 2.4-5.4 5.3 0 .7.2 1.9.3 2.3-.6.2-1.7.6-2.1 1.5-.3.6.1 1.2.6 1.4.9.4 1.8.2 2.3-.2.3.8 1 1.5 2 1.8-.7.4-1.9.9-2.2 1.8-.3.8.3 1.5 1.5 1.6 1.3.1 2.5-.5 3-.9.5.4 1.7 1 3 .9 1.2-.1 1.8-.8 1.5-1.6-.3-.9-1.5-1.4-2.2-1.8 1-.3 1.7-1 2-1.8.5.4 1.4.6 2.3.2.5-.2.9-.8.6-1.4-.4-.9-1.5-1.3-2.1-1.5.1-.4.3-1.6.3-2.3 0-2.9-2.1-5.3-5.4-5.3z'
    ]
  },
  {
    id: 'snaptube',
    name: 'Snaptube',
    category: 'media',
    description: 'Video & Audio Downloader',
    viewBox: '0 0 24 24',
    keywords: ['snaptube', 'video', 'download', 'media', 'audio'],
    paths: [
      'M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm-1 5h2v6h3l-4 4-4-4h3V8zm-5 11v-1.5h12V19H6z'
    ]
  },
  {
    id: 'threads',
    name: 'Threads',
    category: 'social',
    description: 'Threads Text Conversation by Instagram',
    viewBox: '0 0 24 24',
    keywords: ['threads', 'meta', 'instagram', 'twitter', 'social'],
    paths: [
      'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.5 12.3c-.6 2.2-2.3 3.2-4.5 3.2-3.1 0-5-2.2-5-5.5s2.1-5.5 5.2-5.5c2.9 0 4.8 1.8 5 4.3h-2.1c-.2-1.4-1.3-2.3-2.9-2.3-1.9 0-3 1.4-3 3.5s1.1 3.5 3 3.5c1.4 0 2.4-.7 2.7-1.9h-2.7v-1.8h4.6v2.5z'
    ]
  },
  {
    id: 'reddit',
    name: 'Reddit',
    category: 'social',
    description: 'Dive Into Anything & Online Communities',
    viewBox: '0 0 24 24',
    keywords: ['reddit', 'snoo', 'community', 'forum', 'upvote'],
    paths: [
      'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm6.2 11.2c0 .2 0 .4-.1.6-1.1 2.2-3.6 3.2-6.1 3.2s-5-1-6.1-3.2c-.1-.2-.1-.4-.1-.6.7-.4 1.2-1.2 1.2-2 0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4c0 1.2.9 2.1 2 2.3.8 2.3 3.5 3.9 6.8 4 0 .3.2.6.4.8.4.4.9.6 1.5.6.8 0 1.5-.4 1.8-1 .4.1.8.2 1.2.2 3.3-.1 6-1.7 6.8-4 1.1-.2 2-1.1 2-2.3 0-1.3-1.1-2.4-2.4-2.4s-2.4 1.1-2.4 2.4c0 .8.5 1.6 1.2 2zm-8.7-1.7c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2zm5 0c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2zm-4.3 4.2c.7.5 1.7.8 2.8.8s2.1-.3 2.8-.8l.7.7c-.9.7-2.1 1.1-3.5 1.1s-2.6-.4-3.5-1.1l.7-.7z'
    ]
  },
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'social',
    description: 'Fast, Cloud-Based & Encrypted Messaging',
    viewBox: '0 0 24 24',
    keywords: ['telegram', 'chat', 'channel', 'bot', 'cloud'],
    paths: [
      'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5.2 6.8l-1.9 9c-.1.6-.5.8-1 .5l-2.8-2.1-1.3 1.3c-.1.1-.3.3-.6.3l.2-2.8 5.1-4.6c.2-.2 0-.3-.3-.1l-6.3 4-2.7-.9c-.6-.2-.6-.6.1-.9l10.6-4.1c.5-.2.9.1.7.7z'
    ]
  },
  {
    id: 'x',
    name: 'X',
    category: 'social',
    description: 'X (Formerly Twitter) Real-Time Platform',
    viewBox: '0 0 24 24',
    keywords: ['x', 'twitter', 'tweet', 'social', 'news'],
    paths: [
      'M18.2 3h3.1l-6.8 7.8L22.5 21h-6.3l-4.9-6.4L5.6 21H2.5l7.3-8.3L2 3h6.5l4.4 5.9L18.2 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.5 14.5z'
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'media',
    description: 'Music & Podcast Streaming',
    viewBox: '0 0 24 24',
    keywords: ['spotify', 'music', 'songs', 'podcast', 'audio'],
    paths: [
      'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.6 14.4c-.2.3-.6.4-.9.2-2.4-1.5-5.5-1.8-9.1-1-.4.1-.7-.2-.8-.5-.1-.4.2-.7.5-.8 4-.9 7.4-.6 10.1 1.1.3.3.4.7.2 1zm1.2-2.7c-.3.4-.8.5-1.2.3-2.8-1.7-7-2.2-10.3-1.2-.4.1-.9-.1-1-.6-.1-.4.1-.9.6-1 3.8-1.1 8.4-.6 11.6 1.4.4.2.5.7.3 1.1zm.1-2.9c-3.3-2-8.8-2.1-12-.1-.5.2-1.1 0-1.3-.5-.2-.5 0-1.1.5-1.3 3.7-2.3 9.7-2.1 13.5.2.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3z'
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'media',
    description: 'Movies, TV Shows & Documentaries',
    viewBox: '0 0 24 24',
    keywords: ['netflix', 'movies', 'series', 'stream', 'cinema'],
    paths: [
      'M5.5 3h3.5v18H5.5V3zm9.5 0h3.5v18H15V3zM9 3l6 18h-2.5L7 3H9z'
    ]
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    category: 'tools',
    description: 'GPS Navigation, Traffic & Places',
    viewBox: '0 0 24 24',
    keywords: ['maps', 'google', 'gps', 'navigation', 'location', 'travel'],
    paths: [
      'M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.3 7.5 12.5 7.5 12.5s7.5-7.2 7.5-12.5A7.5 7.5 0 0 0 12 2zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z'
    ]
  },
  {
    id: 'messages',
    name: 'Messages',
    category: 'social',
    description: 'SMS, MMS & RCS Chat',
    viewBox: '0 0 24 24',
    keywords: ['messages', 'sms', 'chat', 'rcs', 'text'],
    paths: [
      'M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z'
    ]
  },
  {
    id: 'calculator',
    name: 'Calculator',
    category: 'system',
    description: 'Scientific & Standard Calculations',
    viewBox: '0 0 24 24',
    keywords: ['calculator', 'math', 'calc', 'plus', 'minus', 'system'],
    paths: [
      'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-8 4v2H7V7h4zm0 6H7v-2h4v2zm0 4H7v-2h4v2zm6 0h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z'
    ]
  },
  {
    id: 'settings',
    name: 'Settings',
    category: 'system',
    description: 'System Preferences & Configuration',
    viewBox: '0 0 24 24',
    keywords: ['settings', 'config', 'gear', 'preferences', 'system'],
    paths: [
      'M19.4 13c.1-.3.1-.7.1-1s0-.7-.1-1l2.1-1.7c.2-.2.2-.4.1-.6l-2-3.5c-.1-.2-.4-.3-.6-.2l-2.5 1c-.5-.4-1.1-.8-1.8-1l-.4-2.6c0-.2-.3-.4-.5-.4h-4c-.3 0-.5.2-.5.4l-.4 2.6c-.7.2-1.3.6-1.8 1l-2.5-1c-.2-.1-.5 0-.6.2l-2 3.5c-.1.2 0 .5.1.6l2.1 1.7c-.1.3-.1.7-.1 1s0 .7.1 1l-2.1 1.7c-.2.2-.2.4-.1.6l2 3.5c.1.2.4.3.6.2l2.5-1c.5.4 1.1.8 1.8 1l.4 2.6c0 .2.3.4.5.4h4c.3 0 .5-.2.5-.4l.4-2.6c.7-.2 1.3-.6 1.8-1l2.5 1c.2.1.5 0 .6-.2l2-3.5c.1-.2 0-.5-.1-.6l-2.1-1.7zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z'
    ]
  },
  {
    id: 'files',
    name: 'Files',
    category: 'tools',
    description: 'File Manager & Cloud Storage',
    viewBox: '0 0 24 24',
    keywords: ['files', 'folder', 'storage', 'directory', 'explorer'],
    paths: [
      'M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z'
    ]
  },
  {
    id: 'youtube-studio',
    name: 'YouTube Studio',
    category: 'tools',
    description: 'Creator Analytics & Video Management',
    viewBox: '0 0 24 24',
    keywords: ['studio', 'youtube', 'creator', 'analytics', 'video'],
    paths: [
      'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1.8 5.5l5.5 3.5-5.5 3.5V7.5zm7.3 10.3l-1.4 1.4-1.8-1.8 1.4-1.4 1.8 1.8zM6.5 16l1.8 1.8-1.4 1.4-1.8-1.8L6.5 16z'
    ]
  },
  {
    id: 'alight-motion',
    name: 'Alight Motion',
    category: 'tools',
    description: 'Motion Graphics & Pro Video Animation',
    viewBox: '0 0 24 24',
    keywords: ['alight', 'motion', 'animation', 'video', 'vfx', 'graphics'],
    paths: [
      'M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm4 11.5c-1.5 2-4 2.5-6.5 1.5-2.5-1-3.5-3.5-2.5-6 1-2.5 3.5-3.5 6-2.5 1.5.6 2.5 1.8 3 3h-2.2c-.4-.7-1-1.3-2-1.6-1.5-.6-3.2 0-3.8 1.5-.6 1.5 0 3.2 1.5 3.8 1.5.6 3.2 0 3.8-1.5H16v1.8z'
    ]
  },
  {
    id: 'shazam',
    name: 'Shazam',
    category: 'media',
    description: 'Instant Music Recognition & Finder',
    viewBox: '0 0 24 24',
    keywords: ['shazam', 'music', 'song', 'id', 'audio', 'find'],
    paths: [
      'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm2.8 7.3c-.8-.8-2-.8-2.8 0l-3.3 3.3a2 2 0 0 0 0 2.8c.8.8 2 .8 2.8 0l3.3-3.3c.8-.8.8-2 0-2.8z'
    ]
  },
  {
    id: 'auto-clicker',
    name: 'Auto Clicker',
    category: 'tools',
    description: 'Automated Screen Tapping & Macro Utility',
    viewBox: '0 0 24 24',
    keywords: ['clicker', 'auto', 'tap', 'macro', 'touch'],
    paths: [
      'M12 2a7 7 0 0 0-7 7c0 2.5 1.3 4.7 3.3 5.9L8 22h8l-.3-7.1c2-1.2 3.3-3.4 3.3-5.9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5c0 1.9-1.1 3.6-2.7 4.4L14 14v6h-4v-6l-.3-.6C8.1 12.6 7 10.9 7 9a5 5 0 0 1 5-5zm0 2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z'
    ]
  },
  {
    id: 'speedtest',
    name: 'Speedtest',
    category: 'tools',
    description: 'Ookla Network Speed & Latency Test',
    viewBox: '0 0 24 24',
    keywords: ['speedtest', 'ookla', 'wifi', 'internet', 'network', 'mbps'],
    paths: [
      'M12 4a10 10 0 0 0-9.8 12c.5 1.7 1.5 3.2 2.8 4.3l1.4-1.4A8 8 0 0 1 4 12a8 8 0 1 1 15.6 2.5l1.6 1.2A10 10 0 0 0 12 4zm0 5a3 3 0 0 0-3 3c0 .8.3 1.5.8 2l-3.3 3.3 1.4 1.4 3.3-3.3c.5.4 1.1.6 1.8.6a3 3 0 0 0 0-6v-1z'
    ]
  },
  {
    id: 'jiohotstar',
    name: 'JioHotstar',
    category: 'media',
    description: 'Cricket, Movies, Shows & Live Sports',
    viewBox: '0 0 24 24',
    keywords: ['hotstar', 'disney', 'jiohotstar', 'cricket', 'streaming', 'sports'],
    paths: [
      'M12 2l2.9 6.2 6.8.8-5 4.7 1.3 6.7-6-3.3-6 3.3 1.3-6.7-5-4.7 6.8-.8L12 2zm0 4.2l-1.8 3.8-4.2.5 3.1 2.9-.8 4.2 3.7-2 3.7 2-.8-4.2 3.1-2.9-4.2-.5L12 6.2z'
    ]
  },
  {
    id: 'supreme-duelist',
    name: 'Supreme Duelist',
    category: 'gaming',
    description: 'Stickman Combat & Weapon Duel Action',
    viewBox: '0 0 24 24',
    keywords: ['supreme', 'duelist', 'stickman', 'fighting', 'game'],
    paths: [
      'M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1 8v5l-4 3 1.2 1.6L12 17l3.8 2.6 1.2-1.6-4-3v-5h-2zm-6 2l3 3 1.4-1.4-3-3L5 12zm14 0l-1.4-1.4-3 3 1.4 1.4 3-3z'
    ]
  },
  {
    id: 'blinkit',
    name: 'Blinkit',
    category: 'shopping',
    description: 'Instant 10-Minute Grocery Delivery',
    viewBox: '0 0 24 24',
    keywords: ['blinkit', 'grocery', 'delivery', 'grofers', 'quick'],
    paths: [
      'M13 2L4 14h6l-1 8 9-12h-6l1-8z'
    ]
  }
];

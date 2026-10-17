import { describe, it, expect } from 'vitest';
import { APP_PRESETS } from '../data/presets';
import { STYLE_PRESETS } from '../data/wallpapers';
import { createShapePath, CANVAS_SIZE } from './canvasRenderer';
import { IconShape } from '../types';

describe('Liquid Glass Icon Studio Presets', () => {
  it('contains at least 53 app presets including all requested apps', () => {
    expect(APP_PRESETS.length).toBeGreaterThanOrEqual(53);

    const requiredAppIds = [
      'claude',
      'chatgpt',
      'gemini',
      'grok',
      'deepseek',
      'kimi-ai',
      'qwen',
      'mistral',
      'spck-editor',
      'termux',
      'play-store',
      'roblox',
      'discord',
      'pinterest',
      'zarchiver',
      'camera',
      'phone',
      'gallery',
      'microsoft-edge',
      'flipkart',
      'jio',
      'ippb',
      'mx-player',
      'whatsapp',
      'gmail',
      'meesho',
      'google',
      'background-remover',
      'chrome',
      'youtube',
      'instagram',
      'clock',
      'snapchat',
      'snaptube',
      'threads',
      'reddit',
      'telegram',
      'x',
      'spotify',
      'netflix',
      'google-maps',
      'messages',
      'calculator',
      'settings',
      'files',
      'youtube-studio',
      'alight-motion',
      'shazam',
      'auto-clicker',
      'speedtest',
      'jiohotstar',
      'supreme-duelist',
      'blinkit'
    ];

    const currentIds = APP_PRESETS.map(p => p.id);
    for (const reqId of requiredAppIds) {
      expect(currentIds).toContain(reqId);
    }
  });

  it('ensures each preset has a valid name, category, and non-empty paths', () => {
    for (const preset of APP_PRESETS) {
      expect(preset.name.trim().length).toBeGreaterThan(0);
      expect(['all', 'ai', 'social', 'media', 'tools', 'shopping', 'system', 'gaming']).toContain(preset.category);
      expect(preset.paths.length).toBeGreaterThan(0);
      for (const p of preset.paths) {
        expect(p.length).toBeGreaterThan(5);
      }
    }
  });

  it('defines valid curated style presets', () => {
    expect(STYLE_PRESETS.length).toBeGreaterThanOrEqual(4);
    for (const style of STYLE_PRESETS) {
      expect(style.settings.shape).toBeDefined();
      expect(style.settings.darkness).toBeGreaterThanOrEqual(0);
      expect(style.settings.darkness).toBeLessThanOrEqual(100);
      expect(style.settings.opacity).toBeGreaterThanOrEqual(10);
      expect(style.settings.opacity).toBeLessThanOrEqual(100);
    }
  });

  it('has consistent canvas size constants', () => {
    expect(CANVAS_SIZE).toBe(512);
  });

  it('supports all required icon shapes in path generator', () => {
    const mockCtx = {
      beginPath: () => {},
      arc: () => {},
      roundRect: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
    } as unknown as CanvasRenderingContext2D;

    const shapes: IconShape[] = ['circle', 'squircle', 'rounded-square', 'hexagon'];
    for (const shape of shapes) {
      expect(() => {
        createShapePath(mockCtx, shape, 256, 256, 200);
      }).not.toThrow();
    }
  });
});

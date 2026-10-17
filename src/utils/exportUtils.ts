import JSZip from 'jszip';
import { AppPreset, GlassSettings } from '../types';
import { renderIconToBlob } from './canvasRenderer';

/**
 * Download a Blob as a file in browser
 */
export function triggerFileDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Export a single icon as a transparent 512x512 PNG
 */
export async function exportSingleIcon(
  preset: AppPreset,
  settings: GlassSettings
): Promise<void> {
  const blob = await renderIconToBlob(preset, settings, 512);
  const cleanName = preset.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  triggerFileDownload(blob, `${cleanName}-liquid-glass-512.png`);
}

/**
 * Batch generate multiple icons and bundle them into a ZIP file
 */
export async function exportBatchAsZip(
  presets: AppPreset[],
  settings: GlassSettings,
  onProgress?: (current: number, total: number, appName: string) => void
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder('Liquid-Glass-Icons');

  const total = presets.length;
  for (let i = 0; i < total; i++) {
    const preset = presets[i];
    if (onProgress) {
      onProgress(i + 1, total, preset.name);
    }
    const blob = await renderIconToBlob(preset, settings, 512);
    const cleanName = preset.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    folder?.file(`${cleanName}-liquid-glass.png`, blob);
  }

  // Add README inside the ZIP with Shortcut Maker setup instructions
  const readmeContent = `# Liquid Glass Icon Pack (iOS 26 Style for Android)
Generated with Liquid Glass Icon Studio

## How to Apply on Android with Shortcut Maker:
1. Extract this ZIP to your device (Files or ZArchiver).
2. Install 'Shortcut Maker' from Google Play Store:
   https://play.google.com/store/apps/details?id=rk.android.app.shortcutmaker
3. Open Shortcut Maker -> Tap 'Apps' -> Choose your app.
4. Tap 'Tap to Edit Label or Icon' -> Tap 'Icon' -> Select 'Image (Gallery)'.
5. Browse and select the matching 512x512 Liquid Glass PNG.
6. Tap the checkmark -> Tap 'Create Shortcut' -> Add to Home screen.

Enjoy your sleek, dark translucent Liquid Glass home screen!
`;
  folder?.file('README-HOW-TO-APPLY.txt', readmeContent);

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  triggerFileDownload(zipBlob, `liquid-glass-icons-${total}-pack.zip`);
}

// LocalStorage Keys
const SETTINGS_KEY = 'liquid_glass_studio_settings';
const CUSTOM_ICONS_KEY = 'liquid_glass_custom_icons';

export function saveSettingsToLocal(settings: GlassSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Could not save settings to localStorage', e);
  }
}

export function loadSettingsFromLocal(fallback: GlassSettings): GlassSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (data) {
      return { ...fallback, ...JSON.parse(data) };
    }
  } catch (e) {
    console.warn('Could not load settings from localStorage', e);
  }
  return fallback;
}

export function saveCustomIconsToLocal(icons: AppPreset[]): void {
  try {
    localStorage.setItem(CUSTOM_ICONS_KEY, JSON.stringify(icons));
  } catch (e) {
    console.warn('Could not save custom icons to localStorage', e);
  }
}

export function loadCustomIconsFromLocal(): AppPreset[] {
  try {
    const data = localStorage.getItem(CUSTOM_ICONS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('Could not load custom icons from localStorage', e);
  }
  return [];
}

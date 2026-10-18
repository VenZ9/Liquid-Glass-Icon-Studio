import { WallpaperOption } from '../types';

export const WALLPAPER_OPTIONS: WallpaperOption[] = [
  {
    id: 'midnight-oled',
    name: 'Midnight OLED',
    type: 'minimal',
    background: 'radial-gradient(circle at 50% 30%, #151a26 0%, #06070a 75%, #000000 100%)',
    accentColor: '#38bdf8'
  },
  {
    id: 'obsidian-deep',
    name: 'Obsidian Aurora',
    type: 'gradient',
    background: 'linear-gradient(135deg, #090d16 0%, #111a2e 50%, #0b0f19 100%)',
    accentColor: '#6366f1'
  },
  {
    id: 'cosmic-purple',
    name: 'Cosmic Violet',
    type: 'gradient',
    background: 'radial-gradient(ellipse at 80% 20%, #2e1065 0%, #0f0728 50%, #030014 100%)',
    accentColor: '#a855f7'
  },
  {
    id: 'emerald-dark',
    name: 'Emerald Forest',
    type: 'gradient',
    background: 'linear-gradient(160deg, #022c22 0%, #061e1b 40%, #020908 100%)',
    accentColor: '#10b981'
  },
  {
    id: 'sunset-cyber',
    name: 'Cyber Dusk',
    type: 'abstract',
    background: 'linear-gradient(180deg, #1c1917 0%, #291528 55%, #0c0a09 100%)',
    accentColor: '#f43f5e'
  },
  {
    id: 'slate-minimal',
    name: 'Titanium Slate',
    type: 'minimal',
    background: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
    accentColor: '#94a3b8'
  }
];

export const STYLE_PRESETS = [
  {
    id: 'ios26-liquid-dark',
    name: 'iOS 26 Smoked Glass',
    description: 'Authentic dark translucent liquid bubble with crisp rim lighting & specular highlight',
    settings: {
      shape: 'circle' as const,
      darkness: 82,
      opacity: 92,
      frostBlur: 45,
      topHighlight: 75,
      rimLight: 80,
      bottomReflection: 40,
      tintColor: '#0a0d14',
      tintIntensity: 40,
      borderWidth: 1.2,
      borderOpacity: 30,
      logoSize: 44,
      logoOpacity: 100,
      logoGlow: 20,
      shadowOffset: 16,
      shadowBlur: 20,
      shadowOpacity: 65,
      specularAngle: 315,
    }
  },
  {
    id: 'obsidian-black',
    name: 'Pure Obsidian',
    description: 'Deep ultra-dark smoked glass with high-contrast sharp white rim and specular dot',
    settings: {
      shape: 'circle' as const,
      darkness: 95,
      opacity: 95,
      frostBlur: 25,
      topHighlight: 85,
      rimLight: 90,
      bottomReflection: 30,
      tintColor: '#040508',
      tintIntensity: 70,
      borderWidth: 1.2,
      borderOpacity: 35,
      logoSize: 44,
      logoOpacity: 100,
      logoGlow: 25,
      shadowOffset: 18,
      shadowBlur: 22,
      shadowOpacity: 75,
      specularAngle: 315,
    }
  },
  {
    id: 'sapphire-glow',
    name: 'Sapphire Liquid',
    description: 'Subtle cobalt-blue refraction deep inside the translucent dark glass sphere',
    settings: {
      shape: 'circle' as const,
      darkness: 80,
      opacity: 90,
      frostBlur: 50,
      topHighlight: 75,
      rimLight: 85,
      bottomReflection: 50,
      tintColor: '#0c1b33',
      tintIntensity: 65,
      borderWidth: 1.2,
      borderOpacity: 35,
      logoSize: 44,
      logoOpacity: 100,
      logoGlow: 35,
      shadowOffset: 16,
      shadowBlur: 22,
      shadowOpacity: 70,
      specularAngle: 320,
    }
  },
  {
    id: 'frosted-ice',
    name: 'Midnight Frost',
    description: 'Heavily frosted satin glass with gentle diffused bounce and soft perimeter',
    settings: {
      shape: 'circle' as const,
      darkness: 72,
      opacity: 86,
      frostBlur: 75,
      topHighlight: 60,
      rimLight: 70,
      bottomReflection: 60,
      tintColor: '#121926',
      tintIntensity: 45,
      borderWidth: 1.4,
      borderOpacity: 35,
      logoSize: 44,
      logoOpacity: 95,
      logoGlow: 15,
      shadowOffset: 14,
      shadowBlur: 20,
      shadowOpacity: 60,
      specularAngle: 310,
    }
  },
  {
    id: 'squircle-liquid',
    name: 'Liquid Squircle',
    description: 'iOS rounded squircle contour with liquid curvature and ambient edge illumination',
    settings: {
      shape: 'squircle' as const,
      darkness: 82,
      opacity: 92,
      frostBlur: 45,
      topHighlight: 75,
      rimLight: 80,
      bottomReflection: 40,
      tintColor: '#0b0e17',
      tintIntensity: 40,
      borderWidth: 1.2,
      borderOpacity: 35,
      logoSize: 44,
      logoOpacity: 100,
      logoGlow: 20,
      shadowOffset: 16,
      shadowBlur: 20,
      shadowOpacity: 65,
      specularAngle: 315,
    }
  }
];

export type IconCategory =
  | 'all'
  | 'ai'
  | 'social'
  | 'media'
  | 'tools'
  | 'shopping'
  | 'system'
  | 'gaming';

export type IconShape = 'circle' | 'squircle' | 'rounded-square' | 'hexagon';

export interface AppPreset {
  id: string;
  name: string;
  category: IconCategory;
  description?: string;
  viewBox: string;
  paths: string[]; // SVG path d attributes or raw svg snippets
  fillRule?: 'nonzero' | 'evenodd';
  keywords?: string[];
  isCustom?: boolean;
  customImageDataUrl?: string;
  isStroked?: boolean;
}

export interface GlassSettings {
  shape: IconShape;
  darkness: number;         // 0 - 100 (how deep dark the glass core is)
  opacity: number;          // 10 - 100 (translucency)
  frostBlur: number;        // 0 - 100 (frosted glass diffusion)
  topHighlight: number;     // 0 - 100 (top-left specular glare)
  rimLight: number;         // 0 - 100 (crescent meniscus rim highlight)
  bottomReflection: number; // 0 - 100 (subtle bottom bounce reflection)
  tintColor: string;        // Hex string
  tintIntensity: number;    // 0 - 100
  borderWidth: number;      // 0 - 8px
  borderOpacity: number;    // 0 - 100
  logoSize: number;         // 25 - 80 (% of icon diameter)
  logoOpacity: number;      // 30 - 100
  logoGlow: number;         // 0 - 100
  shadowOffset: number;     // 0 - 30px
  shadowBlur: number;       // 0 - 50px
  shadowOpacity: number;    // 0 - 100
  specularAngle: number;    // 0 - 360 degrees
}

export interface PresetStyle {
  id: string;
  name: string;
  description: string;
  settings: Partial<GlassSettings>;
}

export interface WallpaperOption {
  id: string;
  name: string;
  type: 'gradient' | 'abstract' | 'minimal' | 'custom';
  background: string; // CSS background value or image url
  accentColor: string;
}

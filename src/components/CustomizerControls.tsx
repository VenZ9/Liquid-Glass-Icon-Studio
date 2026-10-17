import React from 'react';
import { GlassSettings, IconShape } from '../types';
import { STYLE_PRESETS } from '../data/wallpapers';
import { Circle, Square, Hexagon, Sliders, Shield, Sun, Sparkles, Moon } from 'lucide-react';

interface CustomizerControlsProps {
  settings: GlassSettings;
  onChange: (newSettings: GlassSettings) => void;
  onApplyStylePreset: (presetSettings: Partial<GlassSettings>) => void;
}

export const CustomizerControls: React.FC<CustomizerControlsProps> = ({
  settings,
  onChange,
  onApplyStylePreset,
}) => {
  const update = <K extends keyof GlassSettings>(key: K, value: GlassSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  const TINT_SWATCHES = [
    { name: 'Onyx Dark', hex: '#0a0d14' },
    { name: 'Midnight Blue', hex: '#0a1324' },
    { name: 'Emerald Night', hex: '#081c15' },
    { name: 'Amethyst Deep', hex: '#160d24' },
    { name: 'Amber Smoked', hex: '#1c140a' },
    { name: 'Graphite Slate', hex: '#12141a' },
  ];

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-sky-400" />
          <h2 className="text-sm font-semibold text-white">Glass Physics & Appearance</h2>
        </div>
        <span className="text-[11px] text-neutral-400 font-mono">Real-Time Controls</span>
      </div>

      {/* 1. Curated Style Presets */}
      <div>
        <label className="text-xs font-medium text-neutral-300 block mb-2">
          Curated Presets:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {STYLE_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => onApplyStylePreset(p.settings)}
              className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-left transition flex flex-col gap-0.5 group"
            >
              <span className="text-xs font-semibold text-white group-hover:text-sky-300">
                {p.name}
              </span>
              <span className="text-[10px] text-neutral-400 line-clamp-1">
                {p.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Shape Selector */}
      <div className="border-t border-white/5 pt-4">
        <label className="text-xs font-medium text-neutral-300 block mb-2">
          Icon Geometry / Shape:
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(
            [
              { id: 'circle', label: 'Circle Bubble', icon: Circle },
              { id: 'squircle', label: 'Squircle', icon: Square },
              { id: 'rounded-square', label: 'R-Square', icon: Square },
              { id: 'hexagon', label: 'Hexagon', icon: Hexagon },
            ] as const
          ).map((item) => {
            const IconComp = item.icon;
            const isSelected = settings.shape === item.id;
            return (
              <button
                key={item.id}
                onClick={() => update('shape', item.id as IconShape)}
                className={`py-2 px-2 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-200 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                    : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span className="text-[11px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Glass Translucency & Darkness */}
      <div className="border-t border-white/5 pt-4 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Moon className="w-3.5 h-3.5 text-sky-400" />
          <h3 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
            Glass Darkness & Frost
          </h3>
        </div>

        {/* Darkness */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Glass Core Darkness</span>
            <span className="font-mono text-sky-400">{settings.darkness}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            value={settings.darkness}
            onChange={(e) => update('darkness', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Translucency Opacity */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Translucent Opacity</span>
            <span className="font-mono text-sky-400">{settings.opacity}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={settings.opacity}
            onChange={(e) => update('opacity', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Frosted Diffusion */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Frosted Glass Diffusion</span>
            <span className="font-mono text-sky-400">{settings.frostBlur}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.frostBlur}
            onChange={(e) => update('frostBlur', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Tint Color & Swatches */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-300">Glass Tint Shade:</span>
            <span className="font-mono text-neutral-400 text-[11px]">{settings.tintColor}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.tintColor}
              onChange={(e) => update('tintColor', e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-white/20 p-0"
              title="Custom Tint Color"
            />
            <div className="flex-1 flex items-center gap-1.5 overflow-x-auto">
              {TINT_SWATCHES.map((t) => (
                <button
                  key={t.name}
                  onClick={() => update('tintColor', t.hex)}
                  title={t.name}
                  className={`w-7 h-7 rounded-lg border transition ${
                    settings.tintColor.toLowerCase() === t.hex.toLowerCase()
                      ? 'border-sky-400 scale-105 shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: t.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Reflections & Highlights */}
      <div className="border-t border-white/5 pt-4 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <h3 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
            Reflections & Rim Light
          </h3>
        </div>

        {/* Top Meniscus Highlight */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Liquid Meniscus Highlight</span>
            <span className="font-mono text-sky-400">{settings.topHighlight}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.topHighlight}
            onChange={(e) => update('topHighlight', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Rim Light */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Rim Lighting Bevel</span>
            <span className="font-mono text-sky-400">{settings.rimLight}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.rimLight}
            onChange={(e) => update('rimLight', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Bottom Caustic Reflection */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Bottom Caustic Bounce</span>
            <span className="font-mono text-sky-400">{settings.bottomReflection}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.bottomReflection}
            onChange={(e) => update('bottomReflection', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* 5. Logo Customization */}
      <div className="border-t border-white/5 pt-4 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <h3 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
            White App Logo Emblem
          </h3>
        </div>

        {/* Logo Size */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Emblem Scale / Size</span>
            <span className="font-mono text-sky-400">{settings.logoSize}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="75"
            value={settings.logoSize}
            onChange={(e) => update('logoSize', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Logo Opacity */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Emblem Opacity</span>
            <span className="font-mono text-sky-400">{settings.logoOpacity}%</span>
          </div>
          <input
            type="range"
            min="40"
            max="100"
            value={settings.logoOpacity}
            onChange={(e) => update('logoOpacity', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Logo Backlight Glow */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Emblem Subtle Glow</span>
            <span className="font-mono text-sky-400">{settings.logoGlow}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.logoGlow}
            onChange={(e) => update('logoGlow', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* 6. Border & Realistic Shadows */}
      <div className="border-t border-white/5 pt-4 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-3.5 h-3.5 text-indigo-400" />
          <h3 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
            Border & Ambient Elevation
          </h3>
        </div>

        {/* Border Width */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Outer Border Width</span>
            <span className="font-mono text-sky-400">{settings.borderWidth}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={settings.borderWidth}
            onChange={(e) => update('borderWidth', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Border Opacity */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Border Opacity</span>
            <span className="font-mono text-sky-400">{settings.borderOpacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.borderOpacity}
            onChange={(e) => update('borderOpacity', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Drop Shadow Offset */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Shadow Elevation (Offset Y)</span>
            <span className="font-mono text-sky-400">{settings.shadowOffset}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="28"
            value={settings.shadowOffset}
            onChange={(e) => update('shadowOffset', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Shadow Blur */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Shadow Soft Blur</span>
            <span className="font-mono text-sky-400">{settings.shadowBlur}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="45"
            value={settings.shadowBlur}
            onChange={(e) => update('shadowBlur', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Shadow Opacity */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Shadow Opacity</span>
            <span className="font-mono text-sky-400">{settings.shadowOpacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.shadowOpacity}
            onChange={(e) => update('shadowOpacity', Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

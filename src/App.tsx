import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { IconPreview } from './components/IconPreview';
import { CustomizerControls } from './components/CustomizerControls';
import { AppGrid } from './components/AppGrid';
import { PhoneMockup } from './components/PhoneMockup';
import { CustomLogoUploader } from './components/CustomLogoUploader';
import { ShortcutMakerGuide } from './components/ShortcutMakerGuide';
import { BatchExportModal } from './components/BatchExportModal';
import { APP_PRESETS } from './data/presets';
import { STYLE_PRESETS } from './data/wallpapers';
import { AppPreset, GlassSettings, IconCategory } from './types';
import {
  loadSettingsFromLocal,
  saveSettingsToLocal,
  loadCustomIconsFromLocal,
  saveCustomIconsToLocal,
} from './utils/exportUtils';
import { Sliders, Grid, Smartphone, HelpCircle } from 'lucide-react';

const DEFAULT_SETTINGS: GlassSettings = STYLE_PRESETS[0].settings as GlassSettings;

export function App() {
  const [presets, setPresets] = useState<AppPreset[]>(() => {
    const custom = loadCustomIconsFromLocal();
    return [...APP_PRESETS, ...custom];
  });

  const [activePreset, setActivePreset] = useState<AppPreset>(presets[0]);
  const [settings, setSettings] = useState<GlassSettings>(() => {
    return loadSettingsFromLocal(DEFAULT_SETTINGS);
  });

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    return new Set(presets.map((p) => p.id));
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<IconCategory>('all');
  const [activeTab, setActiveTab] = useState<'studio' | 'library' | 'phone'>('studio');

  // Modals
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isCustomUploadOpen, setIsCustomUploadOpen] = useState(false);

  // Sync settings to localStorage
  useEffect(() => {
    saveSettingsToLocal(settings);
  }, [settings]);

  const handleSettingsChange = (newSettings: GlassSettings) => {
    setSettings(newSettings);
  };

  const handleApplyStylePreset = (presetSettings: Partial<GlassSettings>) => {
    setSettings((prev) => ({ ...prev, ...presetSettings }));
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    saveSettingsToLocal(DEFAULT_SETTINGS);
  };

  const handleToggleSelectId = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = (ids: string[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleAddCustomPreset = (newPreset: AppPreset) => {
    const updated = [newPreset, ...presets];
    setPresets(updated);
    setActivePreset(newPreset);
    setSelectedIds((prev) => new Set(prev).add(newPreset.id));

    // Save only custom presets to local storage
    const customOnly = updated.filter((p) => p.isCustom);
    saveCustomIconsToLocal(customOnly);
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-neutral-100 flex flex-col font-sans selection:bg-sky-500/30">
      {/* Background radial ambient highlights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[160px]" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[160px]" />
      </div>

      {/* Top Navigation */}
      <Navbar
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenBatchExport={() => setIsBatchModalOpen(true)}
        onResetSettings={handleResetSettings}
        selectedCount={selectedIds.size}
        totalCount={presets.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 space-y-6">
        {/* Navigation Tabs (Mobile & Quick Switcher) */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/5">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'studio'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Studio & Customizer</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'library'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>53 Apps Library</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
                {presets.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('phone')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'phone'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phone Mockup</span>
            </button>
          </div>

          <button
            onClick={() => setIsGuideOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-xs text-neutral-400 hover:text-sky-300 transition"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Shortcut Maker Guide</span>
          </button>
        </div>

        {/* Tab 1: Studio & Customizer */}
        {activeTab === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Live 512x512 Preview */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <IconPreview
                preset={activePreset}
                settings={settings}
                onOpenGuide={() => setIsGuideOpen(true)}
              />

              {/* Quick App Switcher Strip under preview */}
              <div className="glass-panel rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-neutral-300">
                    Quick App Switcher:
                  </span>
                  <button
                    onClick={() => setActiveTab('library')}
                    className="text-[11px] text-sky-400 hover:underline"
                  >
                    View All {presets.length} →
                  </button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {presets.slice(0, 12).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePreset(p)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition border ${
                        activePreset.id === p.id
                          ? 'bg-sky-500/20 text-sky-300 border-sky-400'
                          : 'bg-white/5 text-neutral-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Customizer Sliders */}
            <div className="lg:col-span-7">
              <CustomizerControls
                settings={settings}
                onChange={handleSettingsChange}
                onApplyStylePreset={handleApplyStylePreset}
              />
            </div>
          </div>
        )}

        {/* Tab 2: 53 Apps Library */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <AppGrid
              presets={presets}
              activePreset={activePreset}
              onSelectPreset={(p) => {
                setActivePreset(p);
                // Switch back to studio or preview
                setActiveTab('studio');
              }}
              selectedIds={selectedIds}
              onToggleSelectId={handleToggleSelectId}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              settings={settings}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onOpenCustomUpload={() => setIsCustomUploadOpen(true)}
            />
          </div>
        )}

        {/* Tab 3: Phone Mockup */}
        {activeTab === 'phone' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 flex justify-center">
              <PhoneMockup
                presets={presets}
                activePreset={activePreset}
                onSelectPreset={(p) => {
                  setActivePreset(p);
                }}
                settings={settings}
              />
            </div>
            <div className="lg:col-span-7 space-y-6">
              <IconPreview
                preset={activePreset}
                settings={settings}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
              <CustomizerControls
                settings={settings}
                onChange={handleSettingsChange}
                onApplyStylePreset={handleApplyStylePreset}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#080a0f]/90 py-6 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-white font-medium">Liquid Glass Icon Studio</span>
            <span>— iOS 26 Inspired Dark Translucent Aesthetics for Android</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-white transition"
            >
              Shortcut Maker Guide
            </button>
            <a
              href="https://github.com/VenZ9/Liquid-Glass-Icon-Studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ShortcutMakerGuide
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <BatchExportModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        presets={presets}
        selectedIds={selectedIds}
        settings={settings}
      />

      <CustomLogoUploader
        isOpen={isCustomUploadOpen}
        onClose={() => setIsCustomUploadOpen(false)}
        onAddCustomPreset={handleAddCustomPreset}
      />
    </div>
  );
}

export default App;

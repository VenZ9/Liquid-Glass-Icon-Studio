import React, { useMemo } from 'react';
import { Search, CheckSquare, Square, Download, Plus, Sparkles } from 'lucide-react';
import { AppPreset, GlassSettings, IconCategory } from '../types';
import { exportSingleIcon } from '../utils/exportUtils';
import { LiquidGlassSvg } from './LiquidGlassSvg';

interface AppGridProps {
  presets: AppPreset[];
  activePreset: AppPreset;
  onSelectPreset: (preset: AppPreset) => void;
  selectedIds: Set<string>;
  onToggleSelectId: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onDeselectAll: () => void;
  settings: GlassSettings;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: IconCategory;
  onCategoryChange: (cat: IconCategory) => void;
  onOpenCustomUpload: () => void;
}

export const AppGrid: React.FC<AppGridProps> = ({
  presets,
  activePreset,
  onSelectPreset,
  selectedIds,
  onToggleSelectId,
  onSelectAll,
  onDeselectAll,
  settings,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  onOpenCustomUpload,
}) => {
  const CATEGORIES: { id: IconCategory; label: string }[] = [
    { id: 'all', label: 'All Apps' },
    { id: 'ai', label: 'AI & Chat' },
    { id: 'social', label: 'Social' },
    { id: 'media', label: 'Media' },
    { id: 'tools', label: 'Tools & Dev' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'system', label: 'System' },
    { id: 'gaming', label: 'Gaming' },
  ];

  // Filter presets based on category and search query
  const filteredPresets = useMemo(() => {
    return presets.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchKeywords = p.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchName || matchKeywords;
    });
  }, [presets, activeCategory, searchQuery]);

  const allFilteredSelected =
    filteredPresets.length > 0 &&
    filteredPresets.every((p) => selectedIds.has(p.id));

  const handleToggleSelectAll = () => {
    if (allFilteredSelected) {
      onDeselectAll();
    } else {
      onSelectAll(filteredPresets.map((p) => p.id));
    }
  };

  const handleQuickDownload = async (e: React.MouseEvent, preset: AppPreset) => {
    e.stopPropagation();
    try {
      await exportSingleIcon(preset, settings);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 space-y-4">
      {/* Top Bar: Search, Category Filters, Selection */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 53+ apps (e.g. Claude, Termux, Spotify, Jio)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
            >
              ×
            </button>
          )}
        </div>

        {/* Batch selection and custom upload buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSelectAll}
            className="px-3 py-2 text-xs font-medium rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition flex items-center gap-1.5"
          >
            {allFilteredSelected ? (
              <CheckSquare className="w-3.5 h-3.5 text-sky-400" />
            ) : (
              <Square className="w-3.5 h-3.5" />
            )}
            <span>{allFilteredSelected ? 'Deselect' : 'Select All'}</span>
            <span className="font-mono text-[11px] text-neutral-400">
              ({filteredPresets.length})
            </span>
          </button>

          <button
            onClick={onOpenCustomUpload}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-sky-300 hover:text-sky-200 transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Logo</span>
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((c) => {
          const isSelected = activeCategory === c.id;
          const count =
            c.id === 'all'
              ? presets.length
              : presets.filter((p) => p.category === c.id).length;

          return (
            <button
              key={c.id}
              onClick={() => onCategoryChange(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition border ${
                isSelected
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                  : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{c.label}</span>
              <span className="ml-1.5 text-[10px] opacity-60 font-mono">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Apps */}
      {filteredPresets.length === 0 ? (
        <div className="py-12 text-center text-neutral-400 space-y-2">
          <p className="text-sm">No apps matched "{searchQuery}"</p>
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange('all');
            }}
            className="text-xs text-sky-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 max-h-[620px] overflow-y-auto pr-1">
          {filteredPresets.map((preset) => {
            const isActive = activePreset.id === preset.id;
            const isSelectedForBatch = selectedIds.has(preset.id);

            return (
              <div
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`relative group rounded-xl p-3 border transition-all duration-200 cursor-pointer flex flex-col items-center gap-2 select-none ${
                  isActive
                    ? 'bg-sky-950/30 border-sky-400/80 shadow-[0_0_18px_rgba(56,189,248,0.25)]'
                    : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.07] hover:border-white/15'
                }`}
              >
                {/* Checkbox for batch select */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelectId(preset.id);
                  }}
                  className="absolute top-2 left-2 p-1 text-neutral-400 hover:text-white transition z-10"
                  title="Include in ZIP export"
                >
                  {isSelectedForBatch ? (
                    <CheckSquare className="w-3.5 h-3.5 text-sky-400" />
                  ) : (
                    <Square className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />
                  )}
                </button>

                {/* Quick single download */}
                <button
                  type="button"
                  onClick={(e) => handleQuickDownload(e, preset)}
                  title={`Quick Download 512×512 ${preset.name} PNG`}
                  className="absolute top-2 right-2 p-1 rounded bg-black/40 hover:bg-sky-500/30 text-neutral-400 hover:text-sky-300 border border-white/5 opacity-0 group-hover:opacity-100 transition z-10"
                >
                  <Download className="w-3 h-3" />
                </button>

                {/* Authentic Layered Liquid Glass Icon */}
                <div className="relative w-14 h-14 mt-1 flex items-center justify-center">
                  <LiquidGlassSvg
                    preset={preset}
                    settings={settings}
                    size={56}
                    className="w-14 h-14 filter transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                {/* App Name & Category */}
                <div className="w-full text-center">
                  <div className="text-xs font-semibold text-white truncate">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">
                    {preset.category}
                  </div>
                </div>

                {/* Active Indicator Pin */}
                {isActive && (
                  <div className="absolute -bottom-1 w-4 h-1 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

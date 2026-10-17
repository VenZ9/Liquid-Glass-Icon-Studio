import React, { useState } from 'react';
import { X, Download, Archive, Check, Loader2 } from 'lucide-react';
import { AppPreset, GlassSettings } from '../types';
import { exportBatchAsZip } from '../utils/exportUtils';

interface BatchExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  presets: AppPreset[];
  selectedIds: Set<string>;
  settings: GlassSettings;
}

export const BatchExportModal: React.FC<BatchExportModalProps> = ({
  isOpen,
  onClose,
  presets,
  selectedIds,
  settings,
}) => {
  const [exportMode, setExportMode] = useState<'selected' | 'all'>('all');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ current: number; total: number; appName: string } | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedPresets = presets.filter((p) => selectedIds.has(p.id));
  const presetsToExport =
    exportMode === 'selected' && selectedPresets.length > 0
      ? selectedPresets
      : presets;

  const handleStartExport = async () => {
    try {
      setIsExporting(true);
      setIsDone(false);
      setProgress({ current: 0, total: presetsToExport.length, appName: 'Starting...' });

      await exportBatchAsZip(presetsToExport, settings, (current, total, appName) => {
        setProgress({ current, total, appName });
      });

      setIsDone(true);
      setTimeout(() => {
        setIsExporting(false);
      }, 1500);
    } catch (err) {
      console.error('Batch export failed:', err);
      setIsExporting(false);
    }
  };

  const percent = progress ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-white/15 shadow-2xl relative">
        {/* Close Button */}
        {!isExporting && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <Archive className="w-5 h-5 text-sky-400" />
          <h3 className="text-base font-bold text-white">Batch Export Liquid Glass ZIP</h3>
        </div>

        <p className="text-xs text-neutral-300 mb-4">
          Export full sets of 512×512 transparent PNGs bundled into a ZIP archive, ready for your Android device.
        </p>

        {/* Export Scope Selector */}
        {!isExporting && (
          <div className="space-y-3 my-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setExportMode('all')}
                className={`p-3 rounded-xl border text-left transition ${
                  exportMode === 'all'
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold text-white">All Apps Pack</div>
                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                  {presets.length} icons total
                </div>
              </button>

              <button
                onClick={() => setExportMode('selected')}
                disabled={selectedPresets.length === 0}
                className={`p-3 rounded-xl border text-left transition ${
                  exportMode === 'selected'
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white disabled:opacity-40'
                }`}
              >
                <div className="text-xs font-semibold text-white">Selected Only</div>
                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                  {selectedPresets.length} selected
                </div>
              </button>
            </div>

            {/* Preview of icons included */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-neutral-300 font-medium mb-1.5 flex justify-between">
                <span>Included Icons ({presetsToExport.length}):</span>
                <span className="font-mono text-sky-400">512×512 PNG each</span>
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                {presetsToExport.map((p) => (
                  <span
                    key={p.id}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[11px] text-neutral-300"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress Display */}
        {isExporting && (
          <div className="my-6 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-300 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                <span>
                  Rendering: <strong className="text-white">{progress?.appName}</strong>
                </span>
              </span>
              <span className="font-mono text-sky-400 font-semibold">{percent}%</span>
            </div>

            {/* Progress bar track */}
            <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-200"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="text-center text-[11px] text-neutral-400 font-mono">
              Icon {progress?.current} of {progress?.total}
            </div>
          </div>
        )}

        {/* Success message */}
        {isDone && (
          <div className="my-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Successfully generated and downloaded ZIP pack!</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-2">
          {!isExporting && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleStartExport}
            disabled={isExporting || presetsToExport.length === 0}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-40 transition flex items-center gap-2 shadow-lg shadow-sky-500/25"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Building ZIP ({percent}%)...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download {presetsToExport.length} Icons ZIP</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

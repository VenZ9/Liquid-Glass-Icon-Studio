import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, Smartphone, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface ShortcutMakerGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutMakerGuide: React.FC<ShortcutMakerGuideProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const PLAY_STORE_URL =
    'https://play.google.com/store/apps/details?id=rk.android.app.shortcutmaker';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(PLAY_STORE_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const steps = [
    {
      num: '1',
      title: 'Export Your Liquid Glass Icons',
      desc: 'Download your chosen icons (as 512×512 PNGs) or download the full ZIP pack and extract it to your Android device (Files or ZArchiver).',
    },
    {
      num: '2',
      title: 'Install Shortcut Maker on Android',
      desc: 'Shortcut Maker is a free, standard Android tool to create custom home screen app shortcuts with custom icon images.',
    },
    {
      num: '3',
      title: 'Select Your App in Shortcut Maker',
      desc: 'Open Shortcut Maker → Tap "Apps" tab → Scroll or search for the app you want to customize (e.g. Claude, Termux, WhatsApp).',
    },
    {
      num: '4',
      title: 'Select the 512×512 Glass Icon',
      desc: 'Tap "Tap to Edit Label or Icon" → Tap the icon preview circle → Select "Image (Gallery)" → Choose your exported Liquid Glass PNG from device storage.',
    },
    {
      num: '5',
      title: 'Set Shape & Tap Checkmark',
      desc: 'Keep the shape set to Circle/Square (the Liquid Glass PNG already contains full realistic drop shadows and rounded menus!) → Tap the top-right checkmark.',
    },
    {
      num: '6',
      title: 'Create Shortcut & Add to Homescreen',
      desc: 'Tap "Create Shortcut" at the bottom → Confirm "Add to Home Screen". Your sleek iOS 26 Liquid Glass bubble is now live!',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              How to Apply Liquid Glass Icons on Android
            </h2>
            <p className="text-xs text-neutral-400">
              Complete step-by-step tutorial with Shortcut Maker & Custom Launchers
            </p>
          </div>
        </div>

        {/* Play Store Download Banner */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-purple-950/20 border border-sky-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-sky-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Shortcut Maker by Rushikesh Kamewar
            </span>
            <p className="text-xs text-neutral-300">
              Free on Google Play • No root or paid apps required
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white border border-white/10 flex items-center gap-1.5 transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white flex items-center gap-1.5 transition"
            >
              <span>Open Play Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Step-by-Step Cards */}
        <div className="space-y-3 my-4">
          <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            Step-by-Step Instructions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 hover:border-white/15 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono text-xs flex items-center justify-center font-bold">
                    {step.num}
                  </span>
                  <h4 className="text-xs font-semibold text-white">{step.title}</h4>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed pl-7">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips Box */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
          <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            PRO TIPS: How to Remove the Tiny Shortcut Badge Arrow
          </h4>
          <ul className="text-xs text-neutral-300 space-y-1.5 pl-4 list-disc">
            <li>
              <strong className="text-white">Widget Mode (Zero Arrow):</strong> In Shortcut Maker, instead of creating a standard shortcut, use the <em>Shortcut Maker 1×1 Widget</em> on your home screen. When placed as a widget, Android will <strong>not</strong> display the small shortcut arrow badge!
            </li>
            <li>
              <strong className="text-white">Samsung One UI:</strong> Use <em>Samsung Good Lock → Theme Park</em> to apply custom PNG icons across all apps with pure system-level integration.
            </li>
            <li>
              <strong className="text-white">Third-Party Launchers:</strong> If you use Nova Launcher, Lawnchair, or Smart Launcher, simply long-press any app icon on the home screen → tap <em>Edit</em> → tap the icon image → choose <em>Gallery</em> to pick your Liquid Glass 512×512 PNG directly without any shortcuts.
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 transition"
          >
            Got It! Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

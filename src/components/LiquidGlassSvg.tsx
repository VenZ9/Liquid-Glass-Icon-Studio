import React, { useId } from 'react';
import { AppPreset, GlassSettings } from '../types';

interface LiquidGlassSvgProps {
  preset: AppPreset;
  settings?: Partial<GlassSettings>;
  className?: string;
  size?: number | string;
}

export const LiquidGlassSvg: React.FC<LiquidGlassSvgProps> = ({
  preset,
  settings,
  className = '',
  size = 56,
}) => {
  const reactId = useId().replace(/:/g, '_');
  const uid = `${preset.id}_${reactId}`;

  const topHighlight = settings?.topHighlight ?? 75;
  const rimLight = settings?.rimLight ?? 80;
  const bottomReflection = settings?.bottomReflection ?? 40;
  const logoScale = (settings?.logoSize ?? 44) / 100;
  const shadowOpacity = (settings?.shadowOpacity ?? 65) / 100;

  const [vx, vy, vw, vh] = (preset.viewBox || '0 0 24 24').split(' ').map(Number);
  const targetLogoSize = 410 * logoScale;
  const scale = targetLogoSize / Math.max(vw, vh);

  const tx = 256 - (vw * scale) / 2 - vx * scale;
  const ty = 256 - (vh * scale) / 2 - vy * scale;

  const topSheenAlpha = 0.22 * (topHighlight / 100);
  const topSheenMid = 0.08 * (topHighlight / 100);
  const meniscusAlpha = 0.18 * (topHighlight / 100);
  const meniscusMid = 0.05 * (topHighlight / 100);

  const rimTopAlpha = 0.55 * (rimLight / 100);
  const rimMidAlpha = 0.20 * (rimLight / 100);
  const rimBotAlpha = 0.10 * (bottomReflection / 100);

  const shadowPrimaryAlpha = 0.55 * shadowOpacity;
  const shadowContactAlpha = 0.35 * shadowOpacity;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`select-none ${className}`}
    >
      <defs>
        <filter id={`shadow_${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity={shadowPrimaryAlpha} />
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity={shadowContactAlpha} />
        </filter>

        <radialGradient id={`baseGlass_${uid}`} cx="34%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#3c414d" stopOpacity="0.96" />
          <stop offset="35%" stopColor="#242831" stopOpacity="0.97" />
          <stop offset="70%" stopColor="#16181e" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#0d0e12" stopOpacity="1.0" />
        </radialGradient>

        <radialGradient id={`specular_${uid}`} cx="34%" cy="32%" r="42%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={topSheenAlpha} />
          <stop offset="45%" stopColor="#ffffff" stopOpacity={topSheenMid} />
          <stop offset="85%" stopColor="#ffffff" stopOpacity="0.01" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
        </radialGradient>

        <radialGradient id={`meniscus_${uid}`} cx="28%" cy="26%" r="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={meniscusAlpha} />
          <stop offset="60%" stopColor="#ffffff" stopOpacity={meniscusMid} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
        </radialGradient>

        <linearGradient id={`rim_${uid}`} x1="20%" y1="15%" x2="80%" y2="85%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={rimTopAlpha} />
          <stop offset="35%" stopColor="#ffffff" stopOpacity={rimMidAlpha} />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={rimBotAlpha} />
        </linearGradient>

        <filter id={`logoDepth_${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.45" />
        </filter>

        <clipPath id={`clip_${uid}`}>
          <circle cx="256" cy="256" r="205" />
        </clipPath>
      </defs>

      {/* Realistic liquid drop shadows */}
      <circle cx="256" cy="256" r="204" fill="#000000" filter={`url(#shadow_${uid})`} />

      {/* Glass Body with refractions */}
      <g clipPath={`url(#clip_${uid})`}>
        <circle cx="256" cy="256" r="205" fill={`url(#baseGlass_${uid})`} />
        <circle cx="256" cy="256" r="205" fill={`url(#specular_${uid})`} />
        <circle cx="256" cy="256" r="205" fill={`url(#meniscus_${uid})`} />
        <circle cx="256" cy="256" r="203.8" fill="none" stroke={`url(#rim_${uid})`} strokeWidth="2.4" />

        {/* Logo Layer */}
        {preset.customImageDataUrl ? (
          <image
            href={preset.customImageDataUrl}
            x={256 - targetLogoSize / 2}
            y={256 - targetLogoSize / 2}
            width={targetLogoSize}
            height={targetLogoSize}
            filter={`url(#logoDepth_${uid})`}
          />
        ) : (
          <g transform={`translate(${tx}, ${ty}) scale(${scale})`} filter={`url(#logoDepth_${uid})`}>
            {preset.paths.map((p, i) =>
              preset.isStroked ? (
                <path
                  key={i}
                  d={p}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  key={i}
                  d={p}
                  fill="#FFFFFF"
                  fillRule={preset.fillRule || 'evenodd'}
                />
              )
            )}
          </g>
        )}
      </g>

      {/* Subtle outer meniscus boundary ring */}
      <circle cx="256" cy="256" r="205" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.2" />
    </svg>
  );
};

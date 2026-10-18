import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import { APP_PRESETS } from '../src/data/presets';

fs.mkdirSync('./previews', { recursive: true });

function createSvg(preset: typeof APP_PRESETS[0]) {
  const [vx, vy, vw, vh] = (preset.viewBox || '0 0 24 24').split(' ').map(Number);
  const logoScale = 0.44;
  const targetLogoSize = 410 * logoScale;
  const scale = targetLogoSize / Math.max(vw, vh);
  
  const tx = 256 - (vw * scale) / 2 - vx * scale;
  const ty = 256 - (vh * scale) / 2 - vy * scale;

  const pathMarkup = preset.paths.map(p => {
    if (preset.isStroked) {
      return `<path d="${p}" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`;
    }
    return `<path d="${p}" fill="#FFFFFF" fill-rule="evenodd" />`;
  }).join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="liquidShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.55" />
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.35" />
    </filter>

    <radialGradient id="baseGlass" cx="34%" cy="32%" r="70%">
      <stop offset="0%" stop-color="#3c414d" stop-opacity="0.96" />
      <stop offset="35%" stop-color="#242831" stop-opacity="0.97" />
      <stop offset="70%" stop-color="#16181e" stop-opacity="0.98" />
      <stop offset="100%" stop-color="#0d0e12" stop-opacity="1.0" />
    </radialGradient>

    <radialGradient id="specularSheen" cx="34%" cy="32%" r="42%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22" />
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="85%" stop-color="#ffffff" stop-opacity="0.01" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.0" />
    </radialGradient>

    <radialGradient id="meniscusGlow" cx="28%" cy="26%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18" />
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.0" />
    </radialGradient>

    <linearGradient id="rimLight" x1="20%" y1="15%" x2="80%" y2="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55" />
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.20" />
      <stop offset="70%" stop-color="#ffffff" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.10" />
    </linearGradient>

    <filter id="logoDepth" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" flood-color="#000000" flood-opacity="0.45" />
    </filter>

    <clipPath id="glassDiscClip">
      <circle cx="256" cy="256" r="205" />
    </clipPath>
  </defs>

  <circle cx="256" cy="256" r="204" fill="#000000" filter="url(#liquidShadow)" />

  <g clip-path="url(#glassDiscClip)">
    <circle cx="256" cy="256" r="205" fill="url(#baseGlass)" />
    <circle cx="256" cy="256" r="205" fill="url(#specularSheen)" />
    <circle cx="256" cy="256" r="205" fill="url(#meniscusGlow)" />
    <circle cx="256" cy="256" r="203.8" fill="none" stroke="url(#rimLight)" stroke-width="2.4" />

    <g transform="translate(${tx}, ${ty}) scale(${scale})" filter="url(#logoDepth)">
      ${pathMarkup}
    </g>
  </g>

  <circle cx="256" cy="256" r="205" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.2" />
</svg>
`;
}

const targetIds = ['claude', 'chatgpt', 'gemini', 'instagram', 'discord', 'youtube', 'whatsapp', 'termux', 'play-store'];

for (const id of targetIds) {
  const preset = APP_PRESETS.find(p => p.id === id);
  if (!preset) {
    console.error('Missing preset:', id);
    continue;
  }
  const svg = createSvg(preset);
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 512 } });
  const png = resvg.render().asPng();
  const outPath = `./previews/${id}-liquid-glass-512.png`;
  fs.writeFileSync(outPath, png);
  console.log('Generated:', outPath);
}

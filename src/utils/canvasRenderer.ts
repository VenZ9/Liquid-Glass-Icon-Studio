import { AppPreset, GlassSettings, IconShape } from '../types';

export const CANVAS_SIZE = 512;

/**
 * Creates the clipping / outline path for the selected icon shape
 */
export function createShapePath(
  ctx: CanvasRenderingContext2D,
  shape: IconShape,
  cx: number,
  cy: number,
  radius: number
): void {
  ctx.beginPath();
  switch (shape) {
    case 'circle':
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      break;

    case 'squircle': {
      // Superellipse squircle for iOS aesthetic
      const size = radius * 2;
      const x = cx - radius;
      const y = cy - radius;
      const r = radius * 0.45; // Smooth curved corners
      ctx.roundRect(x, y, size, size, r);
      break;
    }

    case 'rounded-square': {
      const size = radius * 2;
      const x = cx - radius;
      const y = cy - radius;
      const r = radius * 0.25;
      ctx.roundRect(x, y, size, size, r);
      break;
    }

    case 'hexagon': {
      const sides = 6;
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
        const hx = cx + radius * Math.cos(angle);
        const hy = cy + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      break;
    }
  }
}

/**
 * Helper to parse hex colors to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 10, g: 13, b: 20 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Preloads an SVG or Image into an HTMLImageElement
 */
export function loadSvgImage(preset: AppPreset): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    if (preset.customImageDataUrl) {
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load custom image'));
      img.src = preset.customImageDataUrl;
      return;
    }

    // Build standalone SVG string with pure white fill or stroke
    const pathTags = preset.paths
      .map(p => {
        if (preset.isStroked) {
          return `<path d="${p}" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`;
        }
        return `<path d="${p}" fill="#FFFFFF" fill-rule="${preset.fillRule || 'evenodd'}" />`;
      })
      .join('');

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${preset.viewBox || '0 0 24 24'}">${pathTags}</svg>`;
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

/**
 * Image cache for smooth 60fps live re-renders
 */
const imageCache = new Map<string, HTMLImageElement>();

export async function getCachedAppImage(preset: AppPreset): Promise<HTMLImageElement | null> {
  const key = preset.id + (preset.customImageDataUrl ? `_${preset.customImageDataUrl.slice(0, 30)}` : '');
  if (imageCache.has(key)) {
    return imageCache.get(key)!;
  }
  try {
    const img = await loadSvgImage(preset);
    imageCache.set(key, img);
    return img;
  } catch (err) {
    console.warn(`Failed to render SVG for ${preset.name}`, err);
    return null;
  }
}

/**
 * Main Liquid Glass Renderer: Renders a 512x512 icon onto any 2D canvas context
 */
export function renderLiquidGlassIcon(
  ctx: CanvasRenderingContext2D,
  preset: AppPreset,
  settings: GlassSettings,
  preloadedImg?: HTMLImageElement | null,
  options?: { size?: number; clear?: boolean }
): void {
  const size = options?.size ?? CANVAS_SIZE;
  const shouldClear = options?.clear ?? true;

  if (shouldClear) {
    ctx.clearRect(0, 0, size, size);
  }

  const scale = size / CANVAS_SIZE;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 205 * scale; // Fits cleanly with shadows inside 512x512

  const rgb = hexToRgb(settings.tintColor);
  const darkRatio = settings.darkness / 100;
  const opacRatio = settings.opacity / 100;
  const tintIntensity = (settings.tintIntensity ?? 40) / 100;

  // 1. SOFT REALISTIC DROP SHADOWS
  if (settings.shadowOpacity > 0) {
    const shadowMult = (settings.shadowOpacity / 100);

    // Primary ambient soft drop shadow (dy=16, blur=20, opacity=0.55)
    ctx.save();
    ctx.shadowColor = `rgba(0, 0, 0, ${0.55 * shadowMult})`;
    ctx.shadowBlur = (settings.shadowBlur / 20) * 20 * scale;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = (settings.shadowOffset / 16) * 16 * scale;
    createShapePath(ctx, settings.shape, cx, cy, radius - 1 * scale);
    ctx.fillStyle = `rgba(0, 0, 0, ${0.45 * shadowMult})`;
    ctx.fill();
    ctx.restore();

    // Secondary tighter contact shadow (dy=6, blur=8, opacity=0.35)
    ctx.save();
    ctx.shadowColor = `rgba(0, 0, 0, ${0.35 * shadowMult})`;
    ctx.shadowBlur = (settings.shadowBlur / 20) * 8 * scale;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = (settings.shadowOffset / 16) * 6 * scale;
    createShapePath(ctx, settings.shape, cx, cy, radius - 1 * scale);
    ctx.fillStyle = `rgba(0, 0, 0, ${0.35 * shadowMult})`;
    ctx.fill();
    ctx.restore();
  }

  // 2. CLIP TO GLASS SHAPE FOR INTERNAL REFRACTIONS & LIGHTING
  ctx.save();
  createShapePath(ctx, settings.shape, cx, cy, radius);
  ctx.clip();

  // 2a. Base Glass: Diffuse Spherical Dome Gradient (centered at top-left 34%, 32%)
  const domeX = cx - radius * 0.32;
  const domeY = cy - radius * 0.36;
  const baseGrad = ctx.createRadialGradient(
    domeX,
    domeY,
    radius * 0.05,
    domeX,
    domeY,
    radius * 1.45
  );

  // Stop 0%: Top-left diffuse dome (#3c414d = 60, 65, 77)
  const r0 = Math.min(255, Math.round(60 * (1 - darkRatio * 0.35) + rgb.r * tintIntensity * 0.35));
  const g0 = Math.min(255, Math.round(65 * (1 - darkRatio * 0.35) + rgb.g * tintIntensity * 0.35));
  const b0 = Math.min(255, Math.round(77 * (1 - darkRatio * 0.35) + rgb.b * tintIntensity * 0.35));

  // Stop 35%: Core body (#242831 = 36, 40, 49)
  const r1 = Math.min(255, Math.round(36 * (1 - darkRatio * 0.45) + rgb.r * tintIntensity * 0.25));
  const g1 = Math.min(255, Math.round(40 * (1 - darkRatio * 0.45) + rgb.g * tintIntensity * 0.25));
  const b1 = Math.min(255, Math.round(49 * (1 - darkRatio * 0.45) + rgb.b * tintIntensity * 0.25));

  // Stop 70%: Lower body (#16181e = 22, 24, 30)
  const r2 = Math.min(255, Math.round(22 * (1 - darkRatio * 0.55) + rgb.r * tintIntensity * 0.15));
  const g2 = Math.min(255, Math.round(24 * (1 - darkRatio * 0.55) + rgb.g * tintIntensity * 0.15));
  const b2 = Math.min(255, Math.round(30 * (1 - darkRatio * 0.55) + rgb.b * tintIntensity * 0.15));

  // Stop 100%: Bottom-right shadow (#0d0e12 = 13, 14, 18)
  const r3 = Math.min(255, Math.round(13 * (1 - darkRatio * 0.65) + rgb.r * tintIntensity * 0.10));
  const g3 = Math.min(255, Math.round(14 * (1 - darkRatio * 0.65) + rgb.g * tintIntensity * 0.10));
  const b3 = Math.min(255, Math.round(18 * (1 - darkRatio * 0.65) + rgb.b * tintIntensity * 0.10));

  baseGrad.addColorStop(0, `rgba(${r0}, ${g0}, ${b0}, ${opacRatio * 0.96})`);
  baseGrad.addColorStop(0.35, `rgba(${r1}, ${g1}, ${b1}, ${opacRatio * 0.97})`);
  baseGrad.addColorStop(0.70, `rgba(${r2}, ${g2}, ${b2}, ${opacRatio * 0.98})`);
  baseGrad.addColorStop(1.0, `rgba(${r3}, ${g3}, ${b3}, ${opacRatio})`);

  ctx.fillStyle = baseGrad;
  ctx.fill();

  // 2b. Specular Sheen (soft diffuse light pool centered at top-left)
  if (settings.topHighlight > 0) {
    const sheenGrad = ctx.createRadialGradient(
      domeX,
      domeY,
      radius * 0.02,
      domeX,
      domeY,
      radius * 0.84
    );
    const sheenMult = settings.topHighlight / 100;
    sheenGrad.addColorStop(0, `rgba(255, 255, 255, ${0.22 * sheenMult})`);
    sheenGrad.addColorStop(0.45, `rgba(255, 255, 255, ${0.08 * sheenMult})`);
    sheenGrad.addColorStop(0.85, `rgba(255, 255, 255, ${0.01 * sheenMult})`);
    sheenGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = sheenGrad;
    ctx.fill();
  }

  // 2c. Meniscus Glow (curved inner edge sheen)
  if (settings.topHighlight > 15) {
    const meniscusGrad = ctx.createRadialGradient(
      cx - radius * 0.44,
      cy - radius * 0.48,
      radius * 0.05,
      cx - radius * 0.44,
      cy - radius * 0.48,
      radius * 0.70
    );
    const meniscusMult = (settings.topHighlight / 100);
    meniscusGrad.addColorStop(0, `rgba(255, 255, 255, ${0.18 * meniscusMult})`);
    meniscusGrad.addColorStop(0.60, `rgba(255, 255, 255, ${0.05 * meniscusMult})`);
    meniscusGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = meniscusGrad;
    ctx.fill();
  }

  // 2d. Bottom Caustic Bounce (Subtle internal bottom meniscus glow)
  if (settings.bottomReflection > 0) {
    const bottomBounce = ctx.createRadialGradient(
      cx,
      cy + radius * 0.82,
      radius * 0.05,
      cx,
      cy + radius * 0.75,
      radius * 0.60
    );
    const bounceStrength = (settings.bottomReflection / 100) * 0.14;
    bottomBounce.addColorStop(0, `rgba(255, 255, 255, ${bounceStrength})`);
    bottomBounce.addColorStop(0.6, `rgba(255, 255, 255, ${bounceStrength * 0.25})`);
    bottomBounce.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = bottomBounce;
    ctx.fill();
  }

  // 2e. Inner Crescent Rim Light (Directional stroke hugging perimeter inside glass)
  if (settings.rimLight > 0) {
    ctx.save();
    const rimGrad = ctx.createLinearGradient(
      cx - radius * 0.6,
      cy - radius * 0.7,
      cx + radius * 0.6,
      cy + radius * 0.7
    );
    const rimAlpha = (settings.rimLight / 100);
    const botAlpha = (settings.bottomReflection / 100);
    rimGrad.addColorStop(0, `rgba(255, 255, 255, ${0.55 * rimAlpha})`);
    rimGrad.addColorStop(0.35, `rgba(255, 255, 255, ${0.20 * rimAlpha})`);
    rimGrad.addColorStop(0.70, 'rgba(255, 255, 255, 0.06)');
    rimGrad.addColorStop(1.0, `rgba(255, 255, 255, ${0.10 * botAlpha})`);

    createShapePath(ctx, settings.shape, cx, cy, radius - 1.2 * scale);
    ctx.lineWidth = 2.4 * scale;
    ctx.strokeStyle = rimGrad;
    ctx.stroke();
    ctx.restore();
  }

  // 3. LOGO RENDERING
  const logoDiameter = (radius * 2) * (settings.logoSize / 100);
  const logoX = cx - logoDiameter / 2;
  const logoY = cy - logoDiameter / 2;
  const logoAlpha = settings.logoOpacity / 100;

  ctx.save();
  // Logo shadow / realistic depth inside glass
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 3.5 * scale;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2.5 * scale;
  ctx.globalAlpha = logoAlpha;

  if (preloadedImg && preloadedImg.complete && preloadedImg.naturalWidth > 0) {
    if (settings.logoGlow > 0) {
      ctx.save();
      ctx.shadowColor = `rgba(255, 255, 255, ${(settings.logoGlow / 100) * 0.35})`;
      ctx.shadowBlur = 14 * scale;
      ctx.drawImage(preloadedImg, logoX, logoY, logoDiameter, logoDiameter);
      ctx.restore();
    }
    ctx.drawImage(preloadedImg, logoX, logoY, logoDiameter, logoDiameter);
  } else {
    try {
      ctx.save();
      const [vx, vy, vw, vh] = (preset.viewBox || '0 0 24 24').split(' ').map(Number);
      const sX = logoDiameter / vw;
      const sY = logoDiameter / vh;
      ctx.translate(logoX - vx * sX, logoY - vy * sY);
      ctx.scale(sX, sY);

      if (preset.isStroked) {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (const p of preset.paths) {
          const pathObj = new Path2D(p);
          ctx.stroke(pathObj);
        }
      } else {
        ctx.fillStyle = '#FFFFFF';
        for (const p of preset.paths) {
          const pathObj = new Path2D(p);
          ctx.fill(pathObj, preset.fillRule || 'evenodd');
        }
      }
      ctx.restore();
    } catch {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, cy, logoDiameter * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // Restore clip
  ctx.restore();

  // 4. OUTER GLASS MENISCUS BORDER RING
  if (settings.borderOpacity > 0) {
    ctx.save();
    createShapePath(ctx, settings.shape, cx, cy, radius);
    ctx.lineWidth = Math.max(1, (settings.borderWidth || 1.2) * scale);
    const borderAlpha = (settings.borderOpacity / 100) * 0.28;
    ctx.strokeStyle = `rgba(255, 255, 255, ${borderAlpha})`;
    ctx.stroke();
    ctx.restore();
  }
}

/**
 * Offscreen rendering to produce high-resolution 512x512 transparent PNG
 */
export async function renderIconToBlob(
  preset: AppPreset,
  settings: GlassSettings,
  size = CANVAS_SIZE
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Could not get 2D canvas context');

  const img = await getCachedAppImage(preset);
  renderLiquidGlassIcon(ctx, preset, settings, img, { size, clear: true });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to generate PNG blob'));
    }, 'image/png');
  });
}

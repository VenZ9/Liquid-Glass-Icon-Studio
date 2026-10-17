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

    // Build standalone SVG string with pure white fill
    const pathTags = preset.paths
      .map(p => `<path d="${p}" fill="#FFFFFF" fill-rule="${preset.fillRule || 'nonzero'}" />`)
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
  const radius = 202 * scale; // Fits cleanly with shadows inside 512x512

  const rgb = hexToRgb(settings.tintColor);
  const darkRatio = settings.darkness / 100;
  const opacRatio = settings.opacity / 100;

  // 1. SOFT REALISTIC DROP SHADOWS
  if (settings.shadowOpacity > 0) {
    ctx.save();
    const shadowAlpha = (settings.shadowOpacity / 100) * 0.7;
    const shadowY = (settings.shadowOffset / 100) * 32 * scale;
    const shadowBlur = (settings.shadowBlur / 100) * 44 * scale;

    ctx.shadowColor = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = shadowY;

    // Contact shadow body
    createShapePath(ctx, settings.shape, cx, cy, radius);
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha * 0.8})`;
    ctx.fill();
    ctx.restore();

    // Secondary ambient tight shadow
    ctx.save();
    ctx.shadowColor = `rgba(0, 0, 0, ${shadowAlpha * 0.5})`;
    ctx.shadowBlur = shadowBlur * 0.4;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = shadowY * 0.4;
    createShapePath(ctx, settings.shape, cx, cy, radius);
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha * 0.5})`;
    ctx.fill();
    ctx.restore();
  }

  // 2. CLIP TO GLASS SHAPE FOR INTERNAL REFRACTIONS & FROST
  ctx.save();
  createShapePath(ctx, settings.shape, cx, cy, radius);
  ctx.clip();

  // 2a. Glass Body Dark Tint Base Gradient
  const baseGrad = ctx.createLinearGradient(
    cx - radius * 0.8,
    cy - radius * 0.8,
    cx + radius * 0.8,
    cy + radius * 0.8
  );

  // Top-left ambient refraction (subtle tinted illumination)
  const topLightR = Math.min(255, Math.round(rgb.r * 1.6 + (1 - darkRatio) * 40));
  const topLightG = Math.min(255, Math.round(rgb.g * 1.6 + (1 - darkRatio) * 45));
  const topLightB = Math.min(255, Math.round(rgb.b * 1.6 + (1 - darkRatio) * 55));

  // Deep dark glass core
  const coreR = Math.round(rgb.r * (1 - darkRatio * 0.85));
  const coreG = Math.round(rgb.g * (1 - darkRatio * 0.85));
  const coreB = Math.round(rgb.b * (1 - darkRatio * 0.85));

  baseGrad.addColorStop(0, `rgba(${topLightR}, ${topLightG}, ${topLightB}, ${opacRatio * 0.95})`);
  baseGrad.addColorStop(0.45, `rgba(${coreR}, ${coreG}, ${coreB}, ${opacRatio * 0.96})`);
  baseGrad.addColorStop(1, `rgba(${Math.round(coreR * 0.5)}, ${Math.round(coreG * 0.5)}, ${Math.round(coreB * 0.6)}, ${opacRatio})`);

  ctx.fillStyle = baseGrad;
  ctx.fill();

  // 2b. Frosted Glass Scattering (Internal Radial Glow)
  if (settings.frostBlur > 0) {
    const frostGrad = ctx.createRadialGradient(
      cx - radius * 0.25,
      cy - radius * 0.35,
      radius * 0.1,
      cx,
      cy,
      radius
    );
    const frostStrength = (settings.frostBlur / 100) * 0.18;
    frostGrad.addColorStop(0, `rgba(255, 255, 255, ${frostStrength})`);
    frostGrad.addColorStop(0.5, `rgba(255, 255, 255, ${frostStrength * 0.3})`);
    frostGrad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');

    ctx.fillStyle = frostGrad;
    ctx.fill();
  }

  // 2c. Bottom Caustic Bounce (Subtle internal bottom meniscus glow)
  if (settings.bottomReflection > 0) {
    const bottomBounce = ctx.createRadialGradient(
      cx,
      cy + radius * 0.82,
      radius * 0.05,
      cx,
      cy + radius * 0.7,
      radius * 0.75
    );
    const bounceStrength = (settings.bottomReflection / 100) * 0.35;
    bottomBounce.addColorStop(0, `rgba(255, 255, 255, ${bounceStrength})`);
    bottomBounce.addColorStop(0.6, `rgba(255, 255, 255, ${bounceStrength * 0.15})`);
    bottomBounce.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = bottomBounce;
    ctx.fill();
  }

  // 2d. Curved Liquid Meniscus Surface Highlight (iOS 26 Signature Liquid Crescent)
  if (settings.topHighlight > 0) {
    ctx.save();
    ctx.beginPath();
    // Curved liquid meniscus path across upper bubble
    ctx.moveTo(cx - radius, cy - radius * 0.05);
    ctx.quadraticCurveTo(cx, cy + radius * 0.22, cx + radius, cy - radius * 0.05);
    ctx.lineTo(cx + radius, cy - radius);
    ctx.lineTo(cx - radius, cy - radius);
    ctx.closePath();

    const meniscusGrad = ctx.createLinearGradient(
      cx,
      cy - radius,
      cx,
      cy + radius * 0.2
    );
    const highStrength = (settings.topHighlight / 100) * 0.28;
    meniscusGrad.addColorStop(0, `rgba(255, 255, 255, ${highStrength})`);
    meniscusGrad.addColorStop(0.5, `rgba(255, 255, 255, ${highStrength * 0.35})`);
    meniscusGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = meniscusGrad;
    ctx.fill();
    ctx.restore();
  }

  // 2e. Top-Left Specular Light Pinpoint / Sheen
  if (settings.topHighlight > 20) {
    const sheenGrad = ctx.createRadialGradient(
      cx - radius * 0.42,
      cy - radius * 0.48,
      2 * scale,
      cx - radius * 0.42,
      cy - radius * 0.48,
      radius * 0.48
    );
    const sheenStrength = (settings.topHighlight / 100) * 0.32;
    sheenGrad.addColorStop(0, `rgba(255, 255, 255, ${sheenStrength})`);
    sheenGrad.addColorStop(0.4, `rgba(255, 255, 255, ${sheenStrength * 0.3})`);
    sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = sheenGrad;
    ctx.fill();
  }

  // 3. LOGO RENDERING
  const logoDiameter = (radius * 2) * (settings.logoSize / 100);
  const logoX = cx - logoDiameter / 2;
  const logoY = cy - logoDiameter / 2;
  const logoAlpha = settings.logoOpacity / 100;

  ctx.save();
  // Logo shadow / soft depth inside glass
  ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
  ctx.shadowBlur = 8 * scale;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4 * scale;
  ctx.globalAlpha = logoAlpha;

  if (preloadedImg && preloadedImg.complete && preloadedImg.naturalWidth > 0) {
    // If user provided a custom image or loaded SVG
    if (settings.logoGlow > 0) {
      // Ambient backlight glow behind logo
      ctx.save();
      ctx.shadowColor = `rgba(255, 255, 255, ${(settings.logoGlow / 100) * 0.45})`;
      ctx.shadowBlur = 18 * scale;
      ctx.drawImage(preloadedImg, logoX, logoY, logoDiameter, logoDiameter);
      ctx.restore();
    }
    ctx.drawImage(preloadedImg, logoX, logoY, logoDiameter, logoDiameter);
  } else {
    // Direct Path2D rendering fallback if image hasn't loaded yet
    try {
      ctx.save();
      const [vx, vy, vw, vh] = (preset.viewBox || '0 0 24 24').split(' ').map(Number);
      const sX = logoDiameter / vw;
      const sY = logoDiameter / vh;
      ctx.translate(logoX - vx * sX, logoY - vy * sY);
      ctx.scale(sX, sY);

      ctx.fillStyle = '#FFFFFF';
      for (const p of preset.paths) {
        const pathObj = new Path2D(p);
        ctx.fill(pathObj, preset.fillRule || 'nonzero');
      }
      ctx.restore();
    } catch {
      // Fallback simple white circle emblem if path parsing fails
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, cy, logoDiameter * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // 4. INNER RIM LIGHTING (Crescent meniscus edge refraction)
  if (settings.rimLight > 0) {
    ctx.save();
    const rimGrad = ctx.createLinearGradient(
      cx - radius * 0.8,
      cy - radius * 0.8,
      cx + radius * 0.8,
      cy + radius * 0.8
    );
    const rimAlpha = (settings.rimLight / 100) * 0.75;
    rimGrad.addColorStop(0, `rgba(255, 255, 255, ${rimAlpha})`);
    rimGrad.addColorStop(0.4, `rgba(255, 255, 255, ${rimAlpha * 0.25})`);
    rimGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.05)');
    rimGrad.addColorStop(1, `rgba(255, 255, 255, ${(settings.bottomReflection / 100) * 0.35})`);

    createShapePath(ctx, settings.shape, cx, cy, radius - 1.2 * scale);
    ctx.lineWidth = 2.4 * scale;
    ctx.strokeStyle = rimGrad;
    ctx.stroke();
    ctx.restore();
  }

  // Restore clip
  ctx.restore();

  // 5. OUTER GLASS MENISCUS BORDER
  if (settings.borderWidth > 0 && settings.borderOpacity > 0) {
    ctx.save();
    createShapePath(ctx, settings.shape, cx, cy, radius);
    ctx.lineWidth = settings.borderWidth * scale;

    const borderGrad = ctx.createLinearGradient(
      cx - radius,
      cy - radius,
      cx + radius,
      cy + radius
    );
    const borderAlpha = settings.borderOpacity / 100;
    borderGrad.addColorStop(0, `rgba(255, 255, 255, ${borderAlpha * 0.85})`);
    borderGrad.addColorStop(0.5, `rgba(255, 255, 255, ${borderAlpha * 0.2})`);
    borderGrad.addColorStop(1, `rgba(255, 255, 255, ${borderAlpha * 0.45})`);

    ctx.strokeStyle = borderGrad;
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

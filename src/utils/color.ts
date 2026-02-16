import PaletteError from './error.ts';
import NAMED_COLORS from './named-colors.ts';

// ─── Types ───────────────────────────────────────────────────────────────────
type RGB = [r: number, g: number, b: number];
type LAB = [L: number, a: number, b: number];

// ─── CIE-LAB Constants ──────────────────────────────────────────────────────
/** CIE standard threshold for linear/nonlinear transition */
const CIE_EPSILON = 0.008856;
const CIE_KAPPA = 7.787;
const CIE_OFFSET = 16 / 116;

/** D65 standard illuminant reference values */
const D65_X = 95.047;
const D65_Y = 100.0;
const D65_Z = 108.883;

/** Chroma.js-compatible darkening constant */
const LAB_DARKEN_FACTOR = 18;

// ─── sRGB Gamma ──────────────────────────────────────────────────────────────
const linearize = (c: number): number => (c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92);

const delinearize = (c: number): number => (c > 0.0031308 ? 1.055 * c ** (1 / 2.4) - 0.055 : 12.92 * c);

// ─── Clamping ────────────────────────────────────────────────────────────────
const clampByte = (value: number): number => Math.max(0, Math.min(255, Math.round(value)));

// ─── Color Space Conversions ─────────────────────────────────────────────────

const rgbToLab = (rgb: RGB): LAB => {
  const [rr, gg, bb] = rgb.map((c) => linearize(c / 255));

  let x = ((rr * 0.4124564 + gg * 0.3575761 + bb * 0.1804375) * 100) / D65_X;
  let y = ((rr * 0.2126729 + gg * 0.7151522 + bb * 0.072175) * 100) / D65_Y;
  let z = ((rr * 0.0193339 + gg * 0.119192 + bb * 0.9503041) * 100) / D65_Z;

  x = x > CIE_EPSILON ? x ** (1 / 3) : CIE_KAPPA * x + CIE_OFFSET;
  y = y > CIE_EPSILON ? y ** (1 / 3) : CIE_KAPPA * y + CIE_OFFSET;
  z = z > CIE_EPSILON ? z ** (1 / 3) : CIE_KAPPA * z + CIE_OFFSET;

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
};

const labToRgb = ([L, a, b]: LAB): RGB => {
  let y = (L + 16) / 116;
  let x = a / 500 + y;
  let z = y - b / 200;

  const x3 = x ** 3;
  const y3 = y ** 3;
  const z3 = z ** 3;

  x = ((x3 > CIE_EPSILON ? x3 : (x - CIE_OFFSET) / CIE_KAPPA) * D65_X) / 100;
  y = ((y3 > CIE_EPSILON ? y3 : (y - CIE_OFFSET) / CIE_KAPPA) * D65_Y) / 100;
  z = ((z3 > CIE_EPSILON ? z3 : (z - CIE_OFFSET) / CIE_KAPPA) * D65_Z) / 100;

  const rr = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
  const gg = x * -0.969266 + y * 1.8760108 + z * 0.041556;
  const bb = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

  return [clampByte(delinearize(rr) * 255), clampByte(delinearize(gg) * 255), clampByte(delinearize(bb) * 255)];
};

const hslToRgb = (h: number, s: number, l: number): RGB => {
  const sat = s / 100;
  const lit = l / 100;
  const a = sat * Math.min(lit, 1 - lit);
  const k = (n: number) => (n + h / 30) % 12;
  const f = (n: number) => lit - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

// ─── Hex Parsing & Formatting ────────────────────────────────────────────────

const parseHex = (hex: string): RGB => {
  const cleaned = hex.replace(/^#/, '');
  const expanded = cleaned.length === 3 ? cleaned[0] + cleaned[0] + cleaned[1] + cleaned[1] + cleaned[2] + cleaned[2] : cleaned;

  const num = Number.parseInt(expanded, 16);
  if (Number.isNaN(num)) {
    throw new PaletteError(`Invalid hex color: '${hex}'`);
  }

  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const formatHex = (rgb: RGB): string => `#${rgb.map((c) => clampByte(c).toString(16).padStart(2, '0')).join('')}`;

// ─── Color Parsing (multi-format) ────────────────────────────────────────────

const RGB_REGEX = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/;
const HSL_REGEX = /^hsla?\((\d+),\s*([\d.]+)%?,\s*([\d.]+)%?(?:,\s*[\d.]+)?\)$/;

const parseColor = (input: string): RGB | null => {
  const color = input.toLowerCase().trim();

  // Named color
  const named = NAMED_COLORS[color];
  if (named) return parseHex(named);

  // Hex
  if (color.startsWith('#')) {
    try {
      return parseHex(color);
    } catch {
      return null;
    }
  }

  // rgb/rgba
  const rgbMatch = color.match(RGB_REGEX);
  if (rgbMatch) {
    return [Number.parseInt(rgbMatch[1], 10), Number.parseInt(rgbMatch[2], 10), Number.parseInt(rgbMatch[3], 10)];
  }

  // hsl/hsla
  const hslMatch = color.match(HSL_REGEX);
  if (hslMatch) {
    return hslToRgb(Number.parseInt(hslMatch[1], 10), Number.parseFloat(hslMatch[2]), Number.parseFloat(hslMatch[3]));
  }

  return null;
};

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Checks whether the given string is a recognized color format.
 * Supports hex, rgb/rgba, hsl/hsla, and CSS named colors.
 */
export const isValidColor = (color: string): boolean => parseColor(color) !== null;

/**
 * Converts any supported color string to a lowercase hex representation.
 * @throws {PaletteError} if the color cannot be parsed.
 */
export const toHex = (color: string): string => {
  const rgb = parseColor(color);
  if (!rgb) {
    throw new PaletteError(`Invalid color: '${color}'`);
  }
  return formatHex(rgb).toLowerCase();
};

/**
 * Shifts a hex color's lightness in CIE-LAB space.
 * Positive `amount` darkens, negative `amount` lightens.
 * Compatible with chroma.js darken/brighten (Kn = 18).
 */
export const shiftLightness = (hexColor: string, amount: number): string => {
  const lab = rgbToLab(parseHex(hexColor));
  lab[0] -= amount * LAB_DARKEN_FACTOR;
  return formatHex(labToRgb(lab));
};

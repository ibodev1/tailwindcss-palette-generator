import PaletteError from './error.ts';

// Color space conversion utilities
const rgbToLab = (r: number, g: number, b: number): [number, number, number] => {
  // Normalize RGB values
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Apply gamma correction
  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;

  // Convert to XYZ
  let x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) * 100;
  let y = (r * 0.2126729 + g * 0.7151522 + b * 0.072175) * 100;
  let z = (r * 0.0193339 + g * 0.119192 + b * 0.9503041) * 100;

  // Normalize for D65 illuminant
  x = x / 95.047;
  y = y / 100.0;
  z = z / 108.883;

  // Convert to LAB
  x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;

  const L = 116 * y - 16;
  const a = 500 * (x - y);
  const b_lab = 200 * (y - z);

  return [L, a, b_lab];
};

const labToRgb = (L: number, a: number, b: number): [number, number, number] => {
  // Convert LAB to XYZ
  let y = (L + 16) / 116;
  let x = a / 500 + y;
  let z = y - b / 200;

  const y3 = y ** 3;
  const x3 = x ** 3;
  const z3 = z ** 3;

  y = y3 > 0.008856 ? y3 : (y - 16 / 116) / 7.787;
  x = x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787;
  z = z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787;

  // Denormalize for D65
  x = x * 95.047;
  y = y * 100.0;
  z = z * 108.883;

  // Convert XYZ to RGB
  x = x / 100;
  y = y / 100;
  z = z / 100;

  let r = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
  let g = x * -0.969266 + y * 1.8760108 + z * 0.041556;
  let b_rgb = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

  // Apply gamma correction
  r = r > 0.0031308 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * g ** (1 / 2.4) - 0.055 : 12.92 * g;
  b_rgb = b_rgb > 0.0031308 ? 1.055 * b_rgb ** (1 / 2.4) - 0.055 : 12.92 * b_rgb;

  // Clamp and convert to 0-255
  r = Math.max(0, Math.min(255, Math.round(r * 255)));
  g = Math.max(0, Math.min(255, Math.round(g * 255)));
  b_rgb = Math.max(0, Math.min(255, Math.round(b_rgb * 255)));

  return [r, g, b_rgb];
};

const parseHexColor = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const num = parseInt(hex, 16);
  if (Number.isNaN(num)) {
    throw new PaletteError('Invalid hex color');
  }
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    '#' +
    [r, g, b]
      .map((x) => Math.max(0, Math.min(255, Math.round(x))))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
  );
};

export const darkenColor = (color: string, amount: number): string => {
  // Parse the input color
  const [r, g, b] = parseHexColor(color);

  // Convert to LAB
  const [L, a, b_lab] = rgbToLab(r, g, b);

  // Darken by reducing L value (chroma.js uses Kn = 18)
  const darkenedL = L - amount * 18;

  // Convert back to RGB
  const [newR, newG, newB] = labToRgb(darkenedL, a, b_lab);

  // Convert to hex
  return rgbToHex(newR, newG, newB);
};

const NAMED_COLORS: Record<string, string> = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

type RGB = [number, number, number];

const parseColor = (color: string): RGB | null => {
  color = color.toLowerCase().trim();

  // Named color
  if (NAMED_COLORS[color]) {
    return parseHexColor(NAMED_COLORS[color]);
  }

  // Hex color
  if (color.startsWith('#')) {
    try {
      return parseHexColor(color);
    } catch (_e) {
      return null;
    }
  }

  // rgb/rgba color
  const rgbMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
  if (rgbMatch) {
    return [parseInt(rgbMatch[1], 10), parseInt(rgbMatch[2], 10), parseInt(rgbMatch[3], 10)];
  }

  // hsl/hsla color
  const hslMatch = color.match(/^hsla?\((\d+),\s*([\d.]+)%?,\s*([\d.]+)%?(?:,\s*[\d.]+)?\)$/);
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10);
    const s = parseFloat(hslMatch[2]);
    const l = parseFloat(hslMatch[3]);
    return hslToRgb(h, s, l);
  }

  return null;
};

export const getHexColor = (color: string): string => {
  const rgb = parseColor(color);
  if (!rgb) {
    throw new PaletteError(`Invalid color: '${color}'`);
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]).toLowerCase();
};

export const isValidColor = (color: string): boolean => {
  return parseColor(color) !== null;
};

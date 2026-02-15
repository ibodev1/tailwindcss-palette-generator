import type { ColorResultOptions, Palette, PaletteResult } from '../types/index.ts';
import { isValidColor } from './color.ts';
import PaletteError from './error.ts';

export const initialOptions: Omit<ColorResultOptions, 'primaryColor'> = {
  mainShade: 500,
  shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
};

export const checkParam = (palette: Palette): boolean => {
  const { color, name, shade, shades } = palette;

  if (!color || typeof color !== 'string' || !isValidColor(color)) {
    throw new PaletteError(`Invalid color: '${color}'. Please provide a valid color.`);
  }

  if (!name || typeof name !== 'string') {
    throw new PaletteError(`Invalid name: '${name}'. Please provide a valid name.`);
  }

  if (shade && typeof shade !== 'number') {
    throw new PaletteError(`Invalid shade value: '${shade}'. Shade must be a number.`);
  }

  if (shades) {
    if (!Array.isArray(shades)) {
      throw new PaletteError(`Invalid shades: '${shades}'. Shades must be an array.`);
    }

    if (shades.length < 3) {
      throw new PaletteError('Shades array must contain at least 3 elements.');
    }

    if (shade && !shades.includes(shade)) {
      throw new PaletteError(`Main shade '${shade}' is not included in the shades array.`);
    }
  } else {
    if (shade && !initialOptions.shades.includes(shade)) {
      throw new PaletteError(`Main shade '${shade}' must be one of: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950.`);
    }
  }

  return true;
};

const darkPalettePrefix = 'dark-';

export const getPalettesFromOptions = (options: Record<string, string>): { lightPalettes: Palette[]; darkPalettes: Palette[] } => {
  const lightPalettes: Palette[] = [];
  const darkPalettes: Palette[] = [];
  const lightPaletteNames = new Set<string>();
  for (const [key, value] of Object.entries(options)) {
    const isDarkPalette = key.startsWith(darkPalettePrefix);
    const name = isDarkPalette ? key.slice(darkPalettePrefix.length) : key;

    if (!name) {
      throw new PaletteError(`Invalid option key: '${key}'.`);
    }
    const palette: Palette = {
      name,
      color: value,
      shade: initialOptions.mainShade,
      shades: initialOptions.shades,
    };

    if (isDarkPalette) {
      darkPalettes.push(palette);
      continue;
    }

    lightPalettes.push(palette);
    lightPaletteNames.add(name);
  }

  for (const darkPalette of darkPalettes) {
    if (!lightPaletteNames.has(darkPalette.name)) {
      throw new PaletteError(`Missing base color for dark variant '${darkPalettePrefix}${darkPalette.name}'. Add '${darkPalette.name}' option.`);
    }
  }

  return { lightPalettes, darkPalettes };
};

export const convertResultToCSS = (result: PaletteResult, prefix: string): Record<string, string> => {
  const colors: Record<string, string> = {};
  for (const [key, color] of Object.entries(result)) {
    colors[`--${prefix}${key}`] = color.DEFAULT;
    for (const [shade, colorValue] of Object.entries(color)) {
      if (shade === 'DEFAULT') continue;
      colors[`--${prefix}${key}-${shade}`] = colorValue;
    }
  }
  return colors;
};

export const convertResultToThemeColors = (result: PaletteResult, prefix: string): Record<string, Record<string, string>> => {
  const colors: Record<string, Record<string, string>> = {};

  for (const [key, color] of Object.entries(result)) {
    const themeColor: Record<string, string> = {
      DEFAULT: `var(--${prefix}${key})`,
    };

    for (const shade of Object.keys(color)) {
      if (shade === 'DEFAULT') continue;
      themeColor[shade] = `var(--${prefix}${key}-${shade})`;
    }

    colors[key] = themeColor;
  }

  return colors;
};

import chroma from 'chroma-js';
import { initialOptions } from './consts.js';
import PaletteError from './palette-error.js';
import type { Palette, PaletteResult } from './types.js';

export const isValidColor = (color: string) => {
  return chroma.valid(color);
};

export const getHexColor = (color: string) => {
  return chroma(color).hex().toLowerCase();
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
      throw new PaletteError(`Main shade '${shade}' must be one of: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.`);
    }
  }

  return true;
};

export const getPalettesFromOptions = (options: Record<string, string>): Palette[] => {
  const palettes: Palette[] = [];

  for (const [key, value] of Object.entries(options)) {
    const palette: Palette = {
      name: key,
      color: value,
      shade: initialOptions.mainShade,
      shades: initialOptions.shades,
    };

    palettes.push(palette);
  }

  return palettes;
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

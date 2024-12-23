import chroma from 'chroma-js';
import { initialOptions } from './consts';
import type { Palette } from './types';

export const isColor = (color: string) => {
  const reg = new RegExp(
    /^#([\da-f]{3}){1,2}$|^#([\da-f]{6}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/,
    'gim',
  );
  if (typeof color === 'string' && reg.test(color)) {
    return true;
  }

  return false;
};

export const getHexColor = (color: string) => {
  return chroma(color).hex().toLowerCase();
};

export const checkParam = (palette: Palette): boolean => {
  const { color, name, shade, shades } = palette;

  if (!color || typeof color !== 'string' || !isColor(color)) {
    throw new Error(`Invalid color: '${color}'. Please provide a valid color.`);
  }

  if (!name || typeof name !== 'string') {
    throw new Error(`Invalid name: '${name}'. Please provide a valid name.`);
  }

  if (shade && typeof shade !== 'number') {
    throw new Error(`Invalid shade value: '${shade}'. Shade must be a number.`);
  }

  if (shades) {
    if (!Array.isArray(shades)) {
      throw new Error(`Invalid shades: '${shades}'. Shades must be an array.`);
    }

    if (shades.length < 3) {
      throw new Error('Shades array must contain at least 3 elements.');
    }

    if (shade && !shades.includes(shade)) {
      throw new Error(`Main shade '${shade}' is not included in the shades array.`);
    }
  } else {
    if (shade && !initialOptions.shades.includes(shade)) {
      throw new Error(`Main shade '${shade}' must be one of: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.`);
    }
  }

  return true;
};

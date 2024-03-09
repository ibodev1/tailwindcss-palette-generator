import type { IColorResultOptions, Palette } from './types';
import { isColor } from './utils';

export const initalOptions: IColorResultOptions = {
  mainShade: 500,
  primaryColor: '#FFBD00',
  shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
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
    if (shade && ![50, 100, 200, 300, 400, 500, 600, 700, 800, 900].includes(shade)) {
      throw new Error(`Main shade '${shade}' must be one of: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.`);
    }
  }

  return true;
};

import type { IColorResultOptions, Palette } from './types';

export const initalOptions: IColorResultOptions = {
  mainShade: 500,
  primaryColor: '#FFBD00',
  shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
};

export const isColor = (color: string) => {
  const reg = /^#([\da-f]{3}){1,2}$|^#([\da-f]{6}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/gim;
  if (typeof color === 'string' && reg.test(color)) {
    return true;
  } else {
    return false;
  }
};

export const checkParam = (palette: Palette) => {
  if (palette.color && typeof palette.color === 'string' && palette.name && typeof palette.name == 'string') {
    if (!isColor(palette.color)) {
      throw new Error(
        `'${palette.color}' The value you entered is not a color. e.g #ffbd00 or #ffb or rgba(255, 189, 0, 1) or rgb(255, 189, 0) or hsl(44, 100%, 50%)`,
      );
    } else if (!palette.shade && palette.shades) {
      throw new Error(`If you want to specify the shades, you have to specify the main shade.`);
    } else if (palette.shade && typeof palette.shade !== 'number') {
      throw new Error(`'${palette.shade}' - type: ${typeof palette.shade} It must be of type number.`);
    } else if (palette.shades && !Array.isArray(palette.shades)) {
      throw new Error(`Shades are not array.`);
    } else if (palette.shades && palette.shades.length <= 2) {
      throw new Error(`Shades can consist of at least 3 elements.`);
    } else if (palette.shade && palette.shades && !palette.shades.includes(palette.shade)) {
      throw new Error(`'${palette.shade}' mainShade are not included in the your shades.`);
    } else if (!palette.shades && palette.shade && !initalOptions.shades.includes(palette.shade)) {
      throw new Error(`'${palette.shade}' mainShade can only be 50, 100, 200, 300, 400, 500, 600, 700, 800 or 900.`);
    } else {
      return true;
    }
  } else {
    throw new Error('Make sure the required data is included.');
  }
};

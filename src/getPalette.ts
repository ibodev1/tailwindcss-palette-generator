import { initialOptions } from './consts.js';
import generateColorPalette from './generateColorPalette.js';
import PaletteError from './palette-error.js';
import type { ColorResultOptions, Palette, PaletteResult } from './types.js';
import { checkParam, getHexColor, isValidColor } from './utils.js';

export const getPalette = (params: Palette[] | Palette | string): PaletteResult => {
  const palette: PaletteResult = {};

  if (!params) {
    throw new PaletteError('Please provide a valid palette configuration.');
  }

  const getColorOptions = (colorPalette: Palette): ColorResultOptions => {
    const { color, shade, shades } = colorPalette;

    return {
      mainShade: shade ?? initialOptions.mainShade,
      primaryColor: getHexColor(color),
      shades: shades ?? initialOptions.shades,
    };
  };

  const addPalette = (name: string, options: ColorResultOptions) => {
    palette[name] = generateColorPalette(options);
  };

  if (Array.isArray(params)) {
    for (const colorPalette of params) {
      if (checkParam(colorPalette)) {
        const options = getColorOptions(colorPalette);
        addPalette(colorPalette.name, options);
      }
    }
  } else if (typeof params === 'object' && params !== null) {
    if (checkParam(params)) {
      const options = getColorOptions(params);
      addPalette(params.name, options);
    }
  } else if (typeof params === 'string') {
    if (!isValidColor(params)) {
      throw new PaletteError(`Invalid color: '${params}'. Please provide a valid color.`);
    }

    const options: ColorResultOptions = {
      mainShade: initialOptions.mainShade,
      primaryColor: getHexColor(params),
      shades: initialOptions.shades,
    };
    addPalette('primary', options);
  }

  return palette;
};

export default getPalette;

import { initialOptions } from './consts';
import generateColorPalette from './generateColorPalette';
import type { ColorResultOptions, Palette, PaletteResult } from './types';
import { checkParam, getHexColor, isColor } from './utils';

export const getPalette = (params: Palette[] | Palette | string): PaletteResult => {
  const palette: PaletteResult = {};

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
  } else if (typeof params === 'string' && isColor(params)) {
    const options: ColorResultOptions = {
      mainShade: initialOptions.mainShade,
      primaryColor: getHexColor(params),
      shades: initialOptions.shades,
    };
    addPalette('primary', options);
  }

  return palette;
};

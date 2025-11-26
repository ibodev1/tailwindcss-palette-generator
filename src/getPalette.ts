import type { ColorResultOptions, Palette, PaletteProp, PaletteResult } from './types/index.ts';
import { darkenColor, getHexColor, isValidColor } from './utils/color.ts';
import PaletteError from './utils/error.ts';
import { checkParam, initialOptions } from './utils/index.ts';

const calculateDarkenValue = (shade: number, mainShade: number): number => {
  return (shade - mainShade) / 100 / 2;
};

const shadeColor = (primaryColor: string, mainShade: number, shade: number): string => {
  return darkenColor(primaryColor, calculateDarkenValue(shade, mainShade));
};

const colorResult = (
  fn: (primaryColor: string, mainShade: number, shade: number) => string,
  options: ColorResultOptions,
): Record<PaletteProp, string> => {
  return options.shades.reduce((acc: Record<string, string>, shade: number) => {
    acc[String(shade)] = fn(options.primaryColor, options.mainShade, shade);
    return acc;
  }, {});
};

const generateColorPalette = (options: ColorResultOptions): Record<PaletteProp, string> => {
  try {
    const palette = colorResult(shadeColor, options);
    palette.DEFAULT = getHexColor(options.primaryColor);
    return Object.freeze(palette);
  } catch (error) {
    console.error('Error generating color palette:', error);
    return Object.create(null);
  }
};

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

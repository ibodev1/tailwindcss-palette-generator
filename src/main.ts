import chroma from 'chroma-js';
import colorResult from './colorResult';
import { checkParam, initalOptions } from './helpers';
import type { IColorResultOptions, Palette } from './types';

const getPalette = (params: Palette[] | Palette | string): Record<string, Record<string, string>> => {
  const palette: Record<string, Record<string, string>> = {};

  const generateColorPalette = (options: IColorResultOptions): Record<string, string> => {
    return colorResult(options);
  };

  const getColorOptions = (colorPalette: Palette): IColorResultOptions => {
    const { color, shade, shades } = colorPalette;

    return {
      mainShade: shade ?? initalOptions.mainShade,
      primaryColor: chroma(color).hex() ?? initalOptions.primaryColor,
      shades: shades ?? initalOptions.shades,
    };
  };

  const addPalette = (name: string, options: IColorResultOptions) => {
    palette[name] = generateColorPalette(options);
  };

  if (Array.isArray(params)) {
    for (const colorPalette of params) {
      if (checkParam(colorPalette)) {
        const options = getColorOptions(colorPalette);
        addPalette(colorPalette.name, options);
      }
    }
  } else if (typeof params !== 'string' && !Array.isArray(params)) {
    if (checkParam(params)) {
      const options = getColorOptions(params);
      addPalette(params.name, options);
    }
  } else if (typeof params === 'string') {
    const options: IColorResultOptions = {
      mainShade: initalOptions.mainShade,
      primaryColor: chroma(params).hex(),
      shades: initalOptions.shades,
    };
    addPalette('primary', options);
  }

  return palette;
};

export default getPalette;

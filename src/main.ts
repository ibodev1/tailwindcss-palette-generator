import chroma from 'chroma-js';
import colorResult from './colorResult';
import colors from './data/colors';
import { checkParam, initalOptions } from './helpers';
import type { IColorResultOptions, Palette } from './types';

const getPalette = (params: Palette[] | Palette | keyof typeof colors | string): any => {
  const palette: any = {};
  if (Array.isArray(params)) {
    for (let i = 0; i < params.length; i++) {
      const colorPalette = params[i];
      if (checkParam(colorPalette)) {
        const options: IColorResultOptions = {
          mainShade: colorPalette.shade ?? initalOptions.mainShade,
          primaryColor: chroma(colorPalette.color).hex() ?? initalOptions.primaryColor,
          shades: colorPalette.shades ?? initalOptions.shades,
        };

        palette[colorPalette.name] = colorResult(options);
      }
    }
  } else if (typeof params !== 'string' && !Array.isArray(params)) {
    if (checkParam(params)) {
      const options: IColorResultOptions = {
        mainShade: params.shade ?? initalOptions.mainShade,
        primaryColor: chroma(params.color).hex() ?? initalOptions.primaryColor,
        shades: params.shades ?? initalOptions.shades,
      };

      palette[params.name] = colorResult(options);
    }
  } else if (typeof params === 'string') {
    let options: IColorResultOptions = {
      mainShade: initalOptions.mainShade,
      primaryColor: initalOptions.primaryColor,
      shades: initalOptions.shades,
    };

    const stringColor = colors[params as keyof typeof colors];
    if (colors && stringColor) {
      options = Object.assign(initalOptions, {
        primaryColor: stringColor ?? initalOptions.primaryColor,
      });
    } else {
      options = Object.assign(initalOptions, {
        primaryColor: chroma(params).hex(),
      });
    }

    palette['primary'] = colorResult(options);
  }
  return palette;
};

export default getPalette;

import chroma from 'chroma-js';
import type { IColorResultOptions } from './types';

const darkenValue = (shade: number, mainShade: number) => {
  return (shade - mainShade) / 100 / 2;
};
const shadeColor = (primaryColor: string, mainShade: number, shade: number) => {
  return chroma(primaryColor).darken(darkenValue(shade, mainShade)).hex();
};
const shadeColorResult = (fn: any, options: IColorResultOptions) => {
  return options.shades.reduce((acc: any, shade: number) => {
    acc[shade] = fn(options.primaryColor, options.mainShade, shade);
    return acc;
  }, {});
};
const colorResult = (options: IColorResultOptions) => {
  const palette = shadeColorResult(shadeColor, options);
  const colorPalette = {
    ...palette,
    DEFAULT: options.primaryColor,
  };
  return Object.freeze(colorPalette) ?? {};
};

export default colorResult;

import chroma from 'chroma-js';
import type { ColorResultOptions, PaletteProp } from './types';
import { getHexColor } from './utils';

const calculateDarkenValue = (shade: number, mainShade: number): number => {
  return (shade - mainShade) / 100 / 2;
};

const shadeColor = (primaryColor: string, mainShade: number, shade: number): string => {
  return chroma(primaryColor).darken(calculateDarkenValue(shade, mainShade)).hex();
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
    return Object.create(null);
  }
};

export default generateColorPalette;

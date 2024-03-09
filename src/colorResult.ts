import chroma from 'chroma-js';
import type { IColorResultOptions } from './types';

/**
 * Calculates the darkening value based on the provided shade and mainShade.
 * @param shade - The shade value to darken.
 * @param mainShade - The main shade value.
 * @returns The darkening value.
 */
const calculateDarkenValue = (shade: number, mainShade: number): number => {
  return (shade - mainShade) / 100 / 2;
};

/**
 * Shades the primary color based on the provided shade and mainShade.
 * @param primaryColor - The primary color.
 * @param mainShade - The main shade value.
 * @param shade - The shade value.
 * @returns The shaded color in hexadecimal format.
 */
const shadeColor = (primaryColor: string, mainShade: number, shade: number): string => {
  return chroma(primaryColor).darken(calculateDarkenValue(shade, mainShade)).hex();
};

/**
 * Generates the color palette based on the provided options.
 * @param fn - The function to apply shade to the primary color.
 * @param options - The color result options.
 * @returns The generated color palette.
 */
const generateColorPalette = (
  fn: (primaryColor: string, mainShade: number, shade: number) => string,
  options: IColorResultOptions,
): Record<string, string> => {
  return options.shades.reduce((acc: Record<string, string>, shade: number) => {
    acc[String(shade)] = fn(options.primaryColor, options.mainShade, shade);
    return acc;
  }, {});
};

/**
 * Generates the final color result based on the provided options.
 * @param options - The color result options.
 * @returns The final color result.
 */
const colorResult = (options: IColorResultOptions): Record<string, string> => {
  try {
    const palette = generateColorPalette(shadeColor, options);
    palette.DEFAULT = options.primaryColor;
    return Object.freeze(palette);
  } catch (error) {
    console.error('Error generating color result:', error);
    return Object.create(null); // Return an empty object in case of error.
  }
};

export default colorResult;

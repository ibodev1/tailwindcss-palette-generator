import type { ColorResultOptions, Palette, PaletteProp, PaletteResult } from './types/index.ts';
import { isValidColor, shiftLightness, toHex } from './utils/color.ts';
import PaletteError from './utils/error.ts';
import { checkParam, initialOptions } from './utils/index.ts';

const computeShadeOffset = (shade: number, baseShade: number): number => (shade - baseShade) / 100 / 2;

const generateShadeColor = (baseColor: string, baseShade: number, shade: number): string =>
  shiftLightness(baseColor, computeShadeOffset(shade, baseShade));

const buildShadeMap = (options: ColorResultOptions): Record<PaletteProp, string> =>
  options.shades.reduce<Record<string, string>>((acc, shade) => {
    acc[String(shade)] = generateShadeColor(options.primaryColor, options.mainShade, shade);
    return acc;
  }, {});

const generateColorPalette = (options: ColorResultOptions): Record<PaletteProp, string> => {
  const palette = buildShadeMap(options);
  palette.DEFAULT = toHex(options.primaryColor);
  return Object.freeze(palette);
};

const resolveColorOptions = (config: Palette): ColorResultOptions => ({
  mainShade: config.shade ?? initialOptions.mainShade,
  primaryColor: toHex(config.color),
  shades: config.shades ?? initialOptions.shades,
});

export const getPalette = (params: Palette[] | Palette | string): PaletteResult => {
  if (!params) {
    throw new PaletteError('Please provide a valid palette configuration.');
  }

  const result: PaletteResult = {};

  const addPalette = (name: string, options: ColorResultOptions): void => {
    result[name] = generateColorPalette(options);
  };

  if (Array.isArray(params)) {
    for (const config of params) {
      if (checkParam(config)) {
        addPalette(config.name, resolveColorOptions(config));
      }
    }
  } else if (typeof params === 'object' && params !== null) {
    if (checkParam(params)) {
      addPalette(params.name, resolveColorOptions(params));
    }
  } else if (typeof params === 'string') {
    if (!isValidColor(params)) {
      throw new PaletteError(`Invalid color: '${params}'. Please provide a valid color.`);
    }
    addPalette('primary', {
      mainShade: initialOptions.mainShade,
      primaryColor: toHex(params),
      shades: initialOptions.shades,
    });
  }

  return result;
};

export default getPalette;

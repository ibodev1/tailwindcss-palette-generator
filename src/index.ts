import createPlugin from 'tailwindcss/plugin';
import { getPalette } from './getPalette.ts';
import PaletteError from './utils/error.ts';
import { convertResultToCSS, convertResultToThemeColors, getPalettesFromOptions } from './utils/index.ts';

type PluginWithOptions = ReturnType<typeof createPlugin.withOptions<Record<string, string>>>;

const defaultColorPrefix = 'color-';

const paletteGeneratorPlugin: PluginWithOptions = createPlugin.withOptions<Record<string, string>>(
  (options = {}) => {
    return function ({ addBase, theme }) {
      if (!options) {
        throw new PaletteError('Please provide options to the plugin.');
      }

      let colorPrefix = theme('--prefix', defaultColorPrefix);
      colorPrefix = colorPrefix.replace(/['"]/g, '');

      const { lightPalettes, darkPalettes } = getPalettesFromOptions(options);

      if (lightPalettes.length > 0) {
        const result = getPalette(lightPalettes);
        const darkResult = darkPalettes.length > 0 ? getPalette(darkPalettes) : null;
        const prefixList = colorPrefix === defaultColorPrefix ? [defaultColorPrefix] : [defaultColorPrefix, colorPrefix];
        const rootCss: Record<string, string> = {};
        const darkCss: Record<string, string> = {};

        for (const prefix of prefixList) {
          Object.assign(rootCss, convertResultToCSS(result, prefix));

          if (darkResult) {
            Object.assign(darkCss, convertResultToCSS(darkResult, prefix));
          }
        }
        const baseStyles: Record<string, Record<string, string>> = {
          ':root': rootCss,
        };

        if (darkResult) {
          baseStyles['.dark'] = darkCss;
        }
        addBase(baseStyles);
      }
    };
  },
  (options = {}) => {
    if (!options) {
      throw new PaletteError('Please provide options to the plugin.');
    }

    const { lightPalettes } = getPalettesFromOptions(options);

    if (lightPalettes.length > 0) {
      const result = getPalette(lightPalettes);

      return {
        theme: {
          extend: {
            colors: convertResultToThemeColors(result, defaultColorPrefix),
          },
        },
      };
    }

    return {};
  },
);

export default paletteGeneratorPlugin;

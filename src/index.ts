import createPlugin from 'tailwindcss/plugin';
import { getPalette } from './getPalette.js';
import PaletteError from './palette-error.js';
import { convertResultToCSS, getPalettesFromOptions } from './utils.js';

type PluginWithOptions = ReturnType<typeof createPlugin.withOptions<Record<string, string>>>;

const pluginFn: PluginWithOptions = createPlugin.withOptions<Record<string, string>>(
  (options = {}) => {
    return function ({ addBase, theme }) {
      if (!options) {
        throw new PaletteError('Please provide options to the plugin.');
      }

      let colorPrefix = theme('--prefix', 'color-');
      colorPrefix = colorPrefix.replace(/['"]/g, '');

      const palettes = getPalettesFromOptions(options);

      if (palettes.length > 0) {
        const result = getPalette(palettes);
        const css = convertResultToCSS(result, colorPrefix);
        addBase({
          ':root': css,
        });
      }
    };
  },
  (options = {}) => {
    if (!options) {
      throw new PaletteError('Please provide options to the plugin.');
    }

    const palettes = getPalettesFromOptions(options);

    if (palettes.length > 0) {
      const result = getPalette(palettes);

      return {
        theme: {
          extend: {
            colors: result,
          },
        },
      };
    }

    return {};
  },
);

// is options function
//! Error: The plugin "tailwindcss-palette-generator" does not accept options
pluginFn.__isOptionsFunction = true;
const paletteGeneratorPlugin = Object.assign(pluginFn, {
  __isOptionsFunction: true,
}) as PluginWithOptions;
Object.defineProperty(paletteGeneratorPlugin, '__isOptionsFunction', {
  value: true,
  writable: false,
  configurable: false,
  enumerable: false,
});

export default paletteGeneratorPlugin;

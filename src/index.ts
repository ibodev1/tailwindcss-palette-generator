import createPlugin from 'tailwindcss/plugin';
import { getPalette } from './getPalette.js';
import { convertResultToCSS, getPalettesFromOptions } from './utils.js';

type PluginWithOptions = ReturnType<typeof createPlugin.withOptions<Record<string, string>>>;

const pluginFn: PluginWithOptions = createPlugin.withOptions<Record<string, string>>(
  (options = {}) => {
    return function ({ addBase }) {
      if (!options) return;

      const palettes = getPalettesFromOptions(options);

      if (palettes.length > 0) {
        const result = getPalette(palettes);
        const css = convertResultToCSS(result);
        addBase({
          ':root': css,
        });
      }
    };
  },
  (options = {}) => {
    if (!options) return {};

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

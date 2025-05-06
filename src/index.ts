import createPlugin from 'tailwindcss/plugin';
import { initialOptions } from './consts';
import { getPalette } from './getPalette';
import type { Palette } from './types';
import { convertResultToCSS, getPalettesFromOptions } from './utils';

export * from './getPalette';

type PluginWithOptions = ReturnType<typeof createPlugin.withOptions<Record<string, string>>>;

const paletteGeneratorPlugin: PluginWithOptions = createPlugin.withOptions<Record<string, string>>(
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

paletteGeneratorPlugin.__isOptionsFunction = true;

export default paletteGeneratorPlugin;

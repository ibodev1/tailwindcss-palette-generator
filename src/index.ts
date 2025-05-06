import createPlugin from 'tailwindcss/plugin';
import { initialOptions } from './consts';
import { getPalette } from './getPalette';
import type { Palette } from './types';
import { convertResultToCSS } from './utils';

export * from './getPalette';

type PluginWithOptions = ReturnType<typeof createPlugin.withOptions<Record<string, string>>>;

const paletteGeneratorPlugin: PluginWithOptions = createPlugin.withOptions<Record<string, string>>(
  (options = {}) =>
    ({ addBase }) => {
      if (!options) return;

      const palettes: Palette[] = [];

      for (const [key, value] of Object.entries(options)) {
        const palette: Palette = {
          name: key,
          color: value,
          shade: initialOptions.mainShade,
          shades: initialOptions.shades,
        };

        palettes.push(palette);
      }

      if (palettes.length > 0) {
        const result = getPalette(palettes);
        const css = convertResultToCSS(result);
        addBase({
          ':root': css,
        });
      }
    },
  (options = {}) => {
    if (!options) return {};

    const palettes: Palette[] = [];

    for (const [key, value] of Object.entries(options)) {
      const palette: Palette = {
        name: key,
        color: value,
        shade: initialOptions.mainShade,
        shades: initialOptions.shades,
      };

      palettes.push(palette);
    }

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

import type { ColorResultOptions } from './types.js';

export const initialOptions: Omit<ColorResultOptions, 'primaryColor'> = {
  mainShade: 500,
  shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
};

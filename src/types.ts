export interface ColorResultOptions {
  primaryColor: string;
  mainShade: number;
  shades: number[];
}

export interface Palette {
  name: string;
  color: string;
  shade?: number;
  shades?: number[];
}

export type PaletteProp = `${number}` | 'DEFAULT';

export type PaletteResult = Record<string, Record<PaletteProp, string>>;

/**
 * tailwindcss-palette-generator v0.4.3
 * Copyright 2023 @ibodev1 <github.com/ibodev1>
 */

interface Palette {
    name: string;
    color: string;
    shade?: number;
    shades?: number[];
}

declare const getPalette: (params: Palette[] | Palette | string) => any;

export { getPalette as default };

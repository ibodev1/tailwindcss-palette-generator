interface Palette {
    name: string;
    color: string;
    shade?: number;
    shades?: number[];
}
declare const getPalette: (params?: Palette[] | Palette | string) => any;

export { Palette, getPalette as default };

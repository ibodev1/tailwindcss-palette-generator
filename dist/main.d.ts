interface Palette {
    name: string;
    color: string;
    shade?: number;
    shades?: number[];
}
declare const getPalette: (params?: Palette[] | Palette | string) => {
    [key: string]: string;
} | {
    [key: string]: string;
}[] | undefined;

export { Palette, getPalette as default };

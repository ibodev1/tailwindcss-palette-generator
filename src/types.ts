export interface IColorResultOptions {
    primaryColor: string;
    mainShade: number;
    shades: number[]
}

export interface Palette {
    name: string;
    color: string;
    shade?: number;
    shades?: number[];
}
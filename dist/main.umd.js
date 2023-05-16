/**
 * tailwindcss-palette-generator v0.4.3
 * Copyright 2023 @ibodev1 <github.com/ibodev1>
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chroma-js')) :
    typeof define === 'function' && define.amd ? define(['chroma-js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["tailwindcss-palette-generator"] = factory(global["chroma-js"]));
})(this, (function (chroma) { 'use strict';

    var colors = {
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "aqua": "#00ffff",
        "aquamarine": "#7fffd4",
        "azure": "#f0ffff",
        "beige": "#f5f5dc",
        "bisque": "#ffe4c4",
        "black": "#000000",
        "blanchedalmond": "#ffebcd",
        "blue": "#0000ff",
        "blueviolet": "#8a2be2",
        "brown": "#a52a2a",
        "burlywood": "#deb887",
        "cadetblue": "#5f9ea0",
        "chartreuse": "#7fff00",
        "chocolate": "#d2691e",
        "coral": "#ff7f50",
        "cornflowerblue": "#6495ed",
        "cornsilk": "#fff8dc",
        "crimson": "#dc143c",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9",
        "darkgreen": "#006400",
        "darkgrey": "#a9a9a9",
        "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b",
        "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00",
        "darkorchid": "#9932cc",
        "darkred": "#8b0000",
        "darksalmon": "#e9967a",
        "darkseagreen": "#8fbc8f",
        "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f",
        "darkslategrey": "#2f4f4f",
        "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3",
        "deeppink": "#ff1493",
        "deepskyblue": "#00bfff",
        "dimgray": "#696969",
        "dimgrey": "#696969",
        "dodgerblue": "#1e90ff",
        "firebrick": "#b22222",
        "floralwhite": "#fffaf0",
        "forestgreen": "#228b22",
        "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc",
        "ghostwhite": "#f8f8ff",
        "gold": "#ffd700",
        "goldenrod": "#daa520",
        "gray": "#808080",
        "green": "#008000",
        "greenyellow": "#adff2f",
        "grey": "#808080",
        "honeydew": "#f0fff0",
        "hotpink": "#ff69b4",
        "indianred": "#cd5c5c",
        "indigo": "#4b0082",
        "ivory": "#fffff0",
        "khaki": "#f0e68c",
        "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5",
        "lawngreen": "#7cfc00",
        "lemonchiffon": "#fffacd",
        "lightblue": "#add8e6",
        "lightcoral": "#f08080",
        "lightcyan": "#e0ffff",
        "lightgoldenrodyellow": "#fafad2",
        "lightgray": "#d3d3d3",
        "lightgreen": "#90ee90",
        "lightgrey": "#d3d3d3",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa",
        "lightskyblue": "#87cefa",
        "lightslategray": "#778899",
        "lightslategrey": "#778899",
        "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0",
        "lime": "#00ff00",
        "limegreen": "#32cd32",
        "linen": "#faf0e6",
        "magenta": "#ff00ff",
        "maroon": "#800000",
        "mediumaquamarine": "#66cdaa",
        "mediumblue": "#0000cd",
        "mediumorchid": "#ba55d3",
        "mediumpurple": "#9370db",
        "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a",
        "mediumturquoise": "#48d1cc",
        "mediumvioletred": "#c71585",
        "midnightblue": "#191970",
        "mintcream": "#f5fffa",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "navy": "#000080",
        "oldlace": "#fdf5e6",
        "olive": "#808000",
        "olivedrab": "#6b8e23",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98",
        "paleturquoise": "#afeeee",
        "palevioletred": "#db7093",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "peru": "#cd853f",
        "pink": "#ffc0cb",
        "plum": "#dda0dd",
        "powderblue": "#b0e0e6",
        "purple": "#800080",
        "red": "#ff0000",
        "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1",
        "saddlebrown": "#8b4513",
        "salmon": "#fa8072",
        "sandybrown": "#f4a460",
        "seagreen": "#2e8b57",
        "seashell": "#fff5ee",
        "sienna": "#a0522d",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "slateblue": "#6a5acd",
        "slategray": "#708090",
        "slategrey": "#708090",
        "snow": "#fffafa",
        "springgreen": "#00ff7f",
        "steelblue": "#4682b4",
        "tan": "#d2b48c",
        "teal": "#008080",
        "thistle": "#d8bfd8",
        "tomato": "#ff6347",
        "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3",
        "white": "#ffffff",
        "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00",
        "yellowgreen": "#9acd32"
    };

    const darkenValue = (shade, mainShade) => {
        return (shade - mainShade) / 100 / 2;
    };
    const shadeColor = (primaryColor, mainShade, shade) => {
        return chroma(primaryColor)
            .darken(darkenValue(shade, mainShade))
            .hex();
    };
    const shadeColorResult = (fn, options) => {
        return options.shades.reduce((acc, shade) => {
            acc[shade] = fn(options.primaryColor, options.mainShade, shade);
            return acc;
        }, {});
    };
    const colorResult = (options) => {
        const palette = shadeColorResult(shadeColor, options);
        const colorPalette = {
            ...palette,
            DEFAULT: options.primaryColor
        };
        return Object.freeze(colorPalette) ?? {};
    };

    const initalOptions = {
        mainShade: 500,
        primaryColor: "#FFBD00",
        shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    };
    const isColor = (color) => {
        const reg = /^#([\da-f]{3}){1,2}$|^#([\da-f]{6}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/gim;
        if (typeof color === "string" && reg.test(color)) {
            return true;
        }
        else {
            return false;
        }
    };
    const checkParam = (palette) => {
        if (palette.color &&
            typeof palette.color === "string" &&
            palette.name &&
            typeof palette.name == "string") {
            if (!isColor(palette.color)) {
                throw new Error(`'${palette.color}' The value you entered is not a color. e.g #ffbd00 or #ffb or rgba(255, 189, 0, 1) or rgb(255, 189, 0) or hsl(44, 100%, 50%)`);
            }
            else if (!palette.shade && palette.shades) {
                throw new Error(`If you want to specify the shades, you have to specify the main shade.`);
            }
            else if (palette.shade && typeof palette.shade !== "number") {
                throw new Error(`'${palette.shade}' - type: ${typeof palette.shade} It must be of type number.`);
            }
            else if (palette.shades &&
                !Array.isArray(palette.shades)) {
                throw new Error(`Shades are not array.`);
            }
            else if (palette.shades && palette.shades.length <= 2) {
                throw new Error(`Shades can consist of at least 3 elements.`);
            }
            else if (palette.shade &&
                palette.shades &&
                !palette.shades.includes(palette.shade)) {
                throw new Error(`'${palette.shade}' mainShade are not included in the your shades.`);
            }
            else if (!palette.shades &&
                palette.shade &&
                !initalOptions.shades.includes(palette.shade)) {
                throw new Error(`'${palette.shade}' mainShade can only be 50, 100, 200, 300, 400, 500, 600, 700, 800 or 900.`);
            }
            else {
                return true;
            }
        }
        else {
            throw new Error("Make sure the required data is included.");
        }
    };

    const getPalette = (params) => {
        let palette = {};
        if (Array.isArray(params)) {
            for (let i = 0; i < params.length; i++) {
                const colorPalette = params[i];
                if (checkParam(colorPalette)) {
                    const options = {
                        mainShade: colorPalette.shade ?? initalOptions.mainShade,
                        primaryColor: chroma(colorPalette.color).hex() ?? initalOptions.primaryColor,
                        shades: colorPalette.shades ?? initalOptions.shades
                    };
                    palette[colorPalette.name] = colorResult(options);
                }
            }
        }
        else if (typeof params !== "string" && !Array.isArray(params)) {
            if (checkParam(params)) {
                const options = {
                    mainShade: params.shade ?? initalOptions.mainShade,
                    primaryColor: chroma(params.color).hex() ?? initalOptions.primaryColor,
                    shades: params.shades ?? initalOptions.shades
                };
                palette[params.name] = colorResult(options);
            }
        }
        else if (typeof params === "string") {
            let options = {
                mainShade: initalOptions.mainShade,
                primaryColor: initalOptions.primaryColor,
                shades: initalOptions.shades
            };
            const stringColor = colors[params];
            if (colors && stringColor) {
                options = Object.assign(initalOptions, {
                    primaryColor: stringColor ?? initalOptions.primaryColor
                });
            }
            else {
                options = Object.assign(initalOptions, {
                    primaryColor: chroma(params).hex()
                });
            }
            palette["primary"] = colorResult(options);
        }
        return palette;
    };

    return getPalette;

}));

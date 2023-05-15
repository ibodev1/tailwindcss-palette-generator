/**
 * tailwindcss-palette-generator v0.4.2
 * Copyright 2023 @ibodev1 <github.com/ibodev1>
 */

import chroma from 'chroma-js';

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
        const options = Object.assign(initalOptions, {
            primaryColor: chroma(params).hex()
        });
        palette["primary"] = colorResult(options);
    }
    return palette;
};

export { getPalette as default };

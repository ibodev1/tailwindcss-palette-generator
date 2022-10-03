const chroma = require('chroma-js');

const main = {
    state: {
        primaryColor: "#FFBD00",
        shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
        mainShade: 500
    },
    getters: {
        darkenValue: (shade) => {
            return (shade - main.state.mainShade) / 100 / 2;
        },
        shadeColor: (shade = 500) => {
            return chroma(main.state.primaryColor)
                .darken(main.getters.darkenValue(shade))
                .hex();
        },
        shadeColorResult: (fn) => {
            return main.state.shades.reduce((acc, shade) => {
                acc[shade] = fn(shade);
                return acc;
            }, {});
        },
        colorResult() {
            const palette = main.getters.shadeColorResult(main.getters.shadeColor);
            const DEFAULT = main.getters.shadeColor(main.state.mainShade);

            return {
                DEFAULT,
                ...palette
            };
        }
    }
};

const initialParams = {
    color: main.state.primaryColor,
    name: "primary",
    shade: 500
};

const getPalette = (params = initialParams) => {
    let palette = {};
    if (typeof params === "object" && params.length) {
        for (let index = 0; index < params.length; index++) {
            const colorPalette = params[index];
            if (colorPalette.color && typeof colorPalette.color === "string" && colorPalette.name && typeof colorPalette.name == "string") {
                if (!colorPalette.color.startsWith("#") && !colorPalette.color.startsWith("rgb") && !colorPalette.color.startsWith("hsl") && !colorPalette.color.startsWith("rgba")) {
                    throw new Error(`'${colorPalette.color}' The value you entered is not a color. e.g #ffbd00 or #ffb or rgba(255, 189, 0, 1) or rgb(255, 189, 0) or hsl(44, 100%, 50%)`);
                } else if (colorPalette.color.length < 2) {
                    throw new Error(`'${colorPalette.color}' The name can be at least 2 in length.`);
                } else if (colorPalette.shade && typeof colorPalette.shade == "number" && !main.state.shades.includes(colorPalette.shade)) {
                    throw new Error(`'${colorPalette.shade}' mainShade can only be 50, 100, 200, 300, 400, 500, 600, 700, 800 or 900.`);
                } else {
                    main.state.primaryColor = chroma(colorPalette.color).hex();
                    if (colorPalette.shade && typeof colorPalette.shade === "number") {
                        main.state.mainShade = colorPalette.shade;
                    } else {
                        throw new Error(`'${colorPalette.shade}' - type: ${typeof colorPalette.shade} It must be of type number.`);
                    }
                    let result = main.getters.colorResult();

                    palette[colorPalette.name] = {
                        ...result
                    };
                }
            } else {
                throw new Error("Make sure the required data is included.");
            }
        }
        return palette;
    } else if (typeof params === "object" && !params.length && params.color && typeof params.color === "string" && params.name && typeof params.name == "string") {
        if (!params.color.startsWith("#") && !params.color.startsWith("rgb") && !params.color.startsWith("hsl") && !params.color.startsWith("rgba")) {
            throw new Error(`'${params.color}' The value you entered is not a color. e.g #ffbd00 or #ffb`);
        } else if (params.color.length < 2) {
            throw new Error(`'${params.color}' The name can be at least 2 in length.`);
        } else if (!main.state.shades.includes(params.shade)) {
            throw new Error(`'${params.color}' mainShade can only be 50, 100, 200, 300, 400, 500, 600, 700, 800 or 900.`);
        } else {
            main.state.primaryColor = chroma(params.color).hex();
            if (params.shade && typeof params.shade === "number") {
                main.state.mainShade = params.shade;
            } else {
                throw new Error(`'${params.shade}' - type: ${typeof params.shade} It must be of type number.`);
            }
            let result = main.getters.colorResult();

            palette[params.name] = {
                ...result
            };
        };
        return palette;
    } else {
        throw new Error("Make sure the required data is included.");
    }
};

module.exports = getPalette;

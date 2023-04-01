import chroma from "chroma-js";

export interface Palette {
  name: string;
  color: string;
  shade?: number;
  shades?: number[];
}

const main = {
  state: {
    initialParams: {
      color: "#FFBD00",
      name: "primary",
      shade: 500,
      shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    primaryColor: "#FFBD00",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    mainShade: 500
  },
  getters: {
    darkenValue: (shade: number) => {
      return (shade - main.state.mainShade) / 100 / 2;
    },
    shadeColor: (shade: number) => {
      return chroma(main.state.primaryColor)
        .darken(main.getters.darkenValue(shade))
        .hex();
    },
    shadeColorResult: (fn: any) => {
      return main.state.shades.reduce((acc: any, shade: number) => {
        acc[shade] = fn(shade);
        return acc;
      }, {});
    },
    colorResult: () => {
      const palette = main.getters.shadeColorResult(main.getters.shadeColor);
      const DEFAULT = main.getters.shadeColor(main.state.mainShade);
      const colorPalette = {
        ...palette,
        DEFAULT: DEFAULT
      };
      return Object.freeze(colorPalette) ?? {};
    }
  },
  checks: {
    checkParam: (palette: Palette) => {
      if (
        palette.color &&
        typeof palette.color === "string" &&
        palette.name &&
        typeof palette.name == "string"
      ) {
        if (!main.checks.checkColor(palette.color)) {
          throw new Error(
            `'${palette.color}' The value you entered is not a color. e.g #ffbd00 or #ffb or rgba(255, 189, 0, 1) or rgb(255, 189, 0) or hsl(44, 100%, 50%)`
          );
        } else if (!palette.shade && palette.shades) {
          throw new Error(
            `If you want to specify the shades, you have to specify the main shade.`
          );
        } else if (palette.shade && typeof palette.shade !== "number") {
          throw new Error(
            `'${palette.shade}' - type: ${typeof palette.shade} It must be of type number.`
          );
        } else if (
          palette.shades &&
          !Array.isArray(palette.shades)
        ) {
          throw new Error(`Shades are not array.`);
        } else if (palette.shades && palette.shades.length <= 2) {
          throw new Error(`Shades can consist of at least 3 elements.`);
        } else if (
          palette.shade &&
          palette.shades &&
          !palette.shades.includes(palette.shade)
        ) {
          throw new Error(
            `'${palette.shade}' mainShade are not included in the your shades.`
          );
        } else if (
          !palette.shades &&
          palette.shade &&
          !main.state.initialParams.shades.includes(palette.shade)
        ) {
          throw new Error(
            `'${palette.shade}' mainShade can only be 50, 100, 200, 300, 400, 500, 600, 700, 800 or 900.`
          );
        } else {
          return true;
        }
      } else {
        throw new Error("Make sure the required data is included.");
      }
    },
    checkColor: (color: string) => {
      var reg = /^#([\da-f]{3}){1,2}$|^#([\da-f]{6}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/gim;
      if (typeof color === "string" && reg.test(color)) {
        return true;
      } else {
        return false;
      }
    }
  }
};

const getPalette = (
  params: Palette[] | Palette | string = main.state.initialParams
): any => {
  let palette: any = {};
  main.state.primaryColor = "#FFBD00";
  main.state.mainShade = 500;
  main.state.shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  if (Array.isArray(params)) {
    for (let index = 0; index < params.length; index++) {
      const colorPalette = params[index];
      if (main.checks.checkParam(colorPalette)) {
        main.state.primaryColor = chroma(colorPalette.color).hex();
        main.state.mainShade = colorPalette.shade || main.state.mainShade;
        main.state.shades = colorPalette.shades || main.state.shades;
        let result = main.getters.colorResult();

        palette[colorPalette.name] = result;
      }
    }
    return palette;
  } else if (typeof params !== "string" && !Array.isArray(params)) {
    if (main.checks.checkParam(params)) {
      main.state.primaryColor = chroma(params.color).hex();
      main.state.mainShade = params.shade || main.state.mainShade;
      main.state.shades = params.shades || main.state.shades;
      let result = main.getters.colorResult();

      palette[params.name] = result;

      return palette;
    }
  } else if (typeof params === "string") {
    main.state.primaryColor = chroma(params.toString()).hex();
    let result = main.getters.colorResult();

    palette[main.state.initialParams.name] = result;

    return palette;
  }
};

export default getPalette;

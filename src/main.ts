import chroma from "chroma-js";
import type { IColorResultOptions, Palette } from "./types";
import colorResult from "./colorResult";
import { checkParam, initalOptions } from "./helpers";

const getPalette = (params: Palette[] | Palette | string): any => {
  let palette: any = {};
  if (Array.isArray(params)) {
    for (let i = 0; i < params.length; i++) {
      const colorPalette = params[i];
      if (checkParam(colorPalette)) {
        const options: IColorResultOptions = {
          mainShade: colorPalette.shade ?? initalOptions.mainShade,
          primaryColor: chroma(colorPalette.color).hex() ?? initalOptions.primaryColor,
          shades: colorPalette.shades ?? initalOptions.shades
        };

        palette[colorPalette.name] = colorResult(options);
      }
    }
  } else if (typeof params !== "string" && !Array.isArray(params)) {
    if (checkParam(params)) {
      const options: IColorResultOptions = {
        mainShade: params.shade ?? initalOptions.mainShade,
        primaryColor: chroma(params.color).hex() ?? initalOptions.primaryColor,
        shades: params.shades ?? initalOptions.shades
      };

      palette[params.name] = colorResult(options);
    }
  } else if (typeof params === "string") {
    const options: IColorResultOptions = Object.assign(initalOptions, {
      primaryColor: chroma(params).hex()
    });

    palette["primary"] = colorResult(options);
  }
  return palette;
};

export default getPalette;

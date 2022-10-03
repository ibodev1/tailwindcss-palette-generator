const chroma = require('./lib/chroma.min.js');

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

const getPallette = (color = main.state.primaryColor, name = "primary", mainShade = 500) => {
  if ((color.length === 4 || color.length === 7) && color.includes("#", 0)) {
    main.state.primaryColor = color;
    main.state.mainShade = mainShade;
    let result = main.getters.colorResult();
    let palette = {};

    palette[name] = {
      ...result
    };

    const paletteText = `
      ${name} : {
        DEFAULT:  '${palette[name].DEFAULT}',
        '50': '${palette[name]['50']}',
        '100': '${palette[name]['100']}',
        '200': '${palette[name]['200']}',
        '300': '${palette[name]['300']}',
        '400': '${palette[name]['400']}',
        '500': '${palette[name]['500']}',
        '600': '${palette[name]['600']}',
        '700': '${palette[name]['700']}',
        '800': '${palette[name]['800']}',
        '900': '${palette[name]['900']}',
      }`;
    return {palette, paletteText, name, defaultColor: palette[name].DEFAULT, mainShade};
  } else if(name.length < 2) {
    return "The name can be at least 2 in length.";
  } else if(!main.state.shades.includes(mainShade)) {
    return "mainShade can only be 50, 100, 200, 300, 400, 500, 600, 700, 800 or 900.";
  } else {
    return "The value you entered is not a color. e.g #ffbd00 or #ffb";
  }
};

module.exports = getPallette;

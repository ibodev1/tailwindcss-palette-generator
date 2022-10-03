const getPallette = require('./index');

const palette = getPallette("#ffbd00","primary", 500);

const primary = palette.palette;

const paletteName = palette.name;

const paletteDefaultColor = palette.defaultColor;

const paletteMainShade = palette.mainShade;

console.log(primary);
console.log("Palette Name : " + paletteName);
console.log("Palette Default Color : " + paletteDefaultColor);
console.log("Palette Main Shade " + paletteMainShade);
![tailwind](https://i.hizliresim.com/ay6gwss.png)
### tailwind.config.js usage example.

```js
const getPallette = require('tailwindcss-palette-generator');

const primary = getPallette("#FFBD00","primary", 500);
const secondary = getPallette("#4D5463", "secondary", 500);
const mainGray = getPallette("#F1F2F2", "mainGray", 500);

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        ...primary.palette,
        ...secondary.palette,
        ...mainGray.palette,
      }
    },
  },
  plugins: [],
}
```

## 🎉 Installation

yarn

> yarn add tailwindcss-palette-generator

npm

> npm i tailwindcss-palette-generator

## 👀 Usage

### Import

```js
    const getPallette = require('tailwindcss-palette-generator');
```

### getPallette()

```js
    const palette = getPallette("#ffbd00","primary", 500);
```

#### First Param : #ffbd00

Enter which color palette you want to create.

##### Requires!

- A color code in hex format must be entered. Must have a '#' at the beginning.

- Color must be 3 characters or 6 characters. without the '#'.

#### Second Param : primary

whatever you want to make the name of your palette.

##### Requires!

- must be at least 2 characters long.

#### Last Param : 500

You can specify from what time the main color of your palette starts.

##### Requires!

- main color can only be 50, 100, 200, 300, 400, 500, 600, 700, 800 or 900.


## Example

```js
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
```

## Output
![output](https://i.hizliresim.com/e43l1g5.jpg)

## 🚀 What did i use?

- [chroma.js](https://gka.github.io/chroma.js/)
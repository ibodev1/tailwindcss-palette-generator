![tailwind](https://i.hizliresim.com/abke1nw.png)

### Next.js + tailwind.config.js usage example.

```js
const getPalette = require("tailwindcss-palette-generator");

const palette = getPalette([
  {
    color: "rgb(255, 189, 0)", // required
    name: "primary", // required
    shade: 400
  },
  {
    color: "rgba(255, 189, 0, 1)", // required
    name: "secondary", // required
    shade: 500
  },
  {
    color: "hsl(44, 100%, 50%)", // required
    name: "tertiary", // required
    shade: 600
  },
  {
    color: "#FFBD00", // required
    name: "quaternary", // required
    shade: 300, // you will set shaders is mandatory
    shades: [100, 200, 300, 400, 500]
  }
]);

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: palette
    }
  },
  plugins: []
};
```

## 🎉 Installation

yarn

> yarn add tailwindcss-palette-generator

npm

> npm i tailwindcss-palette-generator


[![npm version](https://badge.fury.io/js/tailwindcss-palette-generator.svg)](https://badge.fury.io/js/tailwindcss-palette-generator)
![NPM](https://img.shields.io/npm/l/tailwindcss-palette-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/ibodev1/tailwindcss-palette-generator?style=social)
![node-current](https://img.shields.io/node/v/tailwindcss-palette-generator)
![GitHub last commit](https://img.shields.io/github/last-commit/ibodev1/tailwindcss-palette-generator)
![npm](https://img.shields.io/npm/dw/tailwindcss-palette-generator)
![GitHub top language](https://img.shields.io/github/languages/top/ibodev1/tailwindcss-palette-generator)

## 👀 Usage

### Import

```js
const getPalette = require("tailwindcss-palette-generator");
```

### getPalette()

```js
const palette = getPalette(params);
```

#### Params :

- "color" : Main color of your palette. [*Required] (String)
- "name" : The name of your palette. [*Required] (String)
- "shade" : What time do you want the main shades of your palette to start and end at. [Optional] (Number)
- "shades" : Shade layers of your palette. [Optional] (Array)
  - If you add this you should add main shade as well. "shade:"
  - Must be of type array.
  - May consist of at least 3 elements.

##### If you want to create multiple palettes. You must enter the properties of the palette in array type.

`Example:`

```js
const palette = getPalette([
  {
    color: "rgb(255, 189, 0)", // required
    name: "primary", // required
    shade: 400
  },
  {
    color: "rgba(255, 189, 0, 1)", // required
    name: "secondary", // required
    shade: 500
  },
  {
    color: "hsl(44, 100%, 50%)", // required
    name: "tertiary", // required
    shade: 600
  },
  {
    color: "#FFBD00", // required
    name: "quaternary", // required
    shade: 300, // you will set shades is mandatory
    shades: [100, 200, 300, 400, 500]
  }
]);
```

##### If you will create a palette you can give parameters as json data.

`Example:`

```js
const objectPalette = getPalette({
  color: "#FFBD00", // required
  name: "primary", // required
  shade: 300, // you will set shaders is mandatory
  shades: [100, 200, 300, 400, 500]
});
```

`Output:`

![Output](https://i.hizliresim.com/d0a5le6.jpg)

##### If you don't want to deal with parameters and you only have one color, you can create a palette by sending the string color as a parameter.

`Example:`

```js
const stringPalette = getPalette("#FFBD00");
```

`Output:`

![Output](https://i.hizliresim.com/syut90f.jpg)

## 🚀 Dependencies

- [chroma.js](https://gka.github.io/chroma.js/)

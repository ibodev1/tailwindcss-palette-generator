# Tailwindcss Palette Generator

![tailwind](/docs/example.png)

**Tailwindcss Palette Generator** is an easy-to-use extension that allows you to automatically create a complete color palette from a single base color in your Tailwind CSS project. Specifically designed for Tailwind CSS v4, it significantly simplifies color management.

## Why Use This Extension?

- ✅ Automatically generate your entire color palette from a single base color
- ✅ Different shade levels (50-900) for consistent visual design
- ✅ Full compatibility with Tailwind CSS v4
- ✅ Quick integration with minimal configuration

## 🎉 Installation

```bash
# using pnpm
pnpm add -D tailwindcss-palette-generator@latest

# using yarn
yarn add --dev tailwindcss-palette-generator@latest

# using npm
npm i --save-dev tailwindcss-palette-generator@latest
```

[![npm version](https://badge.fury.io/js/tailwindcss-palette-generator.svg)](https://badge.fury.io/js/tailwindcss-palette-generator)
![NPM](https://img.shields.io/npm/l/tailwindcss-palette-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/ibodev1/tailwindcss-palette-generator?style=social)
![node-current](https://img.shields.io/node/v/tailwindcss-palette-generator)
![GitHub last commit](https://img.shields.io/github/last-commit/ibodev1/tailwindcss-palette-generator)
![npm](https://img.shields.io/npm/dw/tailwindcss-palette-generator)
![GitHub top language](https://img.shields.io/github/languages/top/ibodev1/tailwindcss-palette-generator)

## 👀 Basic Usage

Easily define the extension in your CSS file and specify your base colors:

```css
@import "tailwindcss";

@plugin "tailwindcss-palette-generator" {
  primary: #FFBD00;
  secondary: #FF6F00;
}
```

With this definition, you can now use your color palettes with shade levels from 50 to 900:

```html
<div class="bg-primary-500">Primary color</div>
<div class="text-secondary-700">Secondary color (dark shade)</div>
```

## 💡 Advanced Usage

### Programmatic Usage with JavaScript/TypeScript

You can also generate color palettes programmatically:

```ts
import { getPalette } from 'tailwindcss-palette-generator/getPalette';

// Create palette with custom options
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

console.log(palette);
```

### Usage with Tailwind Config File

```js
import { getPalette } from 'tailwindcss-palette-generator/getPalette';

const palette = getPalette({
  color: "#FFBD00", // required
  name: "primary", // required
  shade: 300, // you will set shaders is mandatory
  shades: [100, 200, 300, 400, 500]
});

export default {
  // ...other configurations
  theme: {
    extend: {
      colors: palette
    }
  }
}
```

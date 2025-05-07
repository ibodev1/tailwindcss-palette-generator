# Tailwindcss Palette Generator

![tailwind](/docs/example.png)

A plugin for Tailwind CSS that automatically generates color palettes from base colors. Developed specifically for Tailwind CSS v4.

## 🎉 Installation

pnpm

> pnpm add -D tailwindcss-palette-generator@latest

yarn

> yarn add --dev tailwindcss-palette-generator@latest

npm

> npm i --save-dev tailwindcss-palette-generator@latest

[![npm version](https://badge.fury.io/js/tailwindcss-palette-generator.svg)](https://badge.fury.io/js/tailwindcss-palette-generator)
![NPM](https://img.shields.io/npm/l/tailwindcss-palette-generator)
![GitHub Repo stars](https://img.shields.io/github/stars/ibodev1/tailwindcss-palette-generator?style=social)
![node-current](https://img.shields.io/node/v/tailwindcss-palette-generator)
![GitHub last commit](https://img.shields.io/github/last-commit/ibodev1/tailwindcss-palette-generator)
![npm](https://img.shields.io/npm/dw/tailwindcss-palette-generator)
![GitHub top language](https://img.shields.io/github/languages/top/ibodev1/tailwindcss-palette-generator)

## 👀 Usage

This plugin works with Tailwind CSS v4. Add it to your CSS file:

```css
@import "tailwindcss";

@plugin "tailwindcss-palette-generator" {
  primary: #FFBD00;
  secondary: #FF6F00;
}
```

This will automatically generate color palettes for your primary and secondary colors with shades ranging from 50 to 900.

```html
<div class="bg-primary-500">Primary color</div>
<div class="text-secondary-700">Secondary color with darker shade</div>
```

## 🚀 Dependencies

- [chroma.js](https://gka.github.io/chroma.js/) - Color manipulation library

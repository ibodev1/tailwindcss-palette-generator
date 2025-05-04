import { getPalette } from '../src';

import path from 'node:path';
import tailwindcssPostCSS from '@tailwindcss/postcss';
import postcss from 'postcss';

const stringPalette = getPalette('#FFBD00');

const objectPalette = getPalette({
  color: '#FFBD00', // required
  name: 'primary', // required
  shade: 300, // you will set shaders is mandatory
  shades: [100, 200, 300, 400, 500],
});

const arrayPalette = getPalette([
  {
    color: 'rgb(255, 189, 0)', // required
    name: 'primary', // required
    shade: 400,
  },
  {
    color: '#FFBD00', // required
    name: 'secondary', // required
    shade: 300, // you will set shades is mandatory
    shades: [100, 200, 300, 400, 500],
  },
]);

const stringPaletteReturn = {
  primary: {
    '50': '#ffff90',
    '100': '#ffff83',
    '200': '#ffff69',
    '300': '#ffef4e',
    '400': '#ffd630',
    '500': '#ffbd00',
    '600': '#e3a500',
    '700': '#c78d00',
    '800': '#ab7600',
    '900': '#916000',
    DEFAULT: '#ffbd00',
  },
};

const objectPaletteReturn = {
  primary: {
    '100': '#ffef4e',
    '200': '#ffd630',
    '300': '#ffbd00',
    '400': '#e3a500',
    '500': '#c78d00',
    DEFAULT: '#ffbd00',
  },
};

const arrayPaletteReturn = {
  primary: {
    '50': '#ffff76',
    '100': '#ffff69',
    '200': '#ffef4e',
    '300': '#ffd630',
    '400': '#ffbd00',
    '500': '#e3a500',
    '600': '#c78d00',
    '700': '#ab7600',
    '800': '#916000',
    '900': '#784b00',
    DEFAULT: '#ffbd00',
  },
  secondary: {
    '100': '#ffef4e',
    '200': '#ffd630',
    '300': '#ffbd00',
    '400': '#e3a500',
    '500': '#c78d00',
    DEFAULT: '#ffbd00',
  },
};

test('return string palette', () => {
  expect(stringPalette).toEqual(stringPaletteReturn);
});

test('return object palette', () => {
  expect(objectPalette).toEqual(objectPaletteReturn);
});

test('return array palette', () => {
  expect(arrayPalette).toEqual(arrayPaletteReturn);
});

// PostCSS test

const runPostCSS = (css: string) => {
  const { currentTestName } = expect.getState();

  return postcss(tailwindcssPostCSS({ optimize: false })).process(["@import 'tailwindcss';", css].join('\n'), {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
};

test('TailwindCSS Plugin Test', async () => {
  const css = `
@plugin 'tailwindcss-palette-generator' {
  primary: '#FFBD00';
}

.test {
  @apply border-primary text-primary-100 bg-primary-200;
}
  `.trim();

  const { css: output } = await runPostCSS(css);

  expect(output).toContain('.test');
  expect(output).toContain('border-color: #ffbd00;');
  expect(output).toContain('background-color: #ffff69;');
  expect(output).toContain('color: #ffff83;');
});

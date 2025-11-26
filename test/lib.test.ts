import path from 'node:path';
import { describe, expect, test } from '@rstest/core';
import tailwindcssPostCSS from '@tailwindcss/postcss';
import postcss from 'postcss';
import { getPalette } from '../dist/getPalette';

describe('Palette Generation Tests', () => {
  test('String color generates correct palette', () => {
    const stringPalette = getPalette('#FFBD00');

    expect(stringPalette).toEqual({
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
        '950': '#845500',
        DEFAULT: '#ffbd00',
      },
    });
  });

  test('Object config generates correct palette', () => {
    const objectPalette = getPalette({
      color: '#FFBD00',
      name: 'primary',
      shade: 300,
      shades: [100, 200, 300, 400, 500],
    });

    expect(objectPalette).toEqual({
      primary: {
        '100': '#ffef4e',
        '200': '#ffd630',
        '300': '#ffbd00',
        '400': '#e3a500',
        '500': '#c78d00',
        DEFAULT: '#ffbd00',
      },
    });
  });

  test('Array config generates correct palette', () => {
    const arrayPalette = getPalette([
      {
        color: 'rgb(255, 189, 0)',
        name: 'primary',
        shade: 400,
      },
      {
        color: '#FFBD00',
        name: 'secondary',
        shade: 300,
        shades: [100, 200, 300, 400, 500],
      },
    ]);

    expect(arrayPalette).toEqual({
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
        '950': '#6c4000',
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
    });
  });
});

describe('Error Handling Tests', () => {
  test('Invalid color throws error', () => {
    expect(() => getPalette('not-a-color')).toThrow();
  });

  test('Empty array returns empty object', () => {
    expect(getPalette([])).toEqual({});
  });

  test('Null input throws error', () => {
    // @ts-expect-error testing invalid input
    expect(() => getPalette(null)).toThrow();
  });
});

describe('Advanced Configuration Tests', () => {
  test('Custom whitelist shades work correctly', () => {
    const palette = getPalette({
      color: '#FFBD00',
      name: 'brand',
      shade: 400,
      shades: [50, 400, 900],
    });

    expect(palette).toHaveProperty('brand');
    expect(Object.keys(palette.brand)).toHaveLength(4); // 3 shades + DEFAULT
    expect(palette.brand).toHaveProperty('50');
    expect(palette.brand).toHaveProperty('400');
    expect(palette.brand).toHaveProperty('900');
    expect(palette.brand).toHaveProperty('DEFAULT');
  });

  test('Using different color formats', () => {
    const hslPalette = getPalette('hsl(44, 100%, 50%)');
    const rgbPalette = getPalette('rgba(255, 189, 0, 1)');
    const hexPalette = getPalette('#FFBD00');

    expect(hslPalette).toEqual(hslPalette);
    expect(rgbPalette).toEqual(rgbPalette);
    expect(hexPalette).toEqual(hexPalette);
  });

  test('Multiple palettes with different configurations', () => {
    const multiPalette = getPalette([
      { color: '#FFBD00', name: 'yellow', shade: 400 },
      { color: '#FF0000', name: 'red', shade: 500 },
      { color: '#0000FF', name: 'blue', shade: 600 },
    ]);

    expect(multiPalette).toHaveProperty('yellow');
    expect(multiPalette).toHaveProperty('red');
    expect(multiPalette).toHaveProperty('blue');
    expect(multiPalette.yellow['400']).toEqual('#ffbd00');
    expect(multiPalette.red['500']).toEqual('#ff0000');
    expect(multiPalette.blue['600']).toEqual('#0000ff');
  });
});

describe('TailwindCSS Plugin Additional Tests', () => {
  const runPostCSS = (css: string) => {
    const { currentTestName } = expect.getState();

    return postcss(tailwindcssPostCSS({ optimize: false })).process(css, {
      from: `${path.resolve(__filename)}?test=${currentTestName}`,
    });
  };

  test('Multiple palettes work in plugin configuration', async () => {
    const css = `
@import "tailwindcss";

@plugin "tailwindcss-palette-generator" {
  primary: #FFBD00;
  secondary: #FF6F00;
}

.test {
  @apply border-primary bg-secondary text-secondary-100;
}
    `.trim();

    const { css: output } = await runPostCSS(css);

    expect(output).toContain('border-color: #ffbd00;');
    expect(output).toContain('background-color: #ff6f00;');
    expect(output).toContain('color: #ffd371;');
  });

  test('Test custom prefix', async () => {
    const css = `
@import "tailwindcss";

@theme {
  --prefix: "mypre-";
}

@plugin "tailwindcss-palette-generator" {
  primary: #FFBD00;
  secondary: #FF6F00;
}
    `.trim();

    const { css: output } = await runPostCSS(css);

    expect(output).toContain('--mypre-primary');
    expect(output).toContain('--mypre-secondary');
  });
});

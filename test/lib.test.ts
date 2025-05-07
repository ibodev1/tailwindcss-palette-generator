import path from 'node:path';
import tailwindcssPostCSS from '@tailwindcss/postcss';
import postcss from 'postcss';
import { describe, expect, test } from 'vitest';
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

describe('TailwindCSS Plugin Integration', () => {
  const runPostCSS = (css: string) => {
    const { currentTestName } = expect.getState();

    return postcss(tailwindcssPostCSS({ optimize: false })).process(["@import 'tailwindcss';", css].join('\n'), {
      from: `${path.resolve(__filename)}?test=${currentTestName}`,
    });
  };

  test('Plugin applies palette colors correctly in CSS', async () => {
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
});

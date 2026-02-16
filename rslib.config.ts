import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: 'src/index.ts',
      getPalette: 'src/getPalette.ts',
    },
    tsconfigPath: './tsconfig.json',
  },
  lib: [
    {
      format: 'esm',
      dts: true,
      bundle: true,
      output: {
        minify: false,
        sourceMap: true,
        target: 'node',
        cleanDistPath: true,
        distPath: {
          root: 'dist/esm',
        },
      },
    },
    {
      format: 'cjs',
      dts: true,
      bundle: true,
      output: {
        minify: false,
        sourceMap: true,
        target: 'node',
        distPath: {
          root: 'dist/cjs',
        },
      },
    },
  ],
});

import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: 'src/**/*.ts',
    },
    tsconfigPath: './tsconfig.json',
  },
  lib: [
    {
      format: 'esm',
      dts: true,
      bundle: false,
      output: {
        minify: false,
        sourceMap: true,
        target: 'node',
        cleanDistPath: true,
      },
    },
  ],
});

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: false,
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});

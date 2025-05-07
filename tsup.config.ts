import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm'],
  target: 'esnext',
  minify: false,
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: false,
});

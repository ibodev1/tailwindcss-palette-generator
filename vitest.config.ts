import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov', 'clover'],
      include: ['src/**/*.ts'],
      exclude: ['src/types.ts'],
    },
    globals: true,
    watch: false,
  },
});

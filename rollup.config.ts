/** @type {import('rollup').RollupOptions} */
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import license from 'rollup-plugin-license';
import packageJson from './package.json' assert { type: 'json' };

const isProduction = process.env.NODE_ENV === 'production';

const settings = {
  globals: {
    'chroma-js': 'chroma-js',
  },
};

const banner = `
${packageJson.name} v${packageJson.version}
Copyright <%=moment().format('YYYY')%> ${packageJson.author}
`;

export default [
  {
    input: './src/main.ts',
    output: [
      {
        file: packageJson.main,
        name: packageJson.main,
        ...settings,
        format: 'cjs',
        plugins: [isProduction && terser()],
      },
      {
        file: packageJson.module,
        ...settings,
        name: packageJson.name,
        format: 'es',
      },
      {
        file: packageJson.browser,
        ...settings,
        name: packageJson.name,
        format: 'umd',
      },
    ],
    external: ['chroma-js'],
    plugins: [
      json(),
      resolve(),
      typescript({
        sourceMap: false,
      }),
      commonjs({
        include: 'node_modules/**',
        extensions: ['.js'],
        ignoreGlobal: false,
        sourceMap: false,
      }),
      license({ banner }),
    ],
  },
  {
    input: 'src/main.ts',
    plugins: [dts(), license({ banner })],
    output: {
      file: `dist/main.d.ts`,
      format: 'es',
    },
  },
];

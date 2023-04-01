import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import packageJson from "./package.json" assert { type: "json" };

const name = packageJson.main.replace(/\.js$/, "");

const bundle = (config) => ({
  ...config,
  input: "src/main.ts",
  external: (id) => !/^[./]/.test(id)
});

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        file: `${name}.js`,
        format: "es",
        sourcemap: true
      }
    ]
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: "es"
    }
  })
];

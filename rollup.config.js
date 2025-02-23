import terser from '@rollup/plugin-terser';
import css from "rollup-plugin-import-css";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  external: [/node_modules/],
  plugins: [nodeResolve(), css()]
};

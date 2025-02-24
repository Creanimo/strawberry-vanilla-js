
import css from "rollup-plugin-import-css";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "./src/index.js",
  output: [
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(), 
    commonjs(), 
    css(),
  ],
};


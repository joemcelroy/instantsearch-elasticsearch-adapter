import { defineConfig } from "tsup";
import path from "path";

const commonConfig = {
  clean: true,
  dts: true,
  sourcemap: true,
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
};
export default defineConfig([
  {
    entry: ["index.ts"],
    ...commonConfig,
    format: ["esm"],
    outDir: "dist",
  }
]);
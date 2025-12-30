import { tanstackConfig } from "@tanstack/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  ...tanstackConfig,
  {
    ignores: [
      "dist",
      "node_modules",
      "routeTree.gen.ts",
      "src/components/ui",
      "eslint.config.js",
      "prettier.config.js",
    ],
  },
  eslintConfigPrettier,
];

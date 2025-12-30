// @ts-check
import { tanstackConfig } from "@tanstack/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier";

export default [...tanstackConfig, {}, eslintConfigPrettier];

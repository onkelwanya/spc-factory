import { Linter } from 'eslint';
import prettier from 'eslint-config-prettier';
import recommended from 'eslint/use-at-your-own-risk';

const config = {
  files: ["src/**/*.js"],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    // Add your custom rules here
    "no-unused-vars": "warn",
    "no-console": "off",
  },
  plugins: {
    prettier,
  },
  settings: {
    // Prettier-specific settings
    prettier: {
      printWidth: 80,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      trailingComma: "all",
    },
  },
  extends: [recommended, prettier],
};

export default config;

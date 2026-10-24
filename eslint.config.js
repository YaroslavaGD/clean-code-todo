import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: { js },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'error',
    },
  },
  eslintConfigPrettier,
]);

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', '.next']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.browser,
    },
  },
  {
    files: ['*.config.js', '*.config.mjs', '*.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['src/app/api/**/*.{js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]);

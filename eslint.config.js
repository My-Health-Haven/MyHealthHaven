import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', '.next', 'coverage']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, prettierConfig],
    languageOptions: {
      ecmaVersion: 2020,
      // `process` is available for Next's build-time inlined `process.env.NEXT_PUBLIC_*`.
      globals: { ...globals.browser, process: 'readonly' },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Idiomatic mount-time `setState` (SSR hydration guards, reading
      // window/localStorage on mount) is flagged by this newer rule. Keep it
      // visible as a warning rather than blocking CI.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended, prettierConfig],
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

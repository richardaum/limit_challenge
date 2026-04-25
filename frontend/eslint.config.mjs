import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import testingLibrary from 'eslint-plugin-testing-library';
import playwright from 'eslint-plugin-playwright';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    name: 'prettier-plugin',
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  }, // Testing Library rules for test files
  {
    name: 'testing-library',
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    plugins: {
      '@testing-library': testingLibrary,
    },
    rules: {
      '@testing-library/no-render-in-lifecycle': 'error',
      '@testing-library/no-unnecessary-act': 'error',
    },
  }, // Playwright rules for E2E test files
  {
    name: 'playwright',
    files: ['e2e/**/*.spec.ts', 'e2e/**/*.spec.tsx'],
    ...playwright.configs['flat/recommended'],
  }, // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Storybook
    'storybook-static/**',
    'storybook-static/*',
  ]),
  ...storybook.configs['flat/recommended'],
]);

export default eslintConfig;

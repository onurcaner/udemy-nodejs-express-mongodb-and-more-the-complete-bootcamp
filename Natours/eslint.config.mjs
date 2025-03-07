import Eslint from '@eslint/js';
import * as TypescriptEslintParser from '@typescript-eslint/parser';
import EslintConfigPrettier from 'eslint-config-prettier';
import Globals from 'globals';
import TypescriptEslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default TypescriptEslint.config([
  // Preparation
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    ignores: ['dist'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: Globals.node,
      sourceType: 'module',
      parser: TypescriptEslintParser,
      parserOptions: {
        project: true,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // eslint
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    extends: [Eslint.configs.recommended],
  },

  // typescript-eslint
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    extends: [
      ...TypescriptEslint.configs.strictTypeChecked,
      ...TypescriptEslint.configs.stylisticTypeChecked,
    ],
  },

  // eslint-config-prettier
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    extends: [EslintConfigPrettier],
  },
]);

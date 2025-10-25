import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for Node.js projects.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-process-exit': 'error',
      'no-sync': 'warn'
    }
  }
]

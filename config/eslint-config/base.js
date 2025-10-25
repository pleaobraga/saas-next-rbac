import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import onlyWarn from 'eslint-plugin-only-warn'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,

  {
    plugins: {
      turbo: turboPlugin,
      onlyWarn,
      'simple-import-sort': pluginSimpleImportSort
    },
    rules: {
      // simple-import-sort (enable explicitly)
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'], // side-effect imports
            ['^@?\\w'], // packages
            ['^@repo(/.*|$)'], // internal monorepo pkgs
            ['^\\u0000?@/'], // Next.js alias "@/..."
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // parent
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // sibling
            ['^.+\\.s?css$'] // styles
          ]
        }
      ],
      'simple-import-sort/exports': 'error',

      // turbo
      'turbo/no-undeclared-env-vars': 'warn',

      // TS: unused vars (allow underscore)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    }
  },

  { ignores: ['dist/**'] }
]

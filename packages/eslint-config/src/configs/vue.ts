import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint, { ConfigWithExtends } from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export function vue(): ConfigWithExtends {
  return {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginVue.configs['flat/recommended'],
    ],
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'perfectionist/sort-objects': [
        'error',
        {
          customGroups: {
            items: 'items',
            list: 'list',
            children: 'children',
          },
          groups: ['unknown', 'items', 'list', 'children'],
          ignorePattern: ['children'],
          order: 'asc',
          partitionByComment: 'Part:**',
          type: 'natural',
        },
      ],
    },
  };
}

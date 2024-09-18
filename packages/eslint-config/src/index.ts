import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import { ignores } from './configs';

export default tseslint.config(...ignores(), {
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
  ],
  files: ['*.vue', '**/*.vue'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      parser: '@typescript-eslint/parser',
    },
  },
  rules: {
    'vue/multi-word-component-names': 'off',
  },
});

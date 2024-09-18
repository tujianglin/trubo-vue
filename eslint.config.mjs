import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...pluginVue.configs['flat/recommended']],
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
  },
)

/** @type {import('stylelint').Config} */
export default {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-less',
  ],
  overrides: [
    {
      customSyntax: 'postcss-html',
      files: ['*.(html|vue)', '**/*.(html|vue)'],
      rules: {},
    },
  ],
  plugins: ['@stylistic/stylelint-plugin', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'no-descending-specificity': null,
    'no-empty-source': null,
    "font-family-no-duplicate-names": null
  },
  ignoreFiles: ['packages/styles/src/**/*.less']
};

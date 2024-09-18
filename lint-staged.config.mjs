export default {
  '*.{js,jsx,ts,tsx}': [
    'prettier --ignore-unknown  --write',
    'eslint --fix',
  ],
  '*.{scss,less,styl,html,vue,css}': [
    'prettier --ignore-unknown --write',
    'stylelint --fix --allow-empty-input',
  ],
  '*.md': ['prettier --ignore-unknown --write'],
  '*.vue': [
    'prettier --write',
    'eslint --fix',
    'stylelint --fix --allow-empty-input',
  ],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
    'prettier --write--parser json',
  ],
  'package.json': ['prettier --write'],
};

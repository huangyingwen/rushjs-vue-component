module.exports = {
  root: true,
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html',
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  rules: {},
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', 'dist/**/*'],
};

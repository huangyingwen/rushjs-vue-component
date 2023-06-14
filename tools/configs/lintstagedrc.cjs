module.exports = {
  '*.{ts,tsx,vue}': 'eslint --cache --fix',
  '*.{css,scss,less}': 'stylelint --fix',
  '*.{ts,tsx,css,scss,less,md,vue}': 'prettier --write',
};

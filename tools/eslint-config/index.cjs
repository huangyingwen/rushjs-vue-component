module.exports = {
  ignorePatterns: ['dist'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    // 需要放在最后才能覆盖和 prettier 冲突的规则
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 0,
    'no-control-regex': 0,
    'vue/html-indent': 'error',
  },
  globals: { defineOptions: 'writable' },
};

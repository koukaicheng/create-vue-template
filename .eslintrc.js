module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // VUE模版解析器
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    // TypeScript ESLint 解析器
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: ['alloy', 'alloy/vue', 'alloy/typescript'],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    defineComponent: 'readonly',
    ref: 'readonly',
    computed: 'readonly',
  },
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/script-setup-uses-vars': 'error',
    // 配合vue/no-multiple-template-root自动引入
    'vue/no-multiple-template-root': 'off',
    // 🔧 多行属性之间必须有空行
  },
};

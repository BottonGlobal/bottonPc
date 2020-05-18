module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    // 'no-window.console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    "no-console": "off",
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    "no-undef": 0,
    "no-unused-vars": 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "plugin:vue/strongly-recommended",
    "@vue/standard"
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  'rules': {
    'camelcase': [0, {'properties': 'always'}],
    'indent': [0, 2, {'SwitchCase': 1}],
    'space-before-function-paren': [0],
    'prefer-promise-reject-errors': [0],
    'object-curly-spacing': [0],
    'no-useless-escape': [0],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-tabs': 'off',
    "vue/max-attributes-per-line": [
      2,
      {
        "singleline": 5,
        "multiline": {
          "max": 10,
          "allowFirstLine": true
        }
      }
    ],
    "vue/html-self-closing": 0,
    "vue/attribute-hyphenation": 0,
    "vue/html-closing-bracket-spacing": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/multiline-html-element-content-newline": 0,
    "vue/require-default-prop": 0,
    "vue/no-unused-vars": 0
  }
};

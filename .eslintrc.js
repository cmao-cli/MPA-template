module.exports = {
  extends: [
    'preact',
    './node_modules/@mlz/lint/ts-eslintrc.js'
  ],
  rules: {
    'import/no-default-export': 0,
    "@typescript-eslint/type-annotation-spacing": [2, {
      "overrides": {
        "colon": {
          "before": false,
          "after": true,
        },
        "arrow": {
          "before": true,
          "after": true,
        }
      }
    }],
  },
};

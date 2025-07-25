module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:node/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 6,
    sourceType: "module",
  },
  plugins: ["node", "prettier"],
  rules: {
    curly: ["error", "all"],
    "no-console": "off",
    "prettier/prettier": "error",
    "node/no-missing-import": "off",
    "node/no-unsupported-features/es-syntax": "off",
    'react/prop-types': ['off'], 
  },
};

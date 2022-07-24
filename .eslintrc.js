module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:jest-formatting/recommended'],
  env: {
    jest: true,
  },
  globals: {
    // detox
    detox: 'readonly',
    device: 'readonly',
    expect: 'readonly',
    waitFor: 'readonly',
    element: 'readonly',
    by: 'readonly',
  },
};

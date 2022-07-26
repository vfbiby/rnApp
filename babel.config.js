if (process.env.NODE_ENV === 'test') {
  module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [],
  };
} else {
  module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: ['nativewind/babel'],
  };
}

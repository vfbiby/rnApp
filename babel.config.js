if (process.env.NODE_ENV === 'test') {
  console.log(process.env.NODE_ENV);
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

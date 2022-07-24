/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import { UserSignupPage } from './src/UserSignupPage';
import Example from './src/Example';

const Wrapper = () => {
  return (
    <UserSignupPage
      actions={{
        postSignup: () => {},
      }}
    />
  );
};

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => Wrapper);

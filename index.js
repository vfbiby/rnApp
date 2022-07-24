/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./App";
import { UserSignupPage } from "./src/UserSignupPage";
import Example from "./src/Example";

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => UserSignupPage);

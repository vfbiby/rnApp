/**
 * @format
 */

import "react-native";
import React from "react";
import App from "../App";

// Note: test renderer must be required after react-native.
import { render, screen } from "@testing-library/react-native";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  render(<App />);
  const allByText = screen.getByText("App.js");
  expect(allByText).toBeTruthy();
  const btn = screen.getByText("hello");
  expect(btn).toBeEnabled();
});

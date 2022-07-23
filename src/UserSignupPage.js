import { Button, Text, TextInput, View } from "react-native";
import React from "react";

export function UserSignupPage() {
  return (
    <View>
      <Text className={"text-2xl"}>Sign Up</Text>
      <TextInput placeholder={"Your display name"} />
      <TextInput placeholder={"Your username"} />
      <TextInput secureTextEntry={true} placeholder={"Your password"} />
      <TextInput secureTextEntry={true} placeholder={"Repeat your password"} />
      <Button title={"Button"} />
    </View>
  );
}

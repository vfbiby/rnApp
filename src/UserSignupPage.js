import React from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';

const CustomInput = ({ children, placeholder, ...other }): Node => {
  return (
    <TextInput
      className={'border rounded my-2'}
      placeholder={placeholder}
      {...other}>
      {children}
    </TextInput>
  );
};

export function UserSignupPage() {
  return (
    <SafeAreaView className={'px-4'}>
      <Text className={'text-2xl pt-4 px-3'}>Sign Up</Text>
      <CustomInput placeholder={'Your display name'} />
      <CustomInput placeholder={'Your username'} />
      <CustomInput secureTextEntry={true} placeholder={'Your password'} />
      <CustomInput
        className={'mb-4'}
        secureTextEntry={true}
        placeholder={'Repeat your password'}
      />
      <Button title={'sign up'} />
    </SafeAreaView>
  );
}

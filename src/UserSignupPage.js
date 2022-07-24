import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';

const CustomInput = ({ children, placeholder, ...other }): Node => {
  return (
    <TextInput
      className={'border rounded my-2 p-2'}
      placeholder={placeholder}
      {...other}>
      {children}
    </TextInput>
  );
};

export function UserSignupPage({ actions }) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [errors, setErrors] = useState({});

  const onSignup = () => {
    setPendingApiCall(true);
    const user = {
      username,
      displayName,
      password,
    };
    if (actions.postSignup) {
      actions
        .postSignup(user)
        .then(() => setPendingApiCall(false))
        .catch(apiError => {
          let tempErrors;
          tempErrors = { ...apiError.response.data.validationErrors };
          setErrors(tempErrors);
          setPendingApiCall(false);
        });
    }
  };

  return (
    <SafeAreaView>
      <View className={'px-4'}>
        <Text className={'text-2xl pt-4 px-3'}>Sign Up</Text>
        <CustomInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder={'Your display name'}
        />
        {errors.displayName && <Text>{errors.displayName}</Text>}
        <CustomInput
          value={username}
          onChangeText={setUsername}
          placeholder={'Your username'}
        />
        <CustomInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder={'Your password'}
        />
        <CustomInput
          value={passwordRepeat}
          onChangeText={setPasswordRepeat}
          className={'mb-4'}
          secureTextEntry={true}
          placeholder={'Repeat your password'}
        />
        <View>
          <Button
            disabled={pendingApiCall}
            onPress={onSignup}
            title={'sign up'}
          />
          {pendingApiCall && (
            <Text className={'animate-ping text-red-400'}>Loading...</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

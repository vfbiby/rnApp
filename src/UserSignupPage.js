import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import { Input } from './Components/Input';

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
  const [passwordRepeatConfirmed, setPasswordRepeatConfirmed] = useState(true);

  const onSignup = () => {
    setPendingApiCall(true);
    const user = {
      username,
      displayName,
      password,
    };
    if (actions) {
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
        <Input
          value={displayName}
          hasError={true}
          error={errors.displayName}
          onChangeText={setDisplayName}
          placeholder={'Your display name'}
        />
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder={'Your username'}
        />
        <Input
          value={password}
          onChangeText={text => {
            const passwordRepeatConfirmed = text === passwordRepeat;
            setPasswordRepeatConfirmed(passwordRepeatConfirmed);
            const tempErrors = { ...errors };
            tempErrors.passwordRepeat = passwordRepeatConfirmed
              ? ''
              : 'Does not match to password';
            setPasswordRepeatConfirmed(passwordRepeatConfirmed);
            setErrors(tempErrors);
            setPassword(text);
          }}
          type={'password'}
          placeholder={'Your password'}
        />
        <Input
          value={passwordRepeat}
          onChangeText={text => {
            const passwordRepeatConfirmed = text === password;
            const tempErrors = { ...errors };
            tempErrors.passwordRepeat = passwordRepeatConfirmed
              ? ''
              : 'Does not match to password';
            setPasswordRepeatConfirmed(passwordRepeatConfirmed);
            setErrors(tempErrors);
            setPasswordRepeat(text);
          }}
          hasError={true}
          error={errors.passwordRepeat}
          className={'mb-4'}
          type={'password'}
          placeholder={'Repeat your password'}
        />
        <View>
          <Button
            disabled={pendingApiCall || !passwordRepeatConfirmed}
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

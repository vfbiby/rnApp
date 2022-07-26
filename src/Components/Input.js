import React from 'react';
import { Text, TextInput, View } from 'react-native';
import classNames from 'classnames';

export function Input(props) {
  const validationError = props.hasError !== undefined && props.hasError;
  const validationSuccess = props.hasError !== undefined && !props.hasError;
  const classname = classNames(
    { 'is-invalid': validationError },
    { 'is-valid': validationSuccess },
    props.className,
  );

  return (
    <View>
      {props.label && <Text>{props.label}</Text>}
      <TextInput
        style={props.style}
        className={classname}
        onChange={props.onChange}
        placeholder={props.placeholder}
        value={props.value}
        type={props.type || 'text'}
        secureTextEntry={props.type && true}
        testID={'input'}
      />
      {props.hasError && props.error && (
        <Text className={'border'}>{props.error}</Text>
      )}
    </View>
  );
}

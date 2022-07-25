import { Text, TextInput, View } from 'react-native';
import React from 'react';

export function Input(props) {
  let className: string = '';
  if (props.hasError !== undefined) {
    className = props.hasError ? 'is-invalid' : 'is-valid';
  }
  if (props.className) {
    className += className === '' ? props.className : ' ' + props.className;
  }
  return (
    <View>
      {props.label && <Text>{props.label}</Text>}
      <TextInput
        className={className}
        class={className}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        value={props.value}
        type={props.type || 'text'}
        secureTextEntry={props.type && true}
        testID={'input'}
      />
      {props.hasError && <Text>{props.error}</Text>}
    </View>
  );
}

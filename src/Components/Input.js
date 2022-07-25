import { Text, TextInput, View } from 'react-native';
import React from 'react';

export function Input(props) {
  let className: string = '';
  if (props.hasError !== undefined) {
    className = props.hasError ? 'is-invalid' : 'is-valid';
  }
  return (
    <View>
      {props.label && <Text>{props.label}</Text>}
      <TextInput
        style={props.style}
        className={'border my-2'}
        class={className}
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

import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import classNames from 'classnames';

export function Input(props) {
  const [value, setValue] = useState('');
  const validationError = props.hasError !== undefined && props.hasError;
  const validationSuccess = props.hasError !== undefined && !props.hasError;
  const classname = classNames(
    { 'is-invalid': validationError },
    { 'is-valid': validationSuccess },
    props.className,
  );

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <View>
      {props.label && <Text>{props.label}</Text>}
      <TextInput
        style={props.style}
        className={classname}
        onChange={e => {
          setValue(e.target.value);
          props.onChange && props.onChange(e);
        }}
        placeholder={props.placeholder}
        value={value}
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

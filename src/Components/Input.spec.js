import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TextInput, View } from 'react-native';

function Input() {
  return (
    <View>
      <TextInput />
    </View>
  );
}

describe('Layout', function () {
  it('should has input item', function () {
    render(<Input />);
    const input = screen.queryByRole('input');
    expect(input).toBeTruthy();
  });
});

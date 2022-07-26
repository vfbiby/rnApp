import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Input } from './Input';

describe('Layout', function () {
  it('should has input item', function () {
    render(<Input />);
    const input = screen.queryByTestId('input');
    expect(input).toBeTruthy();
  });

  it('should display the label provided in props', function () {
    render(<Input label={'Test label'} />);
    const label = screen.queryByText('Test label');
    expect(label).toBeTruthy();
  });

  it('should not display the label when no label provided in props', function () {
    render(<Input />);
    const label = screen.queryByText('Test label');
    expect(label).toBeNull();
  });

  it('should has text type for input when type is not provided as prop', function () {
    render(<Input />);
    const input = screen.queryByTestId('input');
    expect(input.props.type).toBe('text');
  });

  it('should has password type for input when password type is provided as prop', function () {
    render(<Input type={'password'} />);
    const input = screen.queryByTestId('input');
    expect(input.props.secureTextEntry).toBeTruthy();
    expect(input.props.type).toBe('password');
  });

  it('should display placeholder when it is provided as prop', function () {
    render(<Input placeholder={'Test placeholder'} />);
    const input = screen.queryByTestId('input');
    expect(input.props.placeholder).toBe('Test placeholder');
  });

  it('should has value for input when it is provided as prop', function () {
    render(<Input value={'Test value'} />);
    const input = screen.queryByTestId('input');
    expect(input.props.value).toBe('Test value');
  });

  it('should has onChange callback when it is provided as prop', function () {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    const input = screen.queryByTestId('input');
    fireEvent(input, 'change', { target: { value: 'new-input' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should set value into state', function () {
    render(<Input />);
    const input = screen.queryByTestId('input');
    fireEvent(input, 'change', { target: { value: 'new-input' } });
    expect(input.props.value).toBe('new-input');
  });

  it('should has not default style when there is no validation error or success', function () {
    render(<Input />);
    const input = screen.queryByTestId('input');
    expect(input.props.className).toBe('');
  });

  it('should has success style hasError properties false', function () {
    render(<Input hasError={false} />);
    const input = screen.queryByTestId('input');
    expect(input.props.className).toBe('is-valid');
  });

  it('should has style for error when there is error', function () {
    render(<Input hasError={true} />);
    const input = screen.queryByTestId('input');
    expect(input.props.className).toBe('is-invalid');
  });

  it('should displays the error text when it is provided', function () {
    render(<Input hasError={true} error={'Cannot be null'} />);
    expect(screen.queryByText('Cannot be null')).toBeTruthy();
  });

  it('should not displays the error text when hasError not provided', function () {
    render(<Input error={'Cannot be null'} />);
    expect(screen.queryByText('Cannot be null')).toBeNull();
  });

  it('should has class style when it is provided', function () {
    render(<Input className={'rounded'} />);
    const input = screen.queryByTestId('input');
    expect(input.props.className).toBe('rounded');
  });

  it('should ', function () {});
});

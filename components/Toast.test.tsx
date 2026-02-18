
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Toast from './Toast';

describe('Toast component', () => {
  it('renders success toast with message', () => {
    const { getByText, getByClassName } = render(<Toast message='Success message' type='success' />);
    expect(getByText('Success message')).toBeInTheDocument();
    expect(getByClassName('toast success')).toBeInTheDocument();
  });

  it('renders error toast with message', () => {
    const { getByText, getByClassName } = render(<Toast message='Error message' type='error' />);
    expect(getByText('Error message')).toBeInTheDocument();
    expect(getByClassName('toast error')).toBeInTheDocument();
  });

  it('renders warning toast with message', () => {
    const { getByText, getByClassName } = render(<Toast message='Warning message' type='warning' />);
    expect(getByText('Warning message')).toBeInTheDocument();
    expect(getByClassName('toast warning')).toBeInTheDocument();
  });

  it('throws error when type is not provided', () => {
    expect(() => render(<Toast message='Message' />)).toThrowError('type is required');
  });

  it('throws error when type is invalid', () => {
    expect(() => render(<Toast message='Message' type='invalid' />)).toThrowError('Invalid type. Type must be one of success, error, or warning');
  });

  it('throws error when message is not provided', () => {
    expect(() => render(<Toast type='success' />)).toThrowError('message is required');
  });

  it('renders with default props when no props are provided', () => {
    expect(() => render(<Toast />)).toThrowError('message and type are required');
  });
});


import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Toast from './Toast';

describe('Toast component', () => {
  it('renders success toast with check-circle icon', () => {
    const { getByText, getByClassName } = render(<Toast message='Success message' type='success' />);
    expect(getByText('Success message')).toBeInTheDocument();
    expect(getByClassName('fas fa-check-circle')).toBeInTheDocument();
  });

  it('renders error toast with times-circle icon', () => {
    const { getByText, getByClassName } = render(<Toast message='Error message' type='error' />);
    expect(getByText('Error message')).toBeInTheDocument();
    expect(getByClassName('fas fa-times-circle')).toBeInTheDocument();
  });

  it('renders warning toast with exclamation-circle icon', () => {
    const { getByText, getByClassName } = render(<Toast message='Warning message' type='warning' />);
    expect(getByText('Warning message')).toBeInTheDocument();
    expect(getByClassName('fas fa-exclamation-circle')).toBeInTheDocument();
  });

  it('renders toast with custom message', () => {
    const { getByText } = render(<Toast message='Custom message' type='success' />);
    expect(getByText('Custom message')).toBeInTheDocument();
  });

  it('throws error when type is not success, error, or warning', () => {
    expect(() => render(<Toast message='Message' type='info' />)).toThrowError(
      'Invalid type. Type must be one of: success, error, warning',
    );
  });

  it('renders toast with correct class name', () => {
    const { getByClassName } = render(<Toast message='Message' type='success' />);
    expect(getByClassName('toast success')).toBeInTheDocument();
  });

  it('renders toast with correct icon class name', () => {
    const { getByClassName } = render(<Toast message='Message' type='success' />);
    expect(getByClassName('toast-icon')).toBeInTheDocument();
  });

  it('renders toast with correct message class name', () => {
    const { getByClassName } = render(<Toast message='Message' type='success' />);
    expect(getByClassName('toast-message')).toBeInTheDocument();
  });
})

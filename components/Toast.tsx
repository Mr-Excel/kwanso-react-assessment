import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div className={`toast ${type}`}>{message}</div>
  );
};

export default Toast;
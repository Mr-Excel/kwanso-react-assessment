import React from 'react';
import './Toast.css';

interface ToastProps {
  /** The message to be displayed in the toast */
  message: string;
  /** The type of toast (success, error, warning) */
  type: 'success' | 'error' | 'warning';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div className={`toast ${type}`}> 
      <div className='toast-icon'>
        {type === 'success' && <i className='fas fa-check-circle'></i>}
        {type === 'error' && <i className='fas fa-times-circle'></i>}
        {type === 'warning' && <i className='fas fa-exclamation-circle'></i>}
      </div>
      <div className='toast-message'>{message}</div>
    </div>
  );
};

export default Toast;
import React from 'react';
import Toast from './Toast';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Toast message="This is a success message" type="success" />
      <Toast message="This is an error message" type="error" />
      <Toast message="This is a warning message" type="warning" />
    </div>
  );
};

export default HomePage;
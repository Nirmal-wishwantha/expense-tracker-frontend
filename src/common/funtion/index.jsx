import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for the toast notifications

import React from 'react';

export const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000} // Duration in milliseconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

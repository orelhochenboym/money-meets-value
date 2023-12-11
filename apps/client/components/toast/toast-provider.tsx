'use client';

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastProvider: React.FC = () => {
  return <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />;
};

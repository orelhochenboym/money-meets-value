'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastProvider: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isSignedIn && isLoaded) {
    toast.warn("Can't navigate when not signed in", {
      toastId: 'sign-in',
    });
  }

  return <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />;
};

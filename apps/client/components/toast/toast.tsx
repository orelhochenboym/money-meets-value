'use client';

import { ToastContent, ToastOptions, toast } from 'react-toastify';

type Props = {
  condition: unknown;
  content: ToastContent<unknown>;
  options?: ToastOptions;
};

export const Toast: React.FC<Props> = ({ condition, content, options }) => {
  if (!condition) {
    toast(content, options);
  }
  return <></>;
};

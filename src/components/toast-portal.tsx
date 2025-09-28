'use client';

import { useIsMounted } from '@/hooks';
import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';

export default function ToastPortal() {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return createPortal(
    <ToastContainer
      position='top-center'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme='light'
    />,
    document.body
  );
}

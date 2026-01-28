'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div data-testid="toast-message" className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

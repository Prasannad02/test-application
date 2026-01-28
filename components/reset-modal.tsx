'use client';

import { useState } from 'react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResetModal({
  isOpen,
  onClose,
  onConfirm,
}: ResetModalProps) {
  const [confirmEmail, setConfirmEmail] = useState('');

  const handleConfirm = () => {
    if (confirmEmail) {
      onConfirm();
      setConfirmEmail('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Reset Credentials</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="modal-email" className="block text-sm font-medium mb-2">
              Confirm Email
            </label>
            <input
              id="modal-email"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Enter your email to confirm"
              className="w-full px-3 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

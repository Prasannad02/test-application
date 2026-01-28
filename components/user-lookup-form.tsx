'use client';

import { useState } from 'react';

export default function UserLookupForm() {
  const [userId, setUserId] = useState('');
  const [lookupResult, setLookupResult] = useState('');

  const handleFetch = () => {
    if (!userId) {
      setLookupResult('');
      return;
    }
    setLookupResult(`User #${userId}: john.smith@corp.com (Admin)`);
  };

  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <h2 className="text-lg font-semibold mb-6">Quick User Lookup</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="uid" className="block text-sm font-medium mb-2">
            User ID
          </label>
          <input
            id="uid"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID number"
            className="w-full px-3 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {lookupResult && (
          <div className="text-sm p-3 bg-secondary rounded border border-border">
            {lookupResult}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleFetch}
            className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
          >
            Fetch
          </button>
        </div>
      </div>
    </div>
  );
}

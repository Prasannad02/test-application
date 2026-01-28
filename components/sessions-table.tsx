'use client';

import { useState } from 'react';

const mockSessions = [
  { id: 1, ip: '10.0.0.1', time: '10:30 AM' },
  { id: 2, ip: '10.0.0.2', time: '11:10 AM' },
  { id: 3, ip: '192.168.1.5', time: '9:45 AM' },
];

export default function SessionsTable() {
  const [revokedSessions, setRevokedSessions] = useState<number[]>([]);

  const handleRevoke = (id: number) => {
    setRevokedSessions([...revokedSessions, id]);
  };

  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <h2 className="text-lg font-semibold mb-6">Recent Sessions</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium">IP Address</th>
              <th className="text-left py-3 px-4 font-medium">Last Activity</th>
              <th className="text-left py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockSessions.map((session) => (
              <tr
                key={session.id}
                className="border-b border-border hover:bg-secondary/50 transition-colors"
              >
                <td className="py-3 px-4">{session.ip}</td>
                <td className="py-3 px-4">{session.time}</td>
                <td className="py-3 px-4">
                  {revokedSessions.includes(session.id) ? (
                    <span className="text-sm text-muted-foreground">Revoked</span>
                  ) : (
                    <button
                      onClick={() => handleRevoke(session.id)}
                      className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors font-medium"
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

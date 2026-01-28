'use client';

interface ProfileSectionProps {
  email: string;
  role: string;
  status: string;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function ProfileSection({
  email,
  role,
  status,
  onRoleChange,
  onStatusChange,
}: ProfileSectionProps) {
  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <h2 className="text-lg font-semibold mb-6">User Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="profile-email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            value={email}
            readOnly
            className="w-full px-3 py-2 border border-border rounded bg-secondary text-foreground cursor-not-allowed opacity-75"
          />
          <p className="text-xs text-muted-foreground mt-1">(Read-only)</p>
        </div>

        <div>
          <label htmlFor="profile-role" className="block text-sm font-medium mb-2">
            Role
          </label>
          <select
            id="profile-role"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>User</option>
            <option>Guest</option>
          </select>
        </div>

        <div>
          <label htmlFor="profile-status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="profile-status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>
    </div>
  );
}

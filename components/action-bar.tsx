'use client';

interface ActionBarProps {
  onSaveProfile: () => void;
  onSaveAccess: () => void;
}

export default function ActionBar({
  onSaveProfile,
  onSaveAccess,
}: ActionBarProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex-1 flex gap-2">
        <button
          onClick={onSaveProfile}
          className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
        >
          Save
        </button>
        <button className="px-4 py-2 border border-border rounded font-medium text-foreground hover:bg-secondary transition-colors">
          Cancel
        </button>
      </div>

      <div className="flex-1 flex gap-2">
        <button
          onClick={onSaveAccess}
          className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
        >
          Save
        </button>
        <button className="px-4 py-2 border border-border rounded font-medium text-foreground hover:bg-secondary transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

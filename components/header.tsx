'use client';

interface HeaderProps {
  onLogout: () => void;
  isLoggedIn: boolean;
}

export default function Header({ onLogout, isLoggedIn }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="font-semibold text-lg">Enterprise Access Console</span>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn && <span className="text-sm text-muted-foreground">Welcome, John</span>}
            <button className="text-xs px-3 py-1.5 rounded hover:bg-secondary text-muted-foreground">
              [Help]
            </button>
            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="text-xs px-3 py-1.5 rounded hover:bg-secondary text-muted-foreground"
              >
                [Logout]
              </button>
            )}
          </div>
        </div>

        <nav className="flex gap-6 mt-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Dashboard
          </a>
          <a href="#" className="hover:text-foreground">
            Users
          </a>
          <a href="#" className="hover:text-foreground">
            Access Control
          </a>
          <a href="#" className="hover:text-foreground">
            Audit Logs
          </a>
        </nav>
      </div>
    </header>
  );
}

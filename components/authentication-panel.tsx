'use client';

interface AuthenticationPanelProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSignIn: () => void;
  onReset: () => void;
  validationError: string;
}

export default function AuthenticationPanel({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSignIn,
  onReset,
  validationError,
}: AuthenticationPanelProps) {
  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <h2 className="text-lg font-semibold mb-6">Access Credentials</h2>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="user_login" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              id="user_login"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="pwd" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="pwd"
              type="password"
              name="pwd"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {validationError && (
          <div className="text-sm text-destructive font-medium">
            {validationError}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={onSignIn}
            className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 border border-border rounded font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

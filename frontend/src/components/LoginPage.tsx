"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(username, password);
    if (!success) {
      setError("Invalid username or password");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-strong)]">
      <div className="w-full max-w-md p-8 rounded-3xl border border-[var(--stroke)] bg-white shadow-[var(--shadow)]">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-semibold text-[var(--navy-dark)]">Sign In</h1>
          <p className="mt-2 text-sm text-[var(--gray-text)]">Enter your credentials to access the board</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gray-text)] mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--stroke)] bg-[var(--surface)] text-[var(--navy-dark)] outline-none focus:border-[var(--primary-blue)] transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gray-text)] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--stroke)] bg-[var(--surface)] text-[var(--navy-dark)] outline-none focus:border-[var(--primary-blue)] transition"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--secondary-purple)] text-white font-semibold uppercase tracking-[0.2em] text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--gray-text)]">
          Demo credentials: user / password
        </p>
      </div>
    </div>
  );
}

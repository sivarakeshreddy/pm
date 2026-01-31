"use client";

import { useMemo, useState, type FormEvent } from "react";
import { KanbanBoard } from "@/components/KanbanBoard";
import { initialData, type BoardData } from "@/lib/kanban";

const CREDENTIALS = { username: "user", password: "password" };

export default function Home() {
  const [board, setBoard] = useState<BoardData>(() => initialData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (
      username === CREDENTIALS.username &&
      password === CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      setError(null);
      event.currentTarget.reset();
      return;
    }

    setError("Incorrect username or password.");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const welcomeCopy = useMemo(
    () =>
      "Sign in to continue to your Kanban board. Use the demo credentials to explore the MVP.",
    []
  );

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,_rgba(32,157,215,0.25)_0%,_rgba(32,157,215,0.05)_55%,_transparent_70%)]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[520px] w-[520px] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,_rgba(117,57,145,0.18)_0%,_rgba(117,57,145,0.05)_55%,_transparent_75%)]" />

        <main className="relative mx-auto flex min-h-screen max-w-xl items-center px-6 py-16">
          <section className="w-full rounded-[32px] border border-[var(--stroke)] bg-white/90 p-8 shadow-[var(--shadow)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--gray-text)]">
              Project Management MVP
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--navy-dark)]">
              Welcome back
            </h1>
            <p className="mt-3 text-sm leading-6 text-[var(--gray-text)]">
              {welcomeCopy}
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gray-text)]">
                  Username
                </label>
                <input
                  name="username"
                  placeholder="user"
                  className="mt-2 w-full rounded-xl border border-[var(--stroke)] bg-white px-3 py-2 text-sm font-medium text-[var(--navy-dark)] outline-none transition focus:border-[var(--primary-blue)]"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gray-text)]">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="mt-2 w-full rounded-xl border border-[var(--stroke)] bg-white px-3 py-2 text-sm font-medium text-[var(--navy-dark)] outline-none transition focus:border-[var(--primary-blue)]"
                  required
                />
              </div>
              {error ? (
                <p className="text-sm font-semibold text-[var(--secondary-purple)]">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                className="w-full rounded-full bg-[var(--secondary-purple)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:brightness-110"
              >
                Sign in
              </button>
              <p className="text-xs text-[var(--gray-text)]">
                Demo credentials: user / password
              </p>
            </form>
          </section>
        </main>
      </div>
    );
  }

  return (
    <KanbanBoard board={board} onBoardChange={setBoard} onLogout={handleLogout} />
  );
}

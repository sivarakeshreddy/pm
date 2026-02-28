"use client";

import { ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import LoginPage from "@/components/LoginPage";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface-strong)]">
        <div className="text-[var(--gray-text)]">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
}

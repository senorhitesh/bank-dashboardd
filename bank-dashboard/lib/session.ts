import type { AuthUser } from "./auth";

const SESSION_KEY = "bank_admin_user";

export function saveUser(user: AuthUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function removeUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

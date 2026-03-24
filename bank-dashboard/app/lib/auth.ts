import { MOCK_USERS } from "./mock";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function validateCredentials(
  email: string,
  password: string,
): AuthUser | null {
  const found = MOCK_USERS.find(
    (u) =>
      u.email.toLowerCase() === email.trim().toLowerCase() &&
      u.password === password,
  );

  if (!found) return null;

  return {
    id: found.id,
    email: found.email,
    name: found.name,
    role: found.role,
  };
}

export interface MockUser {
  id: string;
  email: string;
  password: string;
  role: "super_admin" | "operator" | "auditor";
  name: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    email: "admin@bank.com",
    password: "admin123",
    role: "super_admin",
    name: "Admin User",
  },
  {
    id: "2",
    email: "ops@bank.com",
    password: "ops123",
    role: "operator",
    name: "Ops User",
  },
];

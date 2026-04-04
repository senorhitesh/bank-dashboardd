export interface MockUser {
  id: string;
  email: string;
  password: string;
  role: "Administrator" | "operator" | "auditor";
  name: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    email: "a@a.com",
    password: "123",
    role: "Administrator",
    name: "Softech Intern",
  },
];

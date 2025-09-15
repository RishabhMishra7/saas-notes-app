export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  tenant: {
    id: string;
    name: string;
    slug: string;
    plan: "FREE" | "PRO";
  };
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

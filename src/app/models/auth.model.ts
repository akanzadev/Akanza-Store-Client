export interface Auth {
  user: User;
  token: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  createdAt: Date;
}

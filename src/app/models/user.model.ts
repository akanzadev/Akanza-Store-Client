export interface User {
  id: number;
  email: string;
  role: 'customer' | 'admin';
  password: string;
  createdAt: Date;
  customer: Customer;
}

export interface Customer {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  createdAt: Date;
  userId: number;
}

export interface CreateUserDTO
  extends Omit<User, 'id' | 'createdAt' | 'customer'> {}

export type Role = 'user' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isDeleted?: boolean;
};

export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PaginatedTodos = {
  data: Todo[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

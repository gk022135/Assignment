import { PaginatedTodos, Todo, User } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
const TOKEN_KEY = 'todo_api_token';
const USER_KEY = 'todo_api_user';

type LoginPayload = { email: string; password: string };
type SignupPayload = { name: string; email: string; password: string };
type UpdateUserPayload = { name?: string; password?: string };
type CreateTodoPayload = { title: string; description?: string; completed?: boolean };
type UpdateTodoPayload = { title?: string; description?: string; completed?: boolean };

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string | null;
};

const getHeaders = (token?: string | null) => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: getHeaders(options.token),
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const message = error?.message ?? 'Request failed';
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const tokenStore = {
  get: () => (typeof window === 'undefined' ? null : localStorage.getItem(TOKEN_KEY)),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const userStore = {
  get: (): User | null => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  },
  set: (user: User) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  clear: () => localStorage.removeItem(USER_KEY),
};

export const authApi = {
  async login(payload: LoginPayload) {
    return request<{ accessToken: string; user: User }>('/auth/login', {
      method: 'POST',
      body: payload,
    });
  },
  async signup(payload: SignupPayload) {
    return request<{ message: string; user: User }>('/auth/signup', {
      method: 'POST',
      body: payload,
    });
  },
  async logout(token: string | null) {
    return request<{ message: string }>('/auth/logout', { method: 'POST', token });
  },
};

export const usersApi = {
  me: (token: string | null) => request<User>('/users/me', { token }),
  updateMe: (token: string | null, payload: UpdateUserPayload) =>
    request<User>('/users/me', { method: 'PATCH', token, body: payload }),
  list: (token: string | null) => request<User[]>('/users', { token }),
  update: (token: string | null, id: string, payload: UpdateUserPayload) =>
    request<User>(`/users/${id}`, { method: 'PATCH', token, body: payload }),
  remove: (token: string | null, id: string) =>
    request<{ message: string }>(`/users/${id}`, { method: 'DELETE', token }),
};

export const todosApi = {
  list: (token: string | null, page = 1, limit = 10) =>
    request<PaginatedTodos>(`/todos?page=${page}&limit=${limit}`, { token }),
  create: (token: string | null, payload: CreateTodoPayload) =>
    request<{ message: string; todo: Todo }>('/todos', { method: 'POST', token, body: payload }),
  update: (token: string | null, id: string, payload: UpdateTodoPayload) =>
    request<{ message: string; todo: Todo }>(`/todos/${id}`, { method: 'PATCH', token, body: payload }),
  remove: (token: string | null, id: string) =>
    request<{ message: string; todo: Todo }>(`/todos/${id}`, { method: 'DELETE', token }),
};

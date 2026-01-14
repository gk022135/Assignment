"use client";

import { useEffect, useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { Pagination } from '../../components/Pagination';
import { Protected } from '../../components/Protected';
import { TodoForm } from '../../components/TodoForm';
import { TodoList } from '../../components/TodoList';
import { todosApi } from '../../lib/api';
import { useAuth } from '../../lib/auth';
import { PaginatedTodos, Todo } from '../../types';

export default function DashboardPage() {
  const { token } = useAuth();
  const [data, setData] = useState<PaginatedTodos | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async (page = 1, limit = 10) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await todosApi.list(token, page, limit);
      setData(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1, 10);
  }, [token]);

  const handleCreated = (todo: Todo) => {
    if (!data) {
      setData({
        data: [todo],
        pagination: { total: 1, page: 1, limit: 10, pages: 1 },
      });
      return;
    }
    setData({
      data: [todo, ...data.data],
      pagination: {
        ...data.pagination,
        total: data.pagination.total + 1,
      },
    });
  };

  const handleChange = (todos: Todo[]) => {
    if (!data) return;
    setData({ ...data, data: todos });
  };

  return (
    <Protected>
      <AppShell>
        <div className="grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-slate-900">My Todos</h1>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {loading && <p className="text-sm text-slate-600">Loading...</p>}
            {data && (
              <>
                <TodoList todos={data.data} onChange={handleChange} />
                <Pagination
                  page={data.pagination.page}
                  pages={data.pagination.pages}
                  onPage={(p) => load(p, data.pagination.limit)}
                />
              </>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add Todo</h2>
            <p className="mb-3 text-sm text-slate-600">Create a new task.</p>
            <TodoForm onCreated={handleCreated} />
          </div>
        </div>
      </AppShell>
    </Protected>
  );
}

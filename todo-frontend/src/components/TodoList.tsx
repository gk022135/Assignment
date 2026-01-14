"use client";

import { useState } from 'react';
import { todosApi } from '../lib/api';
import { useAuth } from '../lib/auth';
import { Todo } from '../types';

export function TodoList({
  todos,
  onChange,
}: {
  todos: Todo[];
  onChange: (next: Todo[]) => void;
}) {
  const { token } = useAuth();
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggle = async (todo: Todo) => {
    if (!token) return;
    setWorkingId(todo.id);
    setError(null);
    try {
      const res = await todosApi.update(token, todo.id, { completed: !todo.completed });
      onChange(todos.map((t) => (t.id === todo.id ? res.todo : t)));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setWorkingId(null);
    }
  };

  const remove = async (todo: Todo) => {
    if (!token) return;
    setWorkingId(todo.id);
    setError(null);
    try {
      await todosApi.remove(token, todo.id);
      onChange(todos.filter((t) => t.id !== todo.id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-600">{error}</p>}
      {todos.length === 0 && <p className="text-sm text-slate-600">No todos yet.</p>}
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-start justify-between gap-3 rounded border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggle(todo)}
                disabled={workingId === todo.id}
              />
              <p className="font-medium text-slate-900">{todo.title}</p>
            </div>
            {todo.description && <p className="mt-1 text-sm text-slate-700">{todo.description}</p>}
          </div>
          <button
            onClick={() => remove(todo)}
            disabled={workingId === todo.id}
            className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

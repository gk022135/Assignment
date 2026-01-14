"use client";

import { usersApi } from '../lib/api';
import { useAuth } from '../lib/auth';
import { User } from '../types';
import { useState } from 'react';

export function UserTable({ initial }: { initial: User[] }) {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>(initial);
  const [working, setWorking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const softDelete = async (id: string) => {
    if (!token) return;
    setWorking(id);
    setError(null);
    try {
      await usersApi.remove(token, id);
      setUsers(users.map((u) => (u.id === id ? { ...u, isDeleted: true } : u)));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setWorking(null);
    }
  };

  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
      {error && <p className="px-4 py-2 text-sm text-red-600">{error}</p>}
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2" />
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-slate-200">
              <td className="px-4 py-2">{u.name}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2 uppercase">{u.role}</td>
              <td className="px-4 py-2">{u.isDeleted ? 'Deleted' : 'Active'}</td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => softDelete(u.id)}
                  disabled={working === u.id || u.isDeleted}
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 disabled:opacity-50"
                >
                  Soft Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td className="px-4 py-4 text-center text-slate-600" colSpan={5}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

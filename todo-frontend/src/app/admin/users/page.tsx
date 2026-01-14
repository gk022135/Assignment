"use client";

import { useEffect, useState } from 'react';
import { AppShell } from '../../../components/AppShell';
import { AdminOnly } from '../../../components/Protected';
import { UserTable } from '../../../components/UserTable';
import { usersApi } from '../../../lib/api';
import { useAuth } from '../../../lib/auth';
import { User } from '../../../types';

export default function AdminUsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await usersApi.list(token);
      setUsers(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [token]);

  return (
    <AdminOnly>
      <AppShell>
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
            <p className="text-sm text-slate-600">Admin-only user management</p>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {loading && <p className="text-sm text-slate-600">Loading...</p>}
          {users && <UserTable initial={users} />}
        </div>
      </AppShell>
    </AdminOnly>
  );
}

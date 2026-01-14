"use client";

import { useEffect, useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { Protected } from '../../components/Protected';
import { usersApi } from '../../lib/api';
import { useAuth } from '../../lib/auth';

export default function ProfilePage() {
  const { user, token, refreshProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await usersApi.updateMe(token, { name, password: password || undefined });
      await refreshProfile();
      setMessage('Profile updated');
      setPassword('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected>
      <AppShell>
        <div className="max-w-xl space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
            <p className="text-sm text-slate-600">Update your profile details.</p>
          </div>
          <form onSubmit={save} className="space-y-3 rounded border border-slate-200 bg-white p-4 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-green-700">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-60"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </AppShell>
    </Protected>
  );
}

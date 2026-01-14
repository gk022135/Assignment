"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../lib/auth';

export function Protected({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!token) router.replace('/login');
  }, [loading, token, router]);

  if (!token) return null;
  return <>{children}</>;
}

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { token, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!token) router.replace('/login');
    else if (user?.role !== 'admin') router.replace('/dashboard');
  }, [loading, token, user, router]);

  if (!token || user?.role !== 'admin') return null;
  return <>{children}</>;
}

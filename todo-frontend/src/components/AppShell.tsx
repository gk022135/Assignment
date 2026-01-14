"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/auth';
import clsx from 'clsx';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="text-lg font-semibold text-primary">
            Todo Manager
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx('rounded px-3 py-1', {
                  'bg-primary text-white': pathname.startsWith(link.href),
                  'text-slate-700 hover:bg-slate-100': !pathname.startsWith(link.href),
                })}
              >
                {link.label}
              </Link>
            ))}
            {user?.role === 'admin' && (
              <Link
                href="/admin/users"
                className={clsx('rounded px-3 py-1', {
                  'bg-primary text-white': pathname.startsWith('/admin'),
                  'text-slate-700 hover:bg-slate-100': !pathname.startsWith('/admin'),
                })}
              >
                Admin
              </Link>
            )}
            <button
              onClick={logout}
              className="rounded bg-slate-900 px-3 py-1 text-white hover:bg-slate-800"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}

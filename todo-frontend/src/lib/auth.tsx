"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi, tokenStore, userStore, usersApi } from './api';
import { User } from '../types';

export type AuthContextState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = tokenStore.get();
    const storedUser = userStore.get();
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const refreshProfile = async () => {
    if (!token) return;
    const profile = await usersApi.me(token);
    setUser(profile);
    userStore.set(profile);
  };

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    tokenStore.set(res.accessToken);
    userStore.set(res.user);
    setToken(res.accessToken);
    setUser(res.user);
  };

  const signup = async (name: string, email: string, password: string) => {
    await authApi.signup({ name, email, password });
    await login(email, password);
  };

  const logout = async () => {
    if (token) {
      await authApi.logout(token).catch(() => undefined);
    }
    tokenStore.clear();
    userStore.clear();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, signup, logout, refreshProfile }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

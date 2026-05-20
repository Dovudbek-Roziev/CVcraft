import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveToken = (token) => localStorage.setItem('cvcraft_token', token);
  const getToken = () => localStorage.getItem('cvcraft_token');
  const removeToken = () => localStorage.removeItem('cvcraft_token');

  // Token bilan API call
  const apiFetch = useCallback(async (path, options = {}) => {
    const token = getToken();
    const res = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Xato yuz berdi');
    return data;
  }, []);

  // App ochilganda tokenni tekshir
  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }

    apiFetch('/api/auth/me')
      .then(data => setUser(data))
      .catch(() => { removeToken(); setUser(null); })
      .finally(() => setLoading(false));
  }, [apiFetch]);

  const register = async (email, password, name = '') => {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    saveToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async (email, password) => {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    saveToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  // Premium statusini serverdan yangilash
  const refreshUser = useCallback(async () => {
    if (!getToken()) return;
    try {
      const data = await apiFetch('/api/auth/me');
      setUser(data);
    } catch {
      // token eskirgan bo'lsa logout
      logout();
    }
  }, [apiFetch]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, apiFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

import { createContext, useContext, useMemo, useState } from 'react';
import { apiFetch, clearAuth, getStoredUser, getToken, setAuth } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken);
  const [user, setUser] = useState(getStoredUser);

  const login = async (email, password) => {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuth(data.token, data.user);
    setTokenState(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async ({ name, email, password }) => {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    setAuth(data.token, data.user);
    setTokenState(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    clearAuth();
    setTokenState(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, login, register, logout, isAuthenticated: Boolean(token && user) }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

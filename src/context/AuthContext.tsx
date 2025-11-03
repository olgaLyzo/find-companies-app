import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthState, AuthContextValue } from "../utils/auth";
import { getAccountInfo } from "../requests/statRequest"; // если хочешь подгружать статистику

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    accessToken: localStorage.getItem("accessToken"),
    expire: localStorage.getItem("tokenExpire"),
    name: localStorage.getItem("userName") || null,
    surname: localStorage.getItem("userSurname") || null,
    avatarUrl: localStorage.getItem("userAvatar") || null,
  });

  const isAuthenticated = !!auth.accessToken && !!auth.expire && new Date(auth.expire) > new Date();

  const login = (token, expire, name, surname, avatarUrl) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("tokenExpire", expire);

  name && localStorage.setItem("userName", name);
  surname && localStorage.setItem("userSurname", surname);
  avatarUrl && localStorage.setItem("userAvatar", avatarUrl);

  setAuth({ accessToken: token, expire, name, surname, avatarUrl });
};

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpire");
    localStorage.removeItem("userName");
    localStorage.removeItem("userSurname");
    localStorage.removeItem("userAvatar");
    setAuth({ accessToken: null, expire: null, name: null, surname: null, avatarUrl: null });
    // можно ещё: navigate('/login') — но navigation из контекста лучше не делать напрямую
  }, []);

  // авто-logout при истечении
  useEffect(() => {
    if (!auth.expire) return;
    const msLeft = new Date(auth.expire).getTime() - Date.now();
    if (msLeft <= 0) {
      logout();
      return;
    }
    const t = setTimeout(logout, msLeft);
    return () => clearTimeout(t);
  }, [auth.expire, logout]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthState, AuthContextValue } from "../utils/auth";
import { getAccountInfo } from "../requests/accountAPI"; // если хочешь подгружать статистику

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    accessToken: localStorage.getItem("accessToken"),
    expire: localStorage.getItem("tokenExpire"),
    name: localStorage.getItem("userName") || null,
    surname: localStorage.getItem("userSurname") || null,
    avatarUrl: localStorage.getItem("userAvatar") || null,
  });

	const isAuthenticated =
		!!auth.accessToken &&
		!!auth.expire &&
		new Date(auth.expire) > new Date();

	const login = useCallback((
		token: string,
		expire: string,
		name: string | null,
		surname: string | null,
		avatarUrl: string | null
	) => {

		localStorage.setItem("accessToken", token);
		localStorage.setItem("tokenExpire", expire);

		if (name) localStorage.setItem("userName", name);
		if (surname) localStorage.setItem("userSurname", surname);
		if (avatarUrl) localStorage.setItem("userAvatar", avatarUrl);

		setAuth({
			accessToken: token,
			expire,
			name,
			surname,
			avatarUrl
		});
	}, []);

	const loadUserInfo = async () => {
		try {
			const data = await getAccountInfo();
			console.log("ACCOUNT INFO:", data);
			if (!data) return;

			setAuth((prev) => ({
				...prev,
				name: data.name ?? prev.name,
				surname: data.surname ?? prev.surname,
				avatarUrl: data.avatarUrl ?? prev.avatarUrl
			}));
			if (data.name) {
				localStorage.setItem("userName", data.name);
			}
			if (data.surname) {
				localStorage.setItem("userSurname", data.surname);
			}
			if (data.avatarUrl) {
				localStorage.setItem("userAvatar", data.avatarUrl);
			}
		} catch (e) {
			console.log("Не удалось получить данные пользователя", e);
		}
	};

	const logout = useCallback(() => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("tokenExpire");
		localStorage.removeItem("userName");
		localStorage.removeItem("userSurname");
		localStorage.removeItem("userAvatar");
		setAuth({
			accessToken: null,
			expire: null,
			name: null,
			surname: null,
			avatarUrl: null
		});
	},[]);

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
    <AuthContext.Provider value={{ auth, login, logout, isAuthenticated, loadUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
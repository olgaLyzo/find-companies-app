import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { getAccountInfo } from "../requests/accountAPI"; // если хочешь подгружать статистику
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
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
    const logout = async () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpire");
        localStorage.removeItem("userName");
        localStorage.removeItem("userSurname");
        localStorage.removeItem("userAvatar");
        setAuth({ accessToken: null, expire: null, name: null, surname: null, avatarUrl: null });
        await loadUserInfo();
    };
    useEffect(() => {
        if (!auth.expire)
            return;
        const msLeft = new Date(auth.expire).getTime() - Date.now();
        if (msLeft <= 0) {
            logout();
            return;
        }
        const t = setTimeout(logout, msLeft);
        return () => clearTimeout(t);
    }, [auth.expire, logout]);
    const loadUserInfo = async () => {
        try {
            const data = await getAccountInfo();
            setAuth((prev) => ({
                ...prev,
                name: data.data.name,
                surname: data.data.surname,
                avatarUrl: data.data.avatarUrl
            }));
            if (data.data.name)
                localStorage.setItem("userName", data.data.name);
            if (data.data.surname)
                localStorage.setItem("userSurname", data.data.surname);
            if (data.data.avatarUrl)
                localStorage.setItem("userAvatar", data.data.avatarUrl);
        }
        catch (e) {
            console.log("Не удалось получить данные пользователя");
        }
    };
    return (_jsx(AuthContext.Provider, { value: { auth, login, logout, isAuthenticated, loadUserInfo }, children: children }));
};
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

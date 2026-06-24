import axios from "axios";
import { logout, getAccessToken } from "../requests/authHelpers";
export const api = axios.create({
    baseURL: "https://gateway.scan-interfax.ru/api/v1",
});
// Добавляем токен в каждый запрос
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});
// Перехватываем ошибки
api.interceptors.response.use((res) => res, async (error) => {
    if (error.response?.status === 401) {
        logout();
        window.location.href = "/login"; // redirect
    }
    return Promise.reject(error);
});

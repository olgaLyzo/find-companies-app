import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import css from '../scss/authorisation_form.module.scss';
import { useNavigate } from 'react-router';
export const API = 'https://gateway.scan-interfax.ru';
const AuthorisationForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const phoneRegex = /^\+\d[\d\s()-]{7,14}\d$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    useEffect(() => {
        const loginTrimmed = login.trim();
        const passwordTrimmed = password.trim();
        const loginValid = emailRegex.test(loginTrimmed) ||
            phoneRegex.test(loginTrimmed) ||
            usernameRegex.test(loginTrimmed);
        const passwordValid = passwordTrimmed.length >= 7;
        setIsValid(loginValid && passwordValid);
    }, [login, password]);
    const formatPhoneNumber = (value) => {
        // удаляем все символы кроме цифр и +
        let digits = value.replace(/[^\d+]/g, '');
        // если есть +7 (Россия)
        if (digits.startsWith('+7')) {
            digits = digits.replace(/^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
        }
        // если +48 (Польша)
        else if (digits.startsWith('+48')) {
            digits = digits.replace(/^(\+48)(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4');
        }
        // если +375 (Беларусь)
        else if (digits.startsWith('+375')) {
            digits = digits.replace(/^(\+375)(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
        }
        return digits;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await fetch(`${API}/api/v1/account/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
            });
            if (!response.ok) {
                throw new Error('Ошибка авторизации');
            }
            const data = await response.json();
            console.log(2, data);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('tokenExpire', data.expire);
            navigate('/');
        }
        catch (err) {
            setError('Неверный логин или пароль ❌');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: css.form_container, children: [_jsx("img", { className: css.lock, src: '../../public/images/grey-lock.svg', alt: 'grey-lock' }), _jsxs("div", { className: css.tabs, children: [_jsx("button", { className: css.active, children: "\u0412\u043E\u0439\u0442\u0438" }), _jsx("button", { className: css.sign_in_btn, children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("label", { children: ["\u041B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430:", _jsx("input", { type: "text", name: "login", value: login, onChange: (e) => {
                                    const rawValue = e.target.value;
                                    if (rawValue.startsWith('+')) {
                                        setLogin(formatPhoneNumber(rawValue));
                                    }
                                    else {
                                        setLogin(rawValue);
                                    }
                                }, required: true })] }), _jsxs("label", { children: ["\u041F\u0430\u0440\u043E\u043B\u044C:", _jsx("input", { type: "password", name: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", className: `${css.login_btn} ${isValid ? css.active : ''}`, disabled: !isValid || loading, children: loading ? 'Входим...' : 'Войти' }), error && _jsx("p", { style: { color: 'red' }, children: error })] }), _jsx("a", { href: "#", className: css.forgot_password, children: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C" }), _jsxs("div", { className: css.login_via, children: [_jsx("p", { children: "\u0412\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437:" }), _jsxs("div", { className: css.social_buttons, children: [_jsx("button", { className: css.google, children: _jsx("img", { src: 'images/google_icon.svg' }) }), _jsx("button", { children: _jsx("img", { src: 'images/facebook_icon.svg' }) }), _jsx("button", { children: _jsx("img", { src: 'images/yandex_icon.svg' }) })] })] })] }));
};
export default AuthorisationForm;

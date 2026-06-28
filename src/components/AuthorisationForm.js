import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import css from '../scss/components_styles/authorisation_form.module.scss';
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../requests/authAPI";
const AuthorisationForm = () => {
    const [loginInput, setLoginInput] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    useEffect(() => {
        const loginValid = loginInput.trim().length > 2;
        const passwordValid = password.trim().length >= 7;
        setIsValid(loginValid && passwordValid);
    }, [loginInput, password]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await loginRequest(loginInput, password);
            login(data.accessToken, data.expire, data.name, data.surname, data.avatarUrl);
            navigate('/');
        }
        catch {
            setError('Неверный логин или пароль ❌');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: css.form_container, children: [_jsx("img", { className: css.lock_icon, src: 'images/grey-lock.svg', alt: 'grey-lock' }), _jsxs("div", { className: css.tabs, children: [_jsx("button", { className: css.active, children: "\u0412\u043E\u0439\u0442\u0438" }), _jsx("button", { className: css.sign_in_btn, children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("label", { children: ["\u041B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430:", _jsx("input", { type: "text", name: "login", value: loginInput, onChange: (e) => setLoginInput(e.target.value), required: true })] }), _jsxs("label", { children: ["\u041F\u0430\u0440\u043E\u043B\u044C:", _jsx("input", { type: "password", name: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", className: `${css.login_btn} ${isValid ? css.active : ''}`, disabled: !isValid || loading, children: loading ? 'Входим...' : 'Войти' }), error && _jsx("p", { style: { color: 'red' }, children: error })] }), _jsx("a", { href: "#", className: css.forgot_password, children: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C" }), _jsxs("div", { className: css.login_via, children: [_jsx("p", { children: "\u0412\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437:" }), _jsxs("div", { className: css.social_buttons, children: [_jsx("button", { className: css.google, children: _jsx("img", { src: 'images/google_icon.svg' }) }), _jsx("button", { children: _jsx("img", { src: 'images/facebook_icon.svg' }) }), _jsx("button", { children: _jsx("img", { src: 'images/yandex_icon.svg' }) })] })] })] }));
};
export default AuthorisationForm;

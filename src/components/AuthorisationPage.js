import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/authorisation.module.scss';
import AuthorisationForm from './AuthorisationForm';
const AuthorisationPage = () => {
    return (_jsxs("div", { className: css.auth, children: [_jsx("h1", { children: "\u0414\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438 \u043D\u0430 \u0442\u0430\u0440\u0438\u0444, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F." }), _jsx(AuthorisationForm, {}), _jsx("img", { className: css.people_with_key, src: "images/people_with_key.svg", alt: "people_with_key" })] }));
};
export default AuthorisationPage;

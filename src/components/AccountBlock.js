import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "../scss/account.module.scss";
import { useAuth } from "../context/AuthContext";
const AccountBlock = () => {
    const { auth, logout } = useAuth();
    return (_jsxs("div", { className: css.account_container, children: [_jsxs("div", { className: css.account_info, children: [_jsx("div", { className: css.user_name, children: auth.name || "Tim Huck" }), _jsx("button", { className: css.logout_btn, onClick: logout, children: "\u0412\u044B\u0439\u0442\u0438" })] }), _jsx("img", { src: auth.avatarUrl || "/images/default_avatar.svg", alt: "user_avatar", className: css.user_avatar })] }));
};
export default AccountBlock;

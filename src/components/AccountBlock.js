import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "../scss/components_styles/account.module.scss";
import { useAuth } from "../context/AuthContext";
const AccountBlock = () => {
    const { auth, logout } = useAuth();
    const fullName = auth.name || "Пользователь";
    const avatar = auth.avatarUrl || "/images/default_avatar.svg";
    return (_jsxs("div", { className: css.account_container, children: [_jsxs("div", { className: css.account_info, children: [_jsx("div", { className: css.user_name, children: fullName }), _jsx("button", { className: css.logout_btn, onClick: logout, children: "\u0412\u044B\u0439\u0442\u0438" })] }), _jsx("img", { src: avatar, alt: "user_avatar", className: css.user_avatar })] }));
};
export default AccountBlock;

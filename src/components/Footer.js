import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/footer.module.scss';
const Footer = () => {
    return (_jsxs("div", { className: css.footer, children: [_jsx("div", { className: css.logo }), _jsxs("div", { className: css.info, children: [_jsx("div", { className: css.adress, children: _jsx("a", { href: "https://www.google.com/maps/search/?api=1&query=\u0431-\u0440+\u0426\u0432\u0435\u0442\u043D\u043E\u0439+40+\u041C\u043E\u0441\u043A\u0432\u0430", target: "_blank", rel: "noopener noreferrer", children: "\u0433. \u041C\u043E\u0441\u043A\u0432\u0430, \u0426\u0432\u0435\u0442\u043D\u043E\u0439 \u0431-\u0440, 40" }) }), _jsx("div", { className: css.phone_number, children: _jsx("a", { href: "tel:+74957712111", children: " +7 (495) 771 21 11" }) }), _jsx("div", { className: css.mail, children: _jsx("a", { href: "mailto:info@skan.ru", children: "info@skan.ru" }) }), _jsx("div", { className: css.rights, children: " Copyright. 2022" })] })] }));
};
export default Footer;

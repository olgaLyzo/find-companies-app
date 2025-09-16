import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/burger.module.scss';
import { useState } from 'react';
const BurgerMenu = ({ menuItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (_jsxs("div", { className: css.hamburgerMenu, children: [_jsxs("button", { className: css.hamburgerButton, onClick: toggleMenu, children: [_jsx("div", { className: `${css.bar} ${isOpen ? css.open1 : ''}` }), _jsx("div", { className: `${css.bar} ${isOpen ? css.open2 : ''}` }), _jsx("div", { className: `${css.bar} ${isOpen ? css.open3 : ''}` })] }), _jsx("nav", { className: `${css.menu} ${isOpen ? css.open : ''}`, children: menuItems.map((item, index) => (_jsx("a", { href: item.link, className: css.menuItem, onClick: toggleMenu, children: item.label }, index))) })] }));
};
export default BurgerMenu;

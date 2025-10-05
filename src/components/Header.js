import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/header.module.scss';
import { useState } from 'react';
import BurgerMenu from './BurgerMenu';
import Statistic from './Statistic';
import { Link } from 'react-router';
const Header = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const statData = [
        { quantity: 10, limit: 50 }
    ];
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };
    const menuItems = [
        { label: 'Зарегистрироваться', link: '/auth' },
        { label: 'Вход', link: '/login' },
        { label: 'Главная', link: '/' },
        { label: 'Тарифы', link: '/tarifs' },
        { label: 'FAQ', link: '/questions' },
    ];
    return (_jsxs("header", { className: css.header, children: [_jsx("div", { className: css.logo }), _jsx("div", { className: css.menu_items, children: menuItems.map((item, index) => {
                    if (index !== 0 && index !== 1) {
                        return (_jsx(Link, { to: item.link, className: css.menuItem, onClick: toggleMenu, children: item.label }, index));
                    }
                }) }), _jsx(Statistic, { statData: statData }), _jsxs("div", { className: css.menu, children: [_jsx(Link, { to: "/auth", children: _jsx("button", { className: css.registration_btn, children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" }) }), _jsx("div", { className: css.limiter }), _jsx(Link, { to: "/login", children: _jsx("button", { className: css.enter_in_account, children: "\u0412\u043E\u0439\u0442\u0438" }) })] }), _jsx(BurgerMenu, { menuItems: menuItems, isOpen: isOpen, onClick: toggleMenu })] }));
};
export default Header;

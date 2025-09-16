import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/header.module.scss';
import BurgerMenu from './BurgerMenu';
import Statistic from './Statistic';
const Header = ({ burgerMenuComponent, statisticComponent }) => {
    const menuItems = [
        { label: 'Главная', link: '/' },
        { label: 'О нас', link: '/about' },
        { label: 'Услуги', link: '/services' },
        { label: 'Контакты', link: '/contact' },
    ];
    const statData = [
        { quantity: 10, limit: 50 }
    ];
    return (_jsxs("header", { className: css.header, children: [_jsx("div", { className: css.logo }), _jsx(Statistic, { statData: statData }), _jsx(BurgerMenu, { menuItems: menuItems })] }));
};
export default Header;

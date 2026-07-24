import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/components_styles/loader.module.scss';
const Loader = ({ showText = true, small = false }) => (_jsxs(_Fragment, { children: [_jsx("div", { className: `${css.loader} ${small ? css.small : ''}`, children: Array.from({ length: 8 }).map((_, index) => (_jsx("span", { style: { '--i': index } }, index))) }), showText && _jsx("p", { className: css.text, children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0434\u0430\u043D\u043D\u044B\u0435" })] }));
export default Loader;

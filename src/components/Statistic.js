import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import css from '../scss/stat.module.scss';
const Statistic = () => {
    const [quantity, setQuantity] = useState(34);
    const [limit, setLimit] = useState(100);
    return (_jsxs("div", { className: css.stat_block, children: [_jsxs("div", { className: css.companies_block, children: [_jsx("p", { children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 " }), _jsx("div", { className: css.num_of_companies, children: quantity })] }), _jsxs("div", { className: css.limit_block, children: [_jsx("p", { children: "\u041B\u0438\u043C\u0438\u0442 \u043F\u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F\u043C" }), _jsx("div", { className: css.limits, children: limit })] })] }));
};
export default Statistic;

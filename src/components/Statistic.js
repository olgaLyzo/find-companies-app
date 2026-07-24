import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import css from '../scss/components_styles/stat.module.scss';
import { getAccountInfo } from "../requests/statRequest";
import Loader from './statLoader';
const Statistic = () => {
    const [quantity, setQuantity] = useState(null);
    const [limit, setLimit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAccountInfo();
                setQuantity(data.eventFiltersInfo.usedCompanyCount);
                setLimit(data.eventFiltersInfo.companyLimit);
            }
            catch (err) {
                console.log(err);
                setError('Не удалось загрузить статистику');
            }
            finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
    if (error) {
        return (_jsx("div", { className: css.stat_block, children: error }));
    }
    return (_jsx("div", { className: css.stat_block, children: loading ? (_jsx("div", { className: css.stat_loader, children: _jsx(Loader, { showText: false, small: true }) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: css.companies_block, children: [_jsx("p", { children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439" }), _jsx("div", { className: css.num_of_companies, children: quantity })] }), _jsxs("div", { className: css.limit_block, children: [_jsx("p", { children: "\u041B\u0438\u043C\u0438\u0442 \u043F\u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F\u043C" }), _jsx("div", { className: css.limits, children: limit })] })] })) }));
};
export default Statistic;

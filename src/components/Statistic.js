import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import css from '../scss/components_styles/stat.module.scss';
import { getAccountInfo } from "../requests/statRequest";
const Statistic = () => {
    const [quantity, setQuantity] = useState(0);
    const [limit, setLimit] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAccountInfo();
            setQuantity(data.eventFiltersInfo.usedCompanyCount);
            setLimit(data.eventFiltersInfo.companyLimit);
        }
        catch (err) {
            console.error(err);
            setError("Не удалось загрузить данные");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchStats();
    }, []);
    if (loading) {
        return _jsx("div", { className: css.stat_block, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    }
    if (error) {
        return _jsx("div", { className: css.stat_block, children: error });
    }
    return (_jsxs("div", { className: css.stat_block, children: [_jsxs("div", { className: css.companies_block, children: [_jsx("p", { children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439" }), _jsx("div", { className: css.num_of_companies, children: quantity })] }), _jsxs("div", { className: css.limit_block, children: [_jsx("p", { children: "\u041B\u0438\u043C\u0438\u0442 \u043F\u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F\u043C" }), _jsx("div", { className: css.limits, children: limit })] })] }));
};
export default Statistic;

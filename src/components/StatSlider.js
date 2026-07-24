import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import css from '../scss/components_styles/stat_slider.module.scss';
import Loader from './statLoader';
export const parameters = [
    'Период',
    'Всего',
    'Риски'
];
const StatSlider = ({ loading = false, empty = false, histograms }) => {
    const [start, setStart] = useState(0);
    const [windowSize, setWindowSize] = useState(5);
    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize(window.innerWidth < 768 ? 1 : 5);
        };
        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();
        return () => window.removeEventListener('resize', updateWindowSize);
    }, []);
    const data = React.useMemo(() => {
        const totalDocuments = histograms.find(item => item.histogramType === 'totalDocuments');
        const riskFactors = histograms.find(item => item.histogramType === 'riskFactors');
        if (!totalDocuments) {
            return [];
        }
        return totalDocuments.data.map((item, index) => ({
            period: new Date(item.date)
                .toLocaleDateString('ru-RU'),
            total: item.value,
            risks: riskFactors?.data[index]?.value ?? 0
        }));
    }, [histograms]);
    const total = data.length;
    const handlePrev = () => setStart((prev) => (prev - windowSize + total) % total);
    const handleNext = () => setStart((prev) => (prev + windowSize) % total);
    const getVisibleData = () => {
        const result = [];
        for (let i = 0; i < windowSize; i++) {
            result.push(data[(start + i) % total]);
        }
        return result;
    };
    const visibleData = getVisibleData();
    return (_jsxs("div", { className: css.wrapper, children: [!loading && (_jsx("div", { className: css.back_arrow, onClick: handlePrev })), _jsxs("div", { className: css.table, children: [_jsx("div", { className: css.main_column, children: parameters.map((param, index) => (_jsx("div", { children: param }, index))) }), loading ? (_jsx("div", { className: css.loading_container, children: _jsx(Loader, {}) })) : empty ? (_jsx("div", { className: css.loading_container, children: _jsx("p", { className: css.empty_text, children: "\u0421\u0442\u0430\u0442\u0435\u0439 \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E" }) })) : (visibleData.map((elem, index) => (_jsxs("div", { className: css.column_container, children: [_jsxs("div", { className: css.column, children: [_jsx("div", { className: css.dataCell, children: elem.period }), _jsx("div", { className: css.dataCell, children: elem.total }), _jsx("div", { className: css.dataCell, children: elem.risks })] }), _jsx("div", { className: css.separator, style: { display: index === 4 ? 'none' : 'block' } })] }, index))))] }), !loading && (_jsx("div", { className: css.forward_arrow, onClick: handleNext }))] }));
};
export default StatSlider;

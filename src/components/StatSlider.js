import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import css from '../scss/stat_slider.module.scss';
export const data = [
    { period: '10.09.2021', total: 5, risks: 0 },
    { period: '13.09.2021', total: 2, risks: 0 },
    { period: '17.09.2021', total: 6, risks: 0 },
    { period: '20.09.2021', total: 8, risks: 0 },
    { period: '12.10.2021', total: 1, risks: 0 },
    { period: '15.10.2021', total: 10, risks: 2 },
    { period: '16.10.2021', total: 4, risks: 0 },
    { period: '17.10.2021', total: 3, risks: 0 },
    { period: '20.09.2021', total: 8, risks: 0 },
    { period: '12.10.2021', total: 1, risks: 0 },
    { period: '15.10.2021', total: 10, risks: 2 },
    { period: '16.10.2021', total: 4, risks: 0 },
    { period: '17.10.2021', total: 3, risks: 0 },
];
export const parameters = [
    'Период',
    'Всего',
    'Риски'
];
const StatSlider = () => {
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
    return (_jsxs("div", { className: css.wrapper, children: [_jsx("div", { className: css.back_arrow, onClick: handlePrev }), _jsxs("div", { className: css.table, children: [_jsx("div", { className: css.main_column, children: parameters.map((param, index) => (_jsx("div", { children: param }, index))) }), visibleData.map((elem, index) => (_jsxs("div", { className: css.column_container, children: [_jsxs("div", { className: css.column, children: [_jsx("div", { className: css.dataCell, children: elem.period }), _jsx("div", { className: css.dataCell, children: elem.total }), _jsx("div", { className: css.dataCell, children: elem.risks })] }), _jsx("div", { className: css.separator, style: { display: index === 4 && 'none' } })] }, index)))] }), _jsx("div", { className: css.forward_arrow, onClick: handleNext })] }));
};
export default StatSlider;

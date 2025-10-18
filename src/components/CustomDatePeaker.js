import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import css from '../scss/datapeaker.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const DatePickerCustom = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [activeStart, setActiveStart] = useState(false);
    const [activeEnd, setActiveEnd] = useState(false);
    const toggleStart = () => setActiveStart(!activeStart);
    const toggleEnd = () => setActiveEnd(!activeEnd);
    const handleStartChange = (date) => {
        setStartDate(date);
        setActiveStart(false);
    };
    const handleEndChange = (date) => {
        setEndDate(date);
        setActiveEnd(false);
    };
    const formatDate = (date) => date ? date.toLocaleDateString('ru-RU') : '';
    return (_jsxs("div", { className: css.dates_container, children: [_jsxs("div", { className: css.date_cell, children: [_jsxs("button", { className: `${css.date} ${activeStart ? css.active : ''}`, onClick: toggleStart, children: [_jsx("span", { className: css.text, children: formatDate(startDate) || 'Дата начала' }), _jsx("img", { className: css.arrow, src: 'images/triangle.svg' })] }), activeStart && (_jsx("div", { className: css.datepicker_wrapper, children: _jsx(DatePicker, { selected: startDate, onChange: handleStartChange, dateFormat: "dd.MM.yyyy", inline: true }) }))] }), _jsxs("div", { className: css.date_cell, children: [_jsxs("button", { className: `${css.date} ${activeEnd ? css.active : ''}`, onClick: toggleEnd, children: [_jsx("span", { className: css.text, children: formatDate(endDate) || 'Дата конца' }), _jsx("img", { className: css.arrow, src: 'images/triangle.svg' })] }), activeEnd && (_jsx("div", { className: css.datepicker_wrapper, children: _jsx(DatePicker, { selected: endDate, onChange: handleEndChange, dateFormat: "dd.MM.yyyy", inline: true }) }))] })] }));
};
export default DatePickerCustom;

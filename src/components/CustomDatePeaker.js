import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import css from '../scss/components_styles/datapeaker.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const CustomDatePeaker = ({ startDate, endDate, onChangeStartDate, onChangeEndDate }) => {
    const [active, setActive] = useState({ start: false, end: false });
    const [error, setError] = useState('');
    const convertStrToDate = (dateStr) => {
        const parts = dateStr.split('.');
        if (parts.length !== 3)
            return null;
        const [day, month, year] = parts;
        const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const date = new Date(isoString);
        return isNaN(date.getTime()) ? null : date;
    };
    const selectedStart = startDate ? convertStrToDate(startDate) : null;
    const selectedEnd = endDate ? convertStrToDate(endDate) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // чтобы сравнивать только даты
    const checkErrors = (date, type) => {
        if (!date) {
            setError('');
            return;
        }
        // Проверка: дата не должна быть в будущем
        if (date > today) {
            setError('Дата не должна быть из будущего');
            return;
        }
        // Проверка: дата начала не позже даты конца
        if (type === 'start' && selectedEnd && date > selectedEnd) {
            setError('Дата начала поиска не должна быть позже даты конца поиска');
            return;
        }
        // Проверка: дата конца не раньше даты начала
        if (type === 'end' && selectedStart && date < selectedStart) {
            setError('Дата конца не должна быть раньше даты начала');
            return;
        }
        setError('');
    };
    const handleChangeDate = (field, date) => {
        if (date) {
            checkErrors(date, field);
        }
        else {
            setError('');
        }
        const dateStr = date ? date.toLocaleDateString('ru-RU') : '';
        if (field === 'start') {
            onChangeStartDate(dateStr);
            setActive(prev => ({ ...prev, start: false }));
        }
        else {
            onChangeEndDate(dateStr);
            setActive(prev => ({ ...prev, end: false }));
        }
    };
    return (_jsxs("div", { className: css.dates_container, children: [_jsxs("div", { className: css.date_cell, children: [_jsxs("button", { className: `${css.date} ${active.start ? css.active : ''}`, onClick: () => setActive(prev => ({ ...prev, start: !prev.start })), children: [_jsx("span", { className: css.text, children: startDate || 'Дата начала' }), _jsx("img", { className: css.arrow, src: 'images/triangle.svg', alt: '\u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u0442\u0440\u0435\u043B\u043A\u0438' })] }), active.start && (_jsx("div", { className: css.datepicker_wrapper, children: _jsx(DatePicker, { selected: selectedStart, onChange: (date) => handleChangeDate('start', date), dateFormat: "dd.MM.yyyy", inline: true }) }))] }), _jsxs("div", { className: css.date_cell, children: [_jsxs("button", { className: `${css.date} ${active.end ? css.active : ''}`, onClick: () => setActive(prev => ({ ...prev, end: !prev.end })), children: [_jsx("span", { className: css.text, children: endDate || 'Дата конца' }), _jsx("img", { className: css.arrow, src: 'images/triangle.svg', alt: '\u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u0442\u0440\u0435\u043B\u043A\u0438' })] }), active.end && (_jsx("div", { className: css.datepicker_wrapper, children: _jsx(DatePicker, { selected: selectedEnd, onChange: (date) => handleChangeDate('end', date), dateFormat: "dd.MM.yyyy", inline: true }) }))] }), error && _jsx("div", { className: css.error_text, children: error })] }));
};
export default CustomDatePeaker;

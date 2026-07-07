import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import css from '../scss/components_styles/datapeaker.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const CustomDatePeaker = ({ startDate, endDate, onChangeStartDate, onChangeEndDate }) => {
    const [activeDate, setActiveDate] = useState(null);
    const [error, setError] = useState('');
    const [dateErrors, setDateErrors] = useState({
        start: false,
        end: false
    });
    const convertStrToDate = (dateStr) => {
        const parts = dateStr.split('.');
        if (parts.length !== 3)
            return null;
        const [day, month, year] = parts;
        const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const date = new Date(isoString);
        return isNaN(date.getTime()) ? null : date;
    };
    const clearTime = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    const selectedStart = startDate ? convertStrToDate(startDate) : null;
    const selectedEnd = endDate ? convertStrToDate(endDate) : null;
    const today = clearTime(new Date());
    today.setHours(0, 0, 0, 0);
    const checkErrors = (date, type) => {
        let startError = false;
        let endError = false;
        let message = '';
        const newStart = type === 'start' ? date : selectedStart;
        const newEnd = type === 'end' ? date : selectedEnd;
        if (!newStart || !newEnd) {
            if (!newStart)
                startError = true;
            if (!newEnd)
                endError = true;
            message = 'Введите корректные данные';
        }
        else if (newStart > newEnd) {
            startError = true;
            message = 'Дата начала не может быть позже даты конца';
        }
        else if (newEnd < newStart) {
            endError = true;
            message = 'Дата конца не может быть раньше даты начала';
        }
        else if (clearTime(newEnd) > today) {
            endError = true;
            message = 'Дата конца не может быть больше текущей даты';
        }
        setDateErrors({
            start: startError,
            end: endError
        });
        setError(message);
    };
    const handleChangeDate = (field, date) => {
        if (date) {
            checkErrors(date, field);
        }
        else {
            setError('');
            setDateErrors({
                start: false,
                end: false
            });
        }
        const dateStr = date ? date.toLocaleDateString('ru-RU') : '';
        if (field === 'start') {
            onChangeStartDate(dateStr);
        }
        else {
            onChangeEndDate(dateStr);
        }
        setActiveDate(null);
    };
    return (_jsxs("div", { className: css.dates_container, children: [_jsxs("div", { className: css.date_cell_container, children: [_jsxs("div", { className: css.date_cell, children: [_jsxs("button", { className: `
							${css.date}
							${activeDate === 'start' ? css.active : ''}
							${dateErrors.start ? css.error : ''}
						`, onClick: () => setActiveDate(activeDate === 'start' ? null : 'start'), children: [_jsx("span", { className: css.text, children: startDate || 'Дата начала' }), _jsx("img", { className: css.arrow, src: 'images/triangle.svg', alt: '\u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u0442\u0440\u0435\u043B\u043A\u0438' })] }), activeDate === 'start' && (_jsx("div", { className: css.datepicker_wrapper, children: _jsx(DatePicker, { selected: selectedStart, onChange: (date) => handleChangeDate('start', date), dateFormat: "dd.MM.yyyy", inline: true }) }))] }), _jsxs("div", { className: css.date_cell, children: [_jsxs("button", { className: `
							${css.date}
							${activeDate === 'end' ? css.active : ''}
							${dateErrors.end ? css.error : ''}
						`, onClick: () => setActiveDate(activeDate === 'end' ? null : 'end'), children: [_jsx("span", { className: css.text, children: endDate || 'Дата конца' }), _jsx("img", { className: css.arrow, src: 'images/triangle.svg', alt: '\u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u0442\u0440\u0435\u043B\u043A\u0438' })] }), activeDate === 'end' && (_jsx("div", { className: css.datepicker_wrapper, children: _jsx(DatePicker, { selected: selectedEnd, onChange: (date) => handleChangeDate('end', date), dateFormat: "dd.MM.yyyy", inline: true }) }))] })] }), error && _jsx("div", { className: css.error_text, children: error })] }));
};
export default CustomDatePeaker;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import css from '../scss/components_styles/datepicker.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const clearTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
const convertStrToDate = (dateStr) => {
    const parts = dateStr.split('.');
    if (parts.length !== 3)
        return null;
    const [day, month, year] = parts;
    const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? null : date;
};
const CustomDatePicker = ({ startDate, endDate, onChangeStartDate, onChangeEndDate, onErrorChange, }) => {
    const [activeDate, setActiveDate] = useState(null);
    const [dateValidation, setDateValidation] = useState({
        start: {
            error: false,
            message: '',
            touched: false,
        },
        end: {
            error: false,
            message: '',
            touched: false,
        },
    });
    const selectedStart = startDate ? convertStrToDate(startDate) : null;
    const selectedEnd = endDate ? convertStrToDate(endDate) : null;
    const today = useMemo(() => {
        const date = clearTime(new Date());
        date.setHours(0, 0, 0, 0);
        return date;
    }, []);
    useEffect(() => {
        const start = {
            error: false,
            message: '',
        };
        const end = {
            error: false,
            message: '',
        };
        if (dateValidation.start.touched && !selectedStart) {
            start.error = true;
            start.message = 'Введите корректные данные';
        }
        if (dateValidation.end.touched && !selectedEnd) {
            end.error = true;
            end.message = 'Введите корректные данные';
        }
        if (selectedStart && clearTime(selectedStart) > today) {
            start.error = true;
            start.message = 'Дата начала не может быть больше текущей даты';
        }
        if (selectedEnd && clearTime(selectedEnd) > today) {
            end.error = true;
            end.message = 'Дата конца не может быть больше текущей даты';
        }
        if (selectedStart && selectedEnd) {
            if (selectedStart > selectedEnd) {
                start.error = true;
                start.message = 'Дата начала не может быть позже даты конца';
            }
            if (selectedEnd < selectedStart) {
                end.error = true;
                end.message = 'Дата конца не может быть раньше даты начала';
            }
        }
        setDateValidation((prev) => ({
            start: {
                ...prev.start,
                error: start.error,
                message: start.message,
            },
            end: {
                ...prev.end,
                error: end.error,
                message: end.message,
            },
        }));
        onErrorChange(start.error || end.error);
    }, [
        startDate,
        endDate,
        dateValidation.start.touched,
        dateValidation.end.touched,
        selectedStart,
        selectedEnd,
        today,
        onErrorChange,
    ]);
    const handleChangeDate = (field, date) => {
        setDateValidation((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                touched: true,
            },
        }));
        const dateStr = date ? date.toLocaleDateString('ru-RU') : '';
        if (field === 'start') {
            onChangeStartDate(dateStr);
        }
        else {
            onChangeEndDate(dateStr);
        }
        setActiveDate(null);
    };
    return (_jsxs("div", { className: css.dates_container, children: [_jsxs("div", { className: css.date_cell_container, children: [_jsxs("div", { className: css.date_cell, children: [_jsxs("button", { type: 'button', className: `
							${css.date}
							${activeDate === 'start' ? css.active : ''}
							${dateValidation.start.error ? css.error : ''}
						`, onClick: () => setActiveDate(activeDate === 'start' ? null : 'start'), children: [_jsx("span", { className: css.text, children: startDate || 'Дата начала' }), _jsx("img", { className: css.arrow, src: "images/triangle.svg", alt: "\u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u0442\u0440\u0435\u043B\u043A\u0438" })] }), activeDate === 'start' && (_jsx("div", { className: css.datepicker_wrapper, children: _jsx(DatePicker, { selected: selectedStart, onChange: (date) => handleChangeDate('start', date), dateFormat: "dd.MM.yyyy", inline: true }) }))] }), _jsxs("div", { className: css.date_cell, children: [_jsxs("button", { type: 'button', className: `
							${css.date}
							${activeDate === 'end' ? css.active : ''}
							${dateValidation.end.error ? css.error : ''}
						`, onClick: () => setActiveDate(activeDate === 'end' ? null : 'end'), children: [_jsx("span", { className: css.text, children: endDate || 'Дата конца' }), _jsx("img", { className: css.arrow, src: "images/triangle.svg", alt: "\u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u0442\u0440\u0435\u043B\u043A\u0438" })] }), activeDate === 'end' && (_jsx("div", { className: css.datepicker_wrapper, children: _jsx(DatePicker, { selected: selectedEnd, onChange: (date) => handleChangeDate('end', date), dateFormat: "dd.MM.yyyy", inline: true }) }))] })] }), dateValidation.start.touched && dateValidation.start.message && (_jsx("div", { className: css.error_text, children: dateValidation.start.message })), dateValidation.end.touched && dateValidation.end.message && (_jsx("div", { className: css.error_text, children: dateValidation.end.message }))] }));
};
export default CustomDatePicker;

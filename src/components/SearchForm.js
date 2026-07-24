import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import css from '../scss/components_styles/searching.module.scss';
import Checkbox from './Checkbox';
import CustomDatePicker from './CustomDatePicker';
import { useDispatch } from 'react-redux';
import { runSearch } from '../features/search/searchService';
import { formatInn, validateField } from '../utils/searchUtils';
import { dataInit, errorsInit } from '../constants/searchFormConstants';
const SearchForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(dataInit);
    const [errors, setErrors] = useState(errorsInit);
    const [dateError, setDateError] = useState(false);
    const isFormValid = useMemo(() => {
        return (data.inn !== '' &&
            data.tone !== '' &&
            data.documentCount !== '' &&
            data.dateStart !== '' &&
            data.dateEnd !== '' &&
            Object.values(errors).every((error) => !error) &&
            !dateError);
    }, [data, errors, dateError]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'inn') {
            const formattedInn = formatInn(value);
            setData((prev) => ({ ...prev, inn: formattedInn }));
            const isValid = /^\d{2} \d{3} \d{3} \d{2}$/.test(formattedInn);
            setErrors((prev) => ({ ...prev, inn: !isValid }));
        }
        else {
            const isValid = validateField(name, value);
            if (name === 'documentCount' && !isValid) {
                setData((prev) => ({
                    ...prev,
                    documentCount: '',
                }));
                setErrors((prev) => ({
                    ...prev,
                    documentCount: true,
                }));
                return;
            }
            setData((prev) => ({
                ...prev,
                [name]: value,
            }));
            setErrors((prev) => ({
                ...prev,
                [name]: !isValid,
            }));
        }
    };
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const isValid = validateField(name, value);
        if (name === 'documentCount' && !isValid) {
            setData((prev) => ({
                ...prev,
                documentCount: '',
            }));
            setErrors((prev) => ({
                ...prev,
                documentCount: true,
            }));
        }
    };
    const validateForm = () => ({
        inn: !validateField('inn', data.inn),
        tone: !validateField('tone', data.tone),
        documentCount: !validateField('documentCount', data.documentCount),
        dateStart: !validateField('dateStart', data.dateStart),
        dateEnd: !validateField('dateEnd', data.dateEnd),
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
        if (Object.values(newErrors).every((err) => err === false)) {
            try {
                await runSearch(dispatch, data);
            }
            catch (error) {
                console.log('Ошибка поиска:', error);
            }
        }
    };
    return (_jsxs("form", { className: css.form_container, onSubmit: handleSubmit, children: [_jsxs("div", { className: css.form_grafs, children: [_jsxs("div", { className: css.form_field, children: [_jsxs("label", { children: ["\u0418\u041D\u041D \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 ", _jsx("span", { className: errors.inn ? css.error_label : '', children: "*" })] }), _jsx("input", { className: `${errors.inn ? css.error : ''}`, type: "text", name: "inn", placeholder: "XX XXX XXX XX", value: data.inn, onChange: handleChange, required: true }), errors.inn && _jsx("div", { className: css.error_text, children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" })] }), _jsxs("div", { className: css.form_field, children: [_jsx("label", { children: "\u0422\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C" }), _jsxs("select", { name: "tone", value: data.tone, onChange: handleChange, required: true, children: [_jsx("option", { value: "\u041B\u044E\u0431\u0430\u044F", children: "\u041B\u044E\u0431\u0430\u044F" }), _jsx("option", { value: "\u041F\u043E\u0437\u0438\u0442\u0438\u0432\u043D\u0430\u044F", children: "\u041F\u043E\u0437\u0438\u0442\u0438\u0432\u043D\u0430\u044F" }), _jsx("option", { value: "\u041D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u0430\u044F", children: "\u041D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u0430\u044F" })] })] }), _jsxs("div", { className: css.form_field, children: [_jsxs("label", { children: ["\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0432 \u0432\u044B\u0434\u0430\u0447\u0435", ' ', _jsx("span", { className: errors.documentCount ? css.error_label : '', children: "*" })] }), _jsx("input", { className: `${errors.documentCount ? css.error : ''}`, type: "text", name: "documentCount", placeholder: "\u041E\u0442 1 \u0434\u043E 1000", value: data.documentCount, onChange: handleChange, onBlur: handleBlur, required: true }), errors.documentCount && _jsx("div", { className: css.error_text, children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" })] }), _jsxs("div", { className: css.form_field, children: [_jsxs("label", { children: ["\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u043F\u043E\u0438\u0441\u043A\u0430 ", _jsx("span", { className: dateError ? css.error_label : '', children: " *" })] }), _jsx("div", { style: { display: 'flex', gap: '10px' }, children: _jsx(CustomDatePicker, { startDate: data.dateStart, endDate: data.dateEnd, onChangeStartDate: (dateStr) => {
                                        setData((prev) => ({
                                            ...prev,
                                            dateStart: dateStr,
                                        }));
                                        setErrors((prev) => ({
                                            ...prev,
                                            dateStart: !validateField('dateStart', dateStr),
                                        }));
                                    }, onChangeEndDate: (dateStr) => {
                                        setData((prev) => ({
                                            ...prev,
                                            dateEnd: dateStr,
                                        }));
                                        setErrors((prev) => ({
                                            ...prev,
                                            dateEnd: !validateField('dateEnd', dateStr),
                                        }));
                                    }, onErrorChange: setDateError }) })] })] }), _jsxs("div", { className: css.check_and_submit_container, children: [_jsx(Checkbox, {}), _jsx("button", { type: "submit", className: `${css.submit_button} ${isFormValid ? css.active_btn : ''}`, disabled: !isFormValid, children: "\u041F\u043E\u0438\u0441\u043A" }), _jsx("p", { className: css.note, children: "* \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E \u043F\u043E\u043B\u044F" })] })] }));
};
export default SearchForm;

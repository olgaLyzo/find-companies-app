import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import css from '../scss/searching.module.scss';
import Checkbox from './Checkbox';
import CustomDatePicker from './CustomDatePeaker';
const SearchForm = () => {
    const [data, setData] = useState({
        inn: '',
        tone: 'Любая',
        documentCount: '',
        dateStart: '',
        dateEnd: '',
    });
    const [errors, setErrors] = useState({
        inn: false,
        tone: false,
        documentCount: false,
        dateStart: false,
        dateEnd: false,
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const validateField = (name, value) => {
        switch (name) {
            case 'inn':
                return /^\d{10}$/.test(value);
            case 'tone':
                return value !== '';
            case 'documentCount':
                const num = Number(value);
                return /^\d*$/.test(value) && num >= 1 && num <= 1000;
            case 'dateStart':
            case 'dateEnd':
                return value.trim() !== '';
            default:
                return true;
        }
    };
    useEffect(() => {
        // console.log('data:', data)
        // console.log('errors:',errors)
        const allFilled = Object.values(data).every(v => v.trim() !== '');
        const allErrorsOK = Object.values(errors).every(err => err === false);
        const newValid = allFilled && allErrorsOK;
        setIsFormValid(newValid);
        console.log('isFormValid:', isFormValid);
    }, [data, errors]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        const isValid = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: !isValid }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = Object.fromEntries(Object.entries(data).map(([name, value]) => [
            name,
            !validateField(name, value),
        ]));
        setErrors(newErrors);
        const isValidForm = Object.values(newErrors).every((err) => !err) &&
            Object.values(data).every((value) => value.trim() !== '');
        if (isValidForm) {
            setIsFormValid(true);
        }
    };
    return (_jsxs("form", { className: css.form_container, onSubmit: handleSubmit, children: [_jsxs("div", { className: css.form_field, children: [_jsx("label", { children: "\u0418\u041D\u041D \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 *" }), _jsx("input", { className: `${errors.inn ? css.error : ''}`, type: "text", name: "inn", placeholder: "10 \u0446\u0438\u0444\u0440", value: data.inn, onChange: handleChange, required: true }), errors.inn && (_jsx("div", { className: css.error_text, children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" })), _jsx("label", { children: "\u0422\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C" }), _jsxs("select", { name: "tone", value: data.tone, onChange: handleChange, required: true, children: [_jsx("option", { value: "\u041B\u044E\u0431\u0430\u044F", children: "\u041B\u044E\u0431\u0430\u044F" }), _jsx("option", { value: "\u041F\u043E\u0437\u0438\u0442\u0438\u0432\u043D\u0430\u044F", children: "\u041F\u043E\u0437\u0438\u0442\u0438\u0432\u043D\u0430\u044F" }), _jsx("option", { value: "\u041D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u0430\u044F", children: "\u041D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u0430\u044F" })] }), _jsx("label", { children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0432 \u0432\u044B\u0434\u0430\u0447\u0435 *" }), _jsx("input", { className: `${errors.documentCount ? css.error : ''}`, type: "text", name: "documentCount", placeholder: "\u041E\u0442 1 \u0434\u043E 1000", value: data.documentCount, onChange: handleChange, required: true }), errors.documentCount && (_jsx("div", { className: css.error_text, children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" })), _jsx("label", { children: "\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u043F\u043E\u0438\u0441\u043A\u0430 *" }), _jsx(CustomDatePicker, {}), errors.dateEnd || errors.dateStart && (_jsx("div", { className: css.error_text, children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" }))] }), _jsxs("div", { className: css.check_and_submit_container, children: [_jsx(Checkbox, {}), _jsx("button", { type: "submit", className: `${css.submit_button} ${isFormValid
                            ? css.active_btn
                            : ''}`, children: "\u041F\u043E\u0438\u0441\u043A " }), _jsx("p", { className: css.note, children: "* \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E \u043F\u043E\u043B\u044F" })] })] }));
};
export default SearchForm;

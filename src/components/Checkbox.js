import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import css from '../scss/components_styles/searching.module.scss';
export const checkStates = [
    { key: 'maxFullness', label: 'Признак максимальной полноты' },
    { key: 'businessMention', label: 'Упоминания в бизнес-контексте' },
    { key: 'mainRole', label: 'Главная роль в публикации' },
    { key: 'includeCalendars', label: 'Включать анонсы и календари' },
    { key: 'includeSummaries', label: 'Включать сводки новостей' }
];
const Checkbox = () => {
    const [checks, setChecks] = useState({
        maxFullness: false,
        businessMention: false,
        mainRole: false,
        includeCalendars: false,
        includeSummaries: false,
    });
    const toggleCheck = (name) => {
        setChecks(prev => ({ ...prev, [name]: !prev[name] }));
    };
    return (_jsx("div", { className: css.checkbox_group, children: checkStates.map((item, index) => (_jsxs("label", { className: css.checkbox, htmlFor: `${index}`, children: [_jsx("input", { type: "checkbox", id: `${index}`, checked: checks[item.key], onChange: () => toggleCheck(item.key) }), _jsx("span", { className: css.checkmark }), item.label] }, index))) }));
};
export default Checkbox;

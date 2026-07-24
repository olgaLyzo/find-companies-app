import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import css from '../scss/components_styles/searching.module.scss';
import { checkStates } from '../constants/checkStates';
const Checkbox = () => {
    const [checks, setChecks] = useState({
        maxFullness: false,
        businessMention: false,
        mainRole: false,
        includeCalendars: false,
        includeSummaries: false,
    });
    const toggleCheck = (name) => {
        setChecks((prev) => ({ ...prev, [name]: !prev[name] }));
    };
    return (_jsx("div", { className: css.checkbox_group, children: checkStates.map((item) => (_jsxs("label", { className: css.checkbox, htmlFor: item.key, children: [_jsx("input", { type: "checkbox", id: item.key, checked: checks[item.key], onChange: () => toggleCheck(item.key) }), _jsx("span", { className: css.checkmark }), item.label] }, item.key))) }));
};
export default Checkbox;

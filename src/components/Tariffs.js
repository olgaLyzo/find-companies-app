import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import css from '../scss/components_styles/main.module.scss';
import Card from './Card';
import { tariffRequest } from './tariffRequest';
import { useAuth } from '../context/useAuth';
const Tariffs = () => {
    const { isAuthenticated } = useAuth();
    const [activeCard, setActiveCard] = useState(isAuthenticated ? tariffRequest[0].title : null);
    useEffect(() => {
        if (isAuthenticated) {
            setActiveCard(tariffRequest[0].title);
        }
        else {
            setActiveCard(null);
        }
    }, [isAuthenticated]);
    return (_jsxs("div", { id: "tariffs", className: css.tarifs_block, children: [_jsx("h2", { className: css.title, children: "\u041D\u0430\u0448\u0438 \u0442\u0430\u0440\u0438\u0444\u044B" }), _jsx("div", { className: css.cards_container, children: tariffRequest.map((tariff, index) => (_jsx(Card, { activeCard: activeCard, setActiveCard: setActiveCard, currentTariff: isAuthenticated && activeCard === tariff.title, ...tariff }, index))) })] }));
};
export default Tariffs;

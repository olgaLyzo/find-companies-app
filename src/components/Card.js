import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/card.module.scss';
const Card = ({ title, client, iconUrl, price, previousPrice, description, tarif, services }) => {
    // console.log("1",tarifs)
    return (_jsxs("div", { className: css.card, children: [_jsxs("div", { className: css.card_header, children: [_jsxs("div", { className: css.card_title, children: [_jsx("h2", { children: title }), _jsx("img", { src: iconUrl, alt: '' })] }), _jsx("p", { children: client })] }), _jsxs("div", { className: css.card_content, children: [_jsxs("div", { className: css.price, children: [_jsxs("span", { className: css.actual_price, children: [price.toLocaleString('ru-RU'), " \u20BD"] }), _jsxs("span", { className: css.previous_price, children: [previousPrice.toLocaleString('ru-RU'), " \u20BD"] })] }), _jsx("p", { children: description }), _jsx("h3", { children: tarif }), _jsx("ul", { className: css.conditions, children: services.map((elem, index) => (_jsx("li", { children: elem }, index))) }), _jsx("button", { className: css.go_to_account_btn, children: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442" })] })] }));
};
export default Card;

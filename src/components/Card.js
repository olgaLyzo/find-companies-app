import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import css from "../scss/card.module.scss";
const Card = ({ title, client, iconUrl, price, previousPrice, description, tarif, services, }) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(true);
    };
    return (_jsxs("div", { className: `${css.card} 
				 ${isHovered && title === "Beginner"
            ? css.beginer
            : isHovered && title === "Pro"
                ? css.pro
                : isHovered && title === "Business"
                    ? css.business
                    : ""}`, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [_jsxs("div", { className: `${css.card_header} ${title === "Pro"
                    ? css.pro
                    : title === "Business"
                        ? css.business
                        : css.beginer}`, children: [_jsxs("div", { className: css.card_title, children: [_jsx("h2", { children: title }), _jsx("img", { src: iconUrl, alt: "" })] }), _jsx("p", { className: css.client, children: client })] }), _jsxs("div", { className: css.card_content, children: [_jsxs("div", { className: css.price, children: [_jsxs("span", { className: css.actual_price, children: [price.toLocaleString("ru-RU"), " \u20BD"] }), _jsxs("span", { className: css.previous_price, children: [previousPrice.toLocaleString("ru-RU"), " \u20BD"] })] }), _jsx("p", { children: description }), _jsx("h3", { children: tarif }), _jsx("ul", { className: css.conditions, children: services.map((elem, index) => (_jsx("li", { children: elem }, index))) }), _jsx("button", { className: `${css.go_to_account_btn} ${clicked ? css.go_to_account_btn : css.get_info_btn}`, onClick: handleClick, children: clicked ? 'Перейти в личный кабинет' : 'Подробнее' })] })] }));
};
export default Card;

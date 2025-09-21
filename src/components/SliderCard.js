import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/slider.module.scss';
const SliderCard = ({ image, info }) => {
    return (_jsxs("div", { className: css.slider_card, children: [_jsx("img", { src: image, alt: 'icon' }), _jsx("p", { children: info })] }));
};
export default SliderCard;

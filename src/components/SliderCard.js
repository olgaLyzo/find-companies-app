import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/components_styles/slider.module.scss';
import { sliderInfo } from './sliderCardResponse';
const SliderCard = ({ currentIndex, isMobile }) => {
    if (isMobile) {
        const elem = sliderInfo[currentIndex];
        return (_jsxs("div", { className: css.slider_card, children: [_jsx("img", { src: elem.image, alt: "icon" }), _jsx("p", { children: elem.info })] }));
    }
    else {
        const indices = [
            (currentIndex - 1 + sliderInfo.length) % sliderInfo.length,
            currentIndex,
            (currentIndex + 1) % sliderInfo.length,
        ];
        return indices.map((i) => {
            const elem = sliderInfo[i];
            return (_jsxs("div", { className: css.slider_card, children: [_jsx("img", { src: elem.image, alt: "icon" }), _jsx("p", { children: elem.info })] }, i));
        });
    }
};
export default SliderCard;

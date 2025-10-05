import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import css from '../scss/slider.module.scss';
import SliderCard from './SliderCard';
import { sliderInfo } from './sliderCardResponse';
const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? sliderInfo.length - 1 : prev - 1));
    };
    const handleNext = () => {
        setCurrentIndex(prev => (prev === sliderInfo.length - 1 ? 0 : prev + 1));
    };
    return (_jsxs("div", { className: css.slider_container, children: [_jsx("div", { className: css.back_arrow, onClick: handlePrev }), _jsx(SliderCard, { ...sliderInfo[currentIndex] }), _jsx("div", { className: css.forward_arrow, onClick: handleNext })] }));
};
export default Slider;

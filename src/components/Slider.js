import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import css from '../scss/components_styles/slider.module.scss';
import SliderCard from './SliderCard';
import { sliderInfo } from './sliderCardResponse';
const Slider = () => {
    const length = sliderInfo.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
    const handleResize = () => {
        setIsMobile(window.innerWidth < 769);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + length) % length);
    };
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % length);
    };
    const getCards = () => {
        const cards = [];
        for (let i = 0; i < (isMobile ? 1 : 3); i++) {
            const index = (currentIndex + i) % length;
            cards.push(sliderInfo[index]);
        }
        return cards;
    };
    return (_jsxs("div", { className: css.slider_wrapper, children: [_jsx("div", { className: css.back_arrow, onClick: handlePrev }), _jsx(SliderCard, { currentIndex: currentIndex, isMobile: isMobile }), _jsx("div", { className: css.forward_arrow, onClick: handleNext })] }));
};
export default Slider;

import { jsx as _jsx } from "react/jsx-runtime";
import css from '../scss/slider.module.scss';
import SliderCard from './SliderCard';
import { sliderInfo } from './sliderCardResponse';
const Slider = ({ sliderCardComponent }) => {
    return (_jsx("div", { className: css.slider, children: sliderInfo.map((card, index) => {
            return (_jsx("div", { className: css.slider_container, children: _jsx(SliderCard, { ...card }, index) }));
        }) }));
};
export default Slider;

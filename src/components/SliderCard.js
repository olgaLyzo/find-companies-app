import { jsx as _jsx } from "react/jsx-runtime";
import { Slide } from 'react-slideshow-image';
const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
};
const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
};
const slideImages = [
    {
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 1'
    },
    {
        url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
        caption: 'Slide 2'
    },
    {
        url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 3'
    },
];
const SliderCard = () => {
    return (_jsx("div", { className: "slide-container", children: _jsx(Slide, { children: slideImages.map((slideImage, index) => (_jsx("div", { children: _jsx("div", { style: { ...divStyle, 'backgroundImage': `url(${slideImage.url})` }, children: _jsx("span", { style: spanStyle, children: slideImage.caption }) }) }, index))) }) }));
};
export default SliderCard;

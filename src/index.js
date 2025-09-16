import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Header from './components/Header';
import BurgerMenu from './components/BurgerMenu';
import MainBlock from './components/MainBlock';
import Card from './components/Card';
import Statistic from './components/Statistic';
import Image from './components/Image';
// import SliderCard from './components/SliderCard';
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(_jsx(StrictMode, { children: _jsx(App, { headerComponent: _jsx(Header, { burgerMenuComponent: BurgerMenu, statisticComponent: Statistic }), mainComponent: _jsx(MainBlock, { "\u0441ardComponent": Card, imageComponent: Image }) }) }));
}

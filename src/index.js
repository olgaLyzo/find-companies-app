import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Header from './components/Header';
import MainBlock from './components/MainBlock';
import Footer from './components/Footer';
import AuthorisationPage from './components/AuthorisationPage';
import PageSearching from './components/PageSearching';
import ArticlesPage from './components/ArticlesPage';
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(_jsx(StrictMode, { children: _jsx(App, { headerComponent: _jsx(Header, {}), authorisationComponent: _jsx(AuthorisationPage, {}), mainComponent: _jsx(MainBlock, {}), pageSearchingComponent: _jsx(PageSearching, {}), articlesPageComponent: _jsx(ArticlesPage, {}), footerComponent: _jsx(Footer, {}) }) }));
}

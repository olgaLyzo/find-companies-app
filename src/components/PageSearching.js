import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/components_styles/searching.module.scss';
import SearchForm from './SearchForm';
const PageSearching = () => {
    return (_jsxs("div", { className: css.search_container, children: [_jsx("h1", { children: "\u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0432 \u043F\u0430\u0440\u0443 \u043A\u043B\u0438\u043A\u043E\u0432." }), _jsxs("div", { className: css.description, children: [_jsx("p", { children: "\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430. \u0427\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435, \u0442\u0435\u043C \u0442\u043E\u0447\u043D\u0435\u0435 \u043F\u043E\u0438\u0441\u043A" }), _jsx("img", { className: css.page, src: "images/page.svg", alt: "page" }), _jsx("img", { className: css.folders, src: "images/folders.svg", alt: "folders" })] }), _jsxs("div", { className: css.search_block, children: [_jsx(SearchForm, {}), _jsx("img", { src: "images/man-with-rocket.svg", alt: "main-in-searching" })] })] }));
};
export default PageSearching;

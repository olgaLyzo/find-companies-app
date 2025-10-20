import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import css from '../scss/articles_page.module.scss';
import ArticleCards from './ArticleCards';
import StatSlider from './StatSlider';
const ArticlesPage = () => {
    const [numOfVariants, setNumOfVariants] = useState(4221);
    const displayNumber = numOfVariants.toLocaleString('ru-RU');
    return (_jsxs("div", { className: css.articles_container, children: [_jsx("h1", { children: "\u0418\u0449\u0435\u043C. \u0421\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0443\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B" }), _jsx("p", { children: "\u041F\u043E\u0438\u0441\u043A \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u043D\u044F\u0442\u044C \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0432\u0440\u0435\u043C\u044F, \u043F\u0440\u043E\u0441\u0438\u043C \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u0442\u0435\u0440\u043F\u0435\u043D\u0438\u0435." }), _jsx("img", { src: "images/find_info_icon.svg", alt: "find_info_icon" }), _jsxs("div", { className: css.main_stat_block, children: [_jsx("h1", { children: "\u041E\u0431\u0449\u0430\u044F \u0441\u0432\u043E\u0434\u043A\u0430" }), _jsxs("p", { children: ["\u041D\u0430\u0439\u0434\u0435\u043D\u043E ", displayNumber, " \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432"] }), _jsx(StatSlider, {})] }), _jsxs("div", { className: css.articles_block, children: [_jsx("h2", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432" }), _jsx(ArticleCards, {})] }), _jsx("h2", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432" })] }));
};
export default ArticlesPage;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/components_styles/article_card.module.scss';
const ArticleCards = ({ articles }) => {
    return (_jsx("div", { className: css.card_container, children: articles.map((elem, index) => (_jsxs("div", { className: css.card, children: [_jsxs("div", { className: css.info_block, children: [_jsx("div", { className: css.date, children: elem.date }), _jsx("a", { className: css.source, href: '#', children: elem.source })] }), _jsx("h1", { className: css.title, children: elem.title }), _jsx("span", { className: css.tag, children: elem.tag }), _jsx("img", { src: elem.img, alt: elem.title }), _jsx("p", { className: css.description, children: elem.description }), _jsxs("div", { className: css.get_info_block, children: [_jsx("a", { className: css.get_info_btn, href: elem.url, target: "_blank", rel: "noopener noreferrer", children: elem.button }), _jsx("span", { className: css.stat, children: elem.stat })] })] }, index))) }));
};
export default ArticleCards;

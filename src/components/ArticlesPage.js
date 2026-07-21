import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import css from '../scss/components_styles/articles_page.module.scss';
import ArticleCards from './ArticleCards';
import StatSlider from './StatSlider';
import { useSelector } from 'react-redux';
const ArticlesPage = ({ searchStage }) => {
    // const [ numOfVariants, setNumOfVariants ] = useState(4221);
    // const displayNumber = numOfVariants.toLocaleString('ru-RU');
    const [visibleCount, setVisibleCount] = useState(3);
    const documents = useSelector((state) => state.search.documents);
    console.log('documents from redux:', documents);
    console.log('current stage:', searchStage);
    const formattedArticles = documents
        .filter((doc) => doc.ok)
        .map((doc) => ({
        date: new Date(doc.ok.issueDate)
            .toLocaleDateString('ru-RU'),
        source: doc.ok.source.name,
        title: doc.ok.title.text,
        tag: 'Технические новости',
        img: '../../public/images/skillfactory_article.svg',
        description: doc.ok.content.markup
            .replace(/<[^>]*>/g, '')
            .replace(/&lt;/g, '')
            .replace(/&gt;/g, '')
            .slice(0, 500),
        button: 'Читать в источнике',
        stat: `${doc.ok.attributes.wordCount} слов`,
        url: doc.ok.url
    }));
    const visibleArticles = formattedArticles.slice(0, visibleCount);
    console.log('visibleCount:', visibleCount);
    console.log('formattedArticles:', formattedArticles.length);
    console.log('visibleArticles:', visibleArticles.length);
    useEffect(() => {
        setVisibleCount(3);
    }, [documents]);
    return (_jsxs("div", { className: css.articles_container, children: [searchStage === 'histogramsLoading' && (_jsxs("div", { className: css.search_block, children: [_jsxs("div", { className: css.description, children: [_jsx("h1", { children: "\u0418\u0449\u0435\u043C. \u0421\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0443\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B" }), _jsx("p", { children: "\u041F\u043E\u0438\u0441\u043A \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u043D\u044F\u0442\u044C \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0432\u0440\u0435\u043C\u044F, \u043F\u0440\u043E\u0441\u0438\u043C \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u0442\u0435\u0440\u043F\u0435\u043D\u0438\u0435." })] }), _jsx("img", { src: "images/find_info_icon.svg", alt: "find_info_icon" })] })), _jsxs("div", { className: css.main_stat_block, children: [_jsx("h1", { children: "\u041E\u0431\u0449\u0430\u044F \u0441\u0432\u043E\u0434\u043A\u0430" }), _jsx(StatSlider, { loading: searchStage === 'histogramsLoading' })] }), searchStage === 'documentsReady' && (_jsxs(_Fragment, { children: [_jsx("h2", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432" }), _jsx("div", { className: css.articles_block, children: _jsx(ArticleCards, { articles: visibleArticles }) }), visibleCount < formattedArticles.length && (
                    // <button 
                    // 	className={css.show_more_btn} 
                    // 	onClick={() => setVisibleCount(prev => prev + 3)}
                    // >
                    // 	Показать больше
                    // </button>
                    _jsx("button", { className: css.show_more_btn, onClick: () => {
                            console.log('BUTTON CLICK');
                            setVisibleCount(prev => {
                                console.log('OLD COUNT:', prev);
                                return prev + 3;
                            });
                        }, children: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435" }))] }))] }));
};
export default ArticlesPage;

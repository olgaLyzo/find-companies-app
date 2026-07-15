import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import css from '../scss/components_styles/articles_page.module.scss';
import ArticleCards from './ArticleCards';
import StatSlider from './StatSlider';
import { useSelector } from 'react-redux';
export const articles = [
    {
        date: '13.09.2021',
        source: 'Комсомольская правда KP.RU',
        title: 'Скиллфэктори - лучшая онлайн-школа для будущих айтишников',
        tag: 'Технические новости',
        img: '../../public/images/skillfactory_article.svg',
        description: 'SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран с 4 континентов, самому взрослому студенту сейчас 86 лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru, Яндексе, Ozon и других топовых компаниях. Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на трудоустройство. 80% обучения — выполнение упражнений и реальных проектов. Каждого студента поддерживают менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр помогает составить резюме, подготовиться к собеседованиям и познакомиться с IT-рекрутерами.',
        button: 'Читать в источнике',
        stat: '2 543 слова'
    },
    {
        date: '15.10.2021',
        source: 'VC.RU',
        title: 'Работа в Data Science в 2022 году: тренды, навыки и обзор специализаций',
        tag: 'Технические новости',
        img: '../../public/images/datascience_article.svg',
        description: 'Кто такой Data Scientist и чем он занимается? Data Scientist — это специалист, который работает с большими массивами данных, чтобы с их помощью решить задачи бизнеса. Простой пример использования больших данных и искусственного интеллекта — умные ленты в социальных сетях. На основе ваших просмотров и лайков алгоритм выдает рекомендации с контентом, который может быть вам интересен. Эту модель создал и обучил дата-сайентист, и скорее всего, не один.В небольших компаниях и стартапах дата-сайентист делает все: собирает и очищает данные, создает математическую модель для их анализа, тестирует ее и презентует готовое решение бизнесу.',
        button: 'Читать в источнике',
        stat: '3 233 слова'
    }
];
const ArticlesPage = () => {
    const [numOfVariants, setNumOfVariants] = useState(4221);
    const displayNumber = numOfVariants.toLocaleString('ru-RU');
    const documents = useSelector((state) => state.search.documents);
    console.log('documents from redux:', documents);
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
    return (_jsxs("div", { className: css.articles_container, children: [_jsxs("div", { className: css.search_block, children: [_jsxs("div", { className: css.description, children: [_jsx("h1", { children: "\u0418\u0449\u0435\u043C. \u0421\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0443\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B" }), _jsx("p", { children: "\u041F\u043E\u0438\u0441\u043A \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u043D\u044F\u0442\u044C \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0432\u0440\u0435\u043C\u044F, \u043F\u0440\u043E\u0441\u0438\u043C \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u0442\u0435\u0440\u043F\u0435\u043D\u0438\u0435." })] }), _jsx("img", { src: "images/find_info_icon.svg", alt: "find_info_icon" })] }), _jsxs("div", { className: css.main_stat_block, children: [_jsx("h1", { children: "\u041E\u0431\u0449\u0430\u044F \u0441\u0432\u043E\u0434\u043A\u0430" }), _jsxs("p", { children: ["\u041D\u0430\u0439\u0434\u0435\u043D\u043E ", displayNumber, " \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432"] }), _jsx(StatSlider, {})] }), _jsx("h2", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432" }), _jsx("div", { className: css.articles_block, children: _jsx(ArticleCards, { articles: formattedArticles }) }), _jsx("button", { className: css.show_more_btn, children: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435" })] }));
};
export default ArticlesPage;

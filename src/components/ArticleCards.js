import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from '../scss/article_card.module.scss';
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
const ArticleCards = () => {
    return (_jsx("div", { className: css.card, children: articles.map((elem, index) => (_jsxs("div", { className: css.card_elem, children: [_jsxs("div", { className: css.info_block, children: [_jsx("div", { className: css.date, children: elem.date }), _jsx("a", { className: css.source, href: '#', children: elem.source })] }), _jsx("h1", { className: css.title, children: elem.title }), _jsx("span", { className: css.tag, children: elem.tag }), _jsx("img", { src: elem.img, alt: elem.title }), _jsx("p", { className: css.description, children: elem.description }), _jsxs("div", { className: css.get_info_block, children: [_jsx("button", { className: css.get_info_btn, children: elem.button }), _jsx("span", { className: css.stat, children: elem.stat })] })] }, index))) }));
};
export default ArticleCards;

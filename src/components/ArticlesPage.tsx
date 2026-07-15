import { useState } from 'react';
import css from '../scss/components_styles/articles_page.module.scss';
import ArticleCards from './ArticleCards';
import StatSlider from './StatSlider';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

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
]

const ArticlesPage: React.FC = () => {
	const [ numOfVariants, setNumOfVariants ] = useState(4221);
	const displayNumber = numOfVariants.toLocaleString('ru-RU');
	const documents = useSelector(
		(state: RootState) => state.search.documents
	);
	
	console.log('documents from redux:', documents);

	const formattedArticles = documents
  .filter((doc:any) => doc.ok)
  .map((doc:any) => ({
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

	return(
		<div className={css.articles_container}>
			<div className={css.search_block}>
				<div className={css.description}>
					<h1>Ищем. Скоро будут результаты</h1>
					<p>Поиск может занять некоторое время, просим сохранять терпение.</p>
				</div>
				<img src="images/find_info_icon.svg" alt="find_info_icon" />
			</div>
			<div className={css.main_stat_block}>
				<h1>Общая сводка</h1>
				<p>Найдено {displayNumber} вариантов</p>
				<StatSlider />
			</div>
			
			<h2>Список документов</h2>
			<div className={css.articles_block}>
				<ArticleCards articles={formattedArticles}/>
			</div>
			<button className={css.show_more_btn}>Показать больше</button>
		</div>
	)
}

export default ArticlesPage;
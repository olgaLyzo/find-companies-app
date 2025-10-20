import { useState } from 'react';
import css from '../scss/articles_page.module.scss';
import ArticleCards from './ArticleCards';
import StatSlider from './StatSlider';

const ArticlesPage: React.FC = () => {
	const [ numOfVariants, setNumOfVariants ] = useState(4221);
	const displayNumber = numOfVariants.toLocaleString('ru-RU');
	return(
		<div className={css.articles_container}>
			<h1>Ищем. Скоро будут результаты</h1>
			<p>Поиск может занять некоторое время, просим сохранять терпение.</p>
			<img src="images/find_info_icon.svg" alt="find_info_icon" />
			<div className={css.main_stat_block}>
				<h1>Общая сводка</h1>
				<p>Найдено {displayNumber} вариантов</p>
				<StatSlider />
			</div>
			<div className={css.articles_block}>
				<h2>Список документов</h2>
				<ArticleCards />
			</div>
			<h2>Список документов</h2>
		</div>
	)
}

export default ArticlesPage;
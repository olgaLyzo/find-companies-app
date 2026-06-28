import { useState } from 'react';
import css from '../scss/components_styles/articles_page.module.scss';
import ArticleCards from './ArticleCards';
import StatSlider from './StatSlider';

const ArticlesPage: React.FC = () => {
	const [ numOfVariants, setNumOfVariants ] = useState(4221);
	const displayNumber = numOfVariants.toLocaleString('ru-RU');
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
				<ArticleCards />
			</div>
			<button className={css.show_more_btn}>Показать больше</button>
		</div>
	)
}

export default ArticlesPage;
import css from '../scss/components_styles/searching.module.scss';
import SearchForm from './SearchForm';

const PageSearching: React.FC = () => {
	return(
				<div className={css.search_container}>
					<h1>Найдите необходимые данные в пару кликов.</h1>
					<div className={css.description}>
						<p>Задайте параметры поиска. Чем больше заполните, тем точнее поиск</p>
						<img className={css.page} src="images/page.svg" alt="page" />
						<img className={css.folders} src="images/folders.svg" alt="folders" />
					</div>
					<div className={css.search_block}>
						<SearchForm />
						<img src="images/man-with-rocket.svg" alt="main-in-searching" />
					</div>
					
				</div>
		
	)
}

export default PageSearching;
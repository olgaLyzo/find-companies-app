import css from '../scss/components_styles/searching.module.scss';
import SearchForm from './SearchForm';
import ArticlesPage from './ArticlesPage';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const PageSearching: React.FC = () => {

	const searchStage = useSelector(
  (state: RootState) => state.search.searchStage
);

console.log('Redux stage:', searchStage);


	return(
				// <div className={css.search_container}>
				// 	<div className={css.description}>
				// 		<div className={css.main_title}>
				// 			<h1>Найдите необходимые данные в пару кликов.</h1>
				// 			<p>Задайте параметры поиска. Чем больше заполните, тем точнее поиск</p>
				// 		</div>
				// 		<div className={css.images}>
				// 			<img className={css.page_img} src="images/page.svg" alt="page" />
				// 			<img className={css.folders_img} src="images/folders.svg" alt="folders" />
				// 		</div>
				// 	</div>
				// 		{
				// 		searchStage === 'form' ? (
				// 			<div className={css.search_block}>
				// 				<SearchForm
				// 					onSearchComplete={() => setSearchStage('histogramsLoading')}
				// 				/>
				// 				<img
				// 					src="images/man-with-rocket.svg"
				// 					alt="main-in-searching"
				// 				/>
				// 			</div>
				// 		) : (
				// 			<ArticlesPage searchStage={searchStage}/>
				// 		)
				// 	}
				// </div>
		
				
  <div className={css.search_container}>

    {
  searchStage === 'form' ? (
    <>
      <div className={css.description}>
        <div className={css.main_title}>
          <h1>
            Найдите необходимые данные в пару кликов.
          </h1>
          <p>
            Задайте параметры поиска. Чем больше заполните, тем точнее поиск
          </p>
        </div>

        <div className={css.images}>
          <img
            className={css.page_img}
            src="images/page.svg"
            alt="page"
          />
          <img
            className={css.folders_img}
            src="images/folders.svg"
            alt="folders"
          />
        </div>
      </div>

      <div className={css.search_block}>
        <SearchForm />

        <img
          src="images/man-with-rocket.svg"
          alt="main-in-searching"
        />
      </div>
    </>
  ) : (
    <ArticlesPage searchStage={searchStage}/>
  )
}

  </div>
)
	
}

export default PageSearching;
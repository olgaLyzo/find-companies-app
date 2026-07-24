import { useState, useEffect } from 'react';
import css from '../scss/components_styles/articles_page.module.scss';
import ArticleCards from './ArticleCards';
import StatSlider from './StatSlider';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const ArticlesPage: React.FC = () => {
	const [visibleCount, setVisibleCount] = useState(3);
	const documents = useSelector(
		(state: RootState) => state.search.documents
	);
	const loadingDocuments = useSelector(
		(state: RootState) => state.search.loading
	);
	const histograms = useSelector(
  (state: RootState) => state.search.histograms
);
const searchStage = useSelector(
  (state: RootState) => state.search.searchStage
);
const getWordLabel = (count: number): string => {
  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return "слов";
  }

  if (lastOne === 1) {
    return "слово";
  }

  if (lastOne >= 2 && lastOne <= 4) {
    return "слова";
  }

  return "слов";
};
const formattedArticles = documents
  .filter((doc: any) => doc.ok)
  .map((doc: any, index) => {
    return {
      date: new Date(doc.ok.issueDate).toLocaleDateString('ru-RU'),
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
      stat: `${doc.ok.attributes.wordCount} ${getWordLabel(doc.ok.attributes.wordCount)}`,
      url: doc.ok.url,
    };
  });
	  const visibleArticles = formattedArticles.slice(0, visibleCount);

	useEffect(() => {
		setVisibleCount(3);
	}, [documents]);

	return(
		<div className={css.articles_container}>
				{
					(searchStage === 'histogramsLoading' || loadingDocuments) && (
						<div className={css.search_block}>
							<div className={css.description}>
								<h1>Ищем. Скоро будут результаты</h1>
								<p>
									Поиск может занять некоторое время, просим сохранять терпение.
								</p>
							</div>
							<img 
								src="images/find_info_icon.svg" 
								alt="find_info_icon" 
							/>
						</div>
					)
				}			<div className={css.main_stat_block}>
    		<h1>Общая сводка</h1>
					<StatSlider 
						loading={searchStage === 'histogramsLoading'}
						empty={searchStage === 'documentsReady' && formattedArticles.length === 0}
						histograms={histograms}
					/>
			</div>
			{
				searchStage === 'documentsReady' && (
				<>
				<h2>Список документов</h2>
				<div className={css.articles_block}>
					<ArticleCards articles={visibleArticles}/>
				</div>
				{
					visibleCount < formattedArticles.length && (
						<button 
							className={css.show_more_btn}
							onClick={() => {
								setVisibleCount(prev => {
									return prev + 3;
								});
							}}
						>
							Показать больше
						</button>
					)
				}
				</>
				)
			}
		</div>
	)
}

export default ArticlesPage;
import css from '../scss/components_styles/article_card.module.scss';
import React from 'react';
import { Article } from '../types/article';
 interface ArticleCardProps{
	articles: Article[];
 }
 
const ArticleCards: React.FC<ArticleCardProps> = ({articles}) => {
	return(
		<div className={css.card_container}>
			{
				articles.map((elem, index)=>(
					<div className={css.card} key={index}>
						<div className={css.info_block}>
							<div className={css.date}>{elem.date}</div>
							<a className={css.source} href='#'>{elem.source}</a>
						</div>
						<h1 className={css.title}>{elem.title}</h1>
						<span className={css.tag}>{elem.tag}</span>
						<img src={elem.img} alt={elem.title} />
						<p className={css.description}>{elem.description}</p>
						<div className={css.get_info_block}>
							{elem.url ? (
									<a
										className={css.get_info_btn}
										href={elem.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										{elem.button}
									</a>
								) : (
									<span className={css.get_info_btn_disabled}>
										Источник недоступен
									</span>
								)}
							<span className={css.stat}>{elem.stat}</span>
						</div>
					</div>
				))
			}
		</div>
	)
}

export default ArticleCards;
import css from '../scss/components_styles/articles_page.module.scss';

const StatSliderLoader: React.FC = () => {
	return (
		<div className={css.stat_slider_loader}>

			<div className={css.slider_periods}>
				<div>Период</div>
				<div>2021</div>
				<div>2022</div>
				<div>2023</div>
				<div>2024</div>
			</div>


			<div className={css.loader_center}>
				<div className={css.circle_loader}></div>
			</div>


			<div className={css.slider_footer}>
				<p>Количество документов</p>
				<p>Риски</p>
			</div>

		</div>
	)
}

export default StatSliderLoader;
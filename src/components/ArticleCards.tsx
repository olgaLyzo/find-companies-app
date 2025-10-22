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
]

const ArticleCards: React.FC = () => {
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
							<button className={css.get_info_btn}>{elem.button}</button>
							<span className={css.stat}>{elem.stat}</span>
						</div>
					</div>
				))
			}
		
		</div>
	)
}

export default ArticleCards;
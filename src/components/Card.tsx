import css from '../scss/card.module.scss';

export interface cardProps{
		title: string;
		client: string;
		iconUrl: string;
		price: number;
		previousPrice: number;
		description: string;
		tarif: string;
		services: string[];
		
}


const Card: React.FC<cardProps> = ({ 
	title, 
	client, 
	iconUrl, 
	price, 
	previousPrice, 
	description,
	tarif,services
}) => {
	// console.log("1",tarifs)
	return(
		<div className = {css.card}>
			<div className={css.card_header}>
				<div className={css.card_title}>
					<h2>{title}</h2>
					<img src={iconUrl} alt={''} />
				</div>
				<p>{client}</p>
			</div>
				<div className={css.card_content}>
					<div className={css.price}>
						<span className={css.actual_price}>{price.toLocaleString('ru-RU')} ₽</span>
						<span className={css.previous_price}>{previousPrice.toLocaleString('ru-RU')} ₽</span>
					</div>
					<p>{description}</p>
					<h3>{tarif}</h3>
					<ul className={css.conditions}>
						{services.map((elem, index)=>(
							<li key={index}>{elem}</li>
						))}
					</ul>
					<button className={css.go_to_account_btn}>
						Перейти в личный кабинет
					</button>
				</div>		
			</div>
	)
}

	export default Card;
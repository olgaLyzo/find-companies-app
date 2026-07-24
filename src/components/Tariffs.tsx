import { useState } from "react";
import css from "../scss/components_styles/main.module.scss";
import Card from "./Card";
import { tariffRequest } from "./tarifRequest";

const Tariffs: React.FC = () => {
	const [activeCard, setActiveCard] = useState<string | null>(null);

	return (
		<div 
			id="tariffs"
			className={css.tarifs_block}
		>
			<h2 className={css.title}>
				Наши тарифы
			</h2>

			<div className={css.cards_container}>
				{
					tariffRequest.map((tariff, index) => (
						<Card
							key={index}
							activeCard={activeCard}
							setActiveCard={setActiveCard}
							{...tariff}
						/>
					))
				}
			</div>
		</div>
	);
};

export default Tariffs;
import { useEffect, useState } from "react";
import css from "../scss/components_styles/main.module.scss";
import Card from "./Card";
import { tariffRequest } from "./tarifRequest";
import { useAuth } from "../context/AuthContext";

const Tariffs: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const [activeCard, setActiveCard] = useState<string | null>(
		isAuthenticated ? tariffRequest[0].title : null
	);
	useEffect(() => {
		if (isAuthenticated) {
			setActiveCard(tariffRequest[0].title);
		} else {
			setActiveCard(null);
		}
	}, [isAuthenticated]);
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
								currentTariff={
									isAuthenticated && activeCard === tariff.title
								}
								{...tariff}
							/>
						))
					}
				</div>
			</div>
		);
};

export default Tariffs;
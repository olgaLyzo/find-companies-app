import { useState } from "react";
import css from "../scss/components_styles/card.module.scss";
import { useAuth } from "../context/AuthContext";
export interface cardProps {
  title: string;
  client: string;
  iconUrl: string;
  price: number;
  previousPrice: number;
  description: string;
  tariff: string;
  services: string[];
	activeCard: string | null;
	setActiveCard: React.Dispatch<
    React.SetStateAction<string | null>>;
}

const Card: React.FC<cardProps> = ({
  title,
  client,
  iconUrl,
  price,
  previousPrice,
  description,
  tariff,
  services,
	activeCard,
	setActiveCard,
}) => {
	const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState<boolean>(false);

	const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
	const handleClick = ()=>{
		setActiveCard(title);
	}

	const isActive = activeCard === title;
  return (
    <div
      className={`${css.card} 
				 ${
           isHovered && title === "Beginner"
             ? css.beginer
             : isHovered && title === "Pro"
             ? css.pro
             : isHovered && title === "Business"
             ? css.business
             : ""
         }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${css.card_header} ${
          title === "Pro"
            ? css.pro
            : title === "Business"
            ? css.business
            : css.beginer
        }`}
      >
        <div className={css.card_title}>
          <h2>{title}</h2>
          <img src={iconUrl} alt={"icon"} />
        </div>
        <p className={css.client}>{client}</p>
      </div>
      <div className={css.card_content}>
				{isAuthenticated && isActive && (
					<div className={css.active_tariff}>
						Текущий тариф
					</div>
				)}
        <div className={css.price}>
          <span className={css.actual_price}>
            {price.toLocaleString("ru-RU")} ₽
          </span>
          <span className={css.previous_price}>
            {previousPrice.toLocaleString("ru-RU")} ₽
          </span>
					<p>{description}</p>
        </div>
       
				
					<h3>{tariff}</h3>
        	<ul className={css.conditions}>
						{services.map((elem, index) => (
							<li key={index}>{elem}</li>
						))}
					</ul>
				
        <button 
					className={`${css.go_to_account_btn} ${isActive 
						? css.go_to_account_btn 
						: css.get_info_btn}`} 
					onClick = {handleClick}
				>
          {isAuthenticated && isActive ? 'Перейти в личный кабинет' : 'Подробнее'}
        </button>
      </div>
    </div>
  );
};

export default Card;

import { useState } from "react";
import css from "../scss/card.module.scss";

export interface cardProps {
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
  tarif,
  services,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
	const [ clicked, setClicked ] = useState(false);
	const handleClick = ()=>{
		setClicked(true)
	}

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
          <img src={iconUrl} alt={""} />
        </div>
        <p className={css.client}>{client}</p>
      </div>
      <div className={css.card_content}>
        <div className={css.price}>
          <span className={css.actual_price}>
            {price.toLocaleString("ru-RU")} ₽
          </span>
          <span className={css.previous_price}>
            {previousPrice.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <p>{description}</p>
        <h3>{tarif}</h3>
        <ul className={css.conditions}>
          {services.map((elem, index) => (
            <li key={index}>{elem}</li>
          ))}
        </ul>
        <button 
					className={`${css.go_to_account_btn} ${clicked ? css.go_to_account_btn : css.get_info_btn}`}
					onClick = {handleClick}
					>
          {clicked ? 'Перейти в личный кабинет' : 'Подробнее'}
        </button>
      </div>
    </div>
  );
};

export default Card;

import { useState } from "react";
import css from "../scss/main.module.scss";
import Card from "./Card";
import { tarifRequest } from "./tarifRequest";
import Slider from "./Slider";
import SliderCard from "./SliderCard";
export interface MainBlockProps {
  сardComponent: React.ElementType;
	sliderComponent: React.ElementType;
}

const MainBlock: React.FC<MainBlockProps> = ({ 
	сardComponent,
	sliderComponent
}) => {

  return (
    <div className={css.main_block}>
      <h2 className={css.title}>
        Cервис по поиску публикаций о компании по его ИНН
      </h2>
      <p>
        Комплексный анализ публикаций, получение данных в формате PDF на
        электронную почту.
      </p>
      <button className={css.get_info_btn}>Запросить данные</button>
			<img className={css.image} src='images/search-service.svg'/>
			<h2 className={css.title}>
        Почему именно мы
      </h2>
			<Slider sliderCardComponent = {sliderComponent}/>
			<img className={css.image} src='images/wy-choose.svg'/>
			<h2 className={css.title}>
        Наши тарифы
      </h2>
			{
				tarifRequest.map((tarif, index)=>{
					return(
						<Card key={index} {...tarif} />
					)
				})
			}
    </div>
  );
};

export default MainBlock;

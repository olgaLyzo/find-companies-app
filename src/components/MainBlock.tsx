import css from "../scss/main.module.scss";
import Card from "./Card";
import Image from "./Image";
import { tarifRequest } from "./tarifRequest";

export interface MainBlockProps {
  сardComponent: React.ElementType;
	imageComponent: React.ElementType;
}

const MainBlock: React.FC<MainBlockProps> = ({ 
	сardComponent, 
	imageComponent, 
}) => {
	console.log(tarifRequest[0].title)
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
			<Image/>
			<h2 className={css.title}>
        Почему именно мы
      </h2>
			{
				tarifRequest.map((tarif, index)=>{
					return(
						<Card key={index} {...tarif}/>
					)
				})
			}
      
			
    </div>
  );
};

export default MainBlock;

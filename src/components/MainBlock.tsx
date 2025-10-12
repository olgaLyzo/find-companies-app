import css from "../scss/main.module.scss";
import Card from "./Card";
import { tarifRequest } from "./tarifRequest";
import Slider from "./Slider";


const MainBlock: React.FC = () => {

  return (
    <div className={css.main_block}>
			<div className={css.search_block}>
				<div className={css.descript_for_search_block}>
					<h2 className={css.title}>Cервис по поиску публикаций о компании по его ИНН</h2>
					<p>
						Комплексный анализ публикаций, получение данных в формате PDF на
						электронную почту.
					</p>
					<button className={css.get_info_btn}>Запросить данные</button>
				</div>
				<img className={css.search_spec} src='images/search-service.svg' alt='search_specialist'/>
			</div>	
      
			<div className={css.slider_block}>
				<h2 className={css.title}>Почему именно мы</h2>
				<Slider />
				<div className={css.images}>
					<img className={css.guy_on_bench} src='images/wy-choose.svg'/>
					<div className={css.drops}>
						<img className={css.big_drop} src='images/big_drop.svg'/>
						<img className={css.small_drop} src='images/small_drop.svg'/>
					</div>
				</div>
			</div>
			<div className={css.tarifs_block}>
				<h2 className={css.title}>Наши тарифы</h2>
				<div className={css.cards_container}>
					{
						tarifRequest.map((tarif, index)=>{
							return(
								
									<Card key={index} {...tarif} />
								
							)
						})
					}
				</div>
			</div>
			
    </div>
  );
};

export default MainBlock;

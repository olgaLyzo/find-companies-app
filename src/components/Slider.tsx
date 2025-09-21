import css from '../scss/slider.module.scss';
import SliderCard  from './SliderCard';
import { sliderInfo } from './sliderCardResponse';

export interface sliderProps{
	sliderCardComponent: React.ElementType;
}

const Slider: React.FC<sliderProps> = ({sliderCardComponent})=>{
	return(
		<div className = {css.slider}>
			{sliderInfo.map((card, index)=>{
				return(
					<div className={css.slider_container}>
						<SliderCard key = {index} {...card}/>
					</div>
				)
			})}
			
		</div>
	)
}
export default Slider;
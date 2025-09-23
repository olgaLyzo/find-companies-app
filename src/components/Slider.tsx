import { useState } from 'react';
import css from '../scss/slider.module.scss';
import SliderCard  from './SliderCard';
import { sliderInfo } from './sliderCardResponse';

export interface sliderProps{
	sliderCardComponent: React.ElementType;
}

const Slider: React.FC<sliderProps> = ({sliderCardComponent})=>{	
	const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? sliderInfo.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex(prev => (prev === sliderInfo.length - 1 ? 0 : prev + 1));
  };

	return(
		<div className = {css.slider_container}>
			<div className={css.back_arrow} onClick={handlePrev}></div>
			<div className="slider_card">
        
      </div>
			{
				<SliderCard {...sliderInfo[currentIndex]} />			
			}
			<div className={css.forward_arrow} onClick={handleNext}></div>

		</div>
	)
}
export default Slider;
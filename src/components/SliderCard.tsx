import css from '../scss/components_styles/slider.module.scss';
import React from 'react';
import { sliderInfo } from './sliderCardResponse';

export interface sliderCardProps{
	currentIndex: number,
	isMobile: boolean
}
const SliderCard: React.FC<sliderCardProps> = ({currentIndex, isMobile}) => {
	if (isMobile) {
    const elem = sliderInfo[currentIndex];
    return (
      <div className={css.slider_card}>
        <img src={elem.image} alt='icon' />
        <p>{elem.info}</p>
      </div>
    );
  } else {
    const indices = [
      (currentIndex - 1 + sliderInfo.length) % sliderInfo.length,
      currentIndex,
      (currentIndex + 1) % sliderInfo.length,
    ];

    return (
        indices.map((i) => {
          const elem = sliderInfo[i];
          return (
            <div className={css.slider_card} key={i}>
              <img src={elem.image} alt='icon' />
              <p>{elem.info}</p>
            </div>
          );
        })
    );
  }
};
  
	

  


export default SliderCard;

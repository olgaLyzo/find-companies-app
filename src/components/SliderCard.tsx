import css from '../scss/slider.module.scss';
import React from 'react';


export interface sliderCardProps{
	image: string;
	info: string;
}

const SliderCard:React.FC<sliderCardProps> = ({
	image,
	info
}) => {
    return (
      <div className={css.slider_card}>
        <img src={image} alt='icon'/>
				<p>{info}</p>
      </div>
    )
}

  


export default SliderCard;

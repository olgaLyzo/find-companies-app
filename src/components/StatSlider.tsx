import React, { useState } from 'react';
import css from '../scss/stat_slider.module.scss';

  export const data = [
  { period: '10.09.2021', total: 5, risks: 0 },
  { period: '13.09.2021', total: 2, risks: 0 },
  { period: '17.09.2021', total: 6, risks: 0 },
  { period: '20.09.2021', total: 8, risks: 0 },
  { period: '12.10.2021', total: 1, risks: 0 },
  { period: '15.10.2021', total: 10, risks: 2 },
	{ period: '16.10.2021', total: 4, risks: 0 },
	{ period: '17.10.2021', total: 3, risks: 0 },
	{ period: '20.09.2021', total: 8, risks: 0 },
  { period: '12.10.2021', total: 1, risks: 0 },
  { period: '15.10.2021', total: 10, risks: 2 },
	{ period: '16.10.2021', total: 4, risks: 0 },
	{ period: '17.10.2021', total: 3, risks: 0 },
];

 export const parameters = [
	'Период',
	'Всего',
	'Риски'
 ];

const StatSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const total = data.length;
	const [start, setStart] = useState(0);
	 

  const handlePrev = () => 
  setStart(prev => (prev - 1 + total) % total);
const handleNext = () => 
  setStart(prev => (prev + 1) % total);


const getVisibleData = () => {
  const result = [];
  for (let i = 0; i < 8; i++) {
    result.push(data[(start + i) % total]);
  }
  return result;
};

const visibleData = getVisibleData();

  return (
    <div className={css.wrapper}>
      <div className={css.back_arrow} onClick={handlePrev}></div>
      <div className={css.table}>
        <div className={css.main_column}>
					{
						parameters.map((param, index) => (
							<div>{param}</div>
						))
					}
        </div>
				{
					visibleData.map((elem, index) => (
						<div className={css.column_container}>
							<div className={css.column} key={index}>
								<div className={css.dataCell}>{elem.period}</div>
								<div className={css.dataCell}>{elem.total}</div>
								<div className={css.dataCell}>{elem.risks}</div>
							</div>
							<div className={css.separator}></div>
						</div>
					))
				}
      </div>
      <div className={css.forward_arrow} onClick={handleNext}></div>
    </div>
  );
};

export default StatSlider;
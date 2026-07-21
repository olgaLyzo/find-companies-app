import React, { useEffect, useState } from 'react';
import css from '../scss/components_styles/stat_slider.module.scss';

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

 interface StatSliderProps {
  loading?: boolean;
} 

const StatSlider: React.FC<StatSliderProps> = ({loading = false}) => {
  const [start, setStart] = useState(0);
  const [windowSize, setWindowSize] = useState(5); 

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize(window.innerWidth < 768 ? 1 : 5); 
    };

    window.addEventListener('resize', updateWindowSize);
    updateWindowSize();

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const total = data.length;

  const handlePrev = () => 
    setStart((prev) => (prev - windowSize + total) % total);

  const handleNext = () =>
    setStart((prev) => (prev + windowSize) % total);

  const getVisibleData = () => {
    const result = [];
    for (let i = 0; i < windowSize; i++) {
      result.push(data[(start + i) % total]);
    }
    return result;
  };
  const visibleData = getVisibleData();

  return (
    <div className={css.wrapper}>
      {!loading && (
        <div 
          className={css.back_arrow} 
          onClick={handlePrev}
        ></div>
      )}
      <div className={css.table}>
        <div className={css.main_column}>
          {parameters.map((param,index)=>(
            <div key={index}>
              {param}
            </div>
          ))}
        </div>
        {
          loading ? (
            <div className={css.loading_container}>
              <div className={css.loader}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <p>
                Загрузка данных
              </p>

            </div>

          ) : (

            visibleData.map((elem,index)=>(
              <div 
                className={css.column_container} 
                key={index}
              >

                <div className={css.column}>

                  <div className={css.dataCell}>
                    {elem.period}
                  </div>

                  <div className={css.dataCell}>
                    {elem.total}
                  </div>

                  <div className={css.dataCell}>
                    {elem.risks}
                  </div>

                </div>

                <div 
                  className={css.separator}
                  style={{display:index===4 ? 'none':'block'}}
                />

              </div>
            ))

          )
        }


      </div>


      {!loading && (
        <div 
          className={css.forward_arrow} 
          onClick={handleNext}
        ></div>
      )}

    </div>
  );
};
export default StatSlider;
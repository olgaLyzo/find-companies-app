import React, { useEffect, useState } from 'react';
import css from '../scss/components_styles/stat_slider.module.scss';
import Loader from './statLoader';

export const parameters = ['Период', 'Всего', 'Риски'];
interface StatSliderProps {
  loading?: boolean;
  empty?: boolean;
  histograms: any[];
}

const StatSlider: React.FC<StatSliderProps> = ({ loading = false, empty = false, histograms }) => {
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

  const data = React.useMemo(() => {
    const totalDocuments = histograms.find((item) => item.histogramType === 'totalDocuments');
    const riskFactors = histograms.find((item) => item.histogramType === 'riskFactors');
    if (!totalDocuments) {
      return [];
    }
    return totalDocuments.data.map((item: any, index: number) => ({
      period: new Date(item.date).toLocaleDateString('ru-RU'),
      total: item.value,
      risks: riskFactors?.data[index]?.value ?? 0,
    }));
  }, [histograms]);

  const total = data.length;
  const handlePrev = () => setStart((prev) => (prev - windowSize + total) % total);
  const handleNext = () => setStart((prev) => (prev + windowSize) % total);
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
      {!loading && <div className={css.back_arrow} onClick={handlePrev}></div>}
      <div className={css.table}>
        <div className={css.main_column}>
          {parameters.map((param, index) => (
            <div key={index}>{param}</div>
          ))}
        </div>
        {loading ? (
          <div className={css.loading_container}>
            <Loader />
          </div>
        ) : empty ? (
          <div className={css.loading_container}>
            <p className={css.empty_text}>Статей не обнаружено</p>
          </div>
        ) : (
          visibleData.map((elem, index) => (
            <div className={css.column_container} key={index}>
              <div className={css.column}>
                <div className={css.dataCell}>{elem.period}</div>
                <div className={css.dataCell}>{elem.total}</div>
                <div className={css.dataCell}>{elem.risks}</div>
              </div>
              <div className={css.separator} style={{ display: index === 4 ? 'none' : 'block' }} />
            </div>
          ))
        )}
      </div>
      {!loading && <div className={css.forward_arrow} onClick={handleNext}></div>}
    </div>
  );
};
export default StatSlider;

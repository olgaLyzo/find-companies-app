import React, { useState } from 'react';
import css from '../scss/datapeaker.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerCustom: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const [activeStart, setActiveStart] = useState(false);
  const [activeEnd, setActiveEnd] = useState(false);

  const toggleStart = () => setActiveStart(!activeStart);
  const toggleEnd = () => setActiveEnd(!activeEnd);

  const handleStartChange = (date: Date | null) => {
    setStartDate(date);
    setActiveStart(false);
  };

  const handleEndChange = (date: Date | null) => {
    setEndDate(date);
    setActiveEnd(false);
  };

  const formatDate = (date: Date | null) => 
    date ? date.toLocaleDateString('ru-RU') : '';

  return (
    <div className={css.dates_container}>
      <div className={css.date_cell}>
        <button
          className={`${css.date} ${activeStart ? css.active : ''}`}
          onClick={toggleStart}
        >
          <span className={css.text}>{formatDate(startDate) || 'Дата начала'}</span>
          <img className={css.arrow} src='images/triangle.svg'/>
        </button>
        {activeStart && (
          <div className={css.datepicker_wrapper}>
            <DatePicker
              selected={startDate}
              onChange={handleStartChange}
              dateFormat="dd.MM.yyyy"
              inline
            />
          </div>
        )}
      </div>

      <div className={css.date_cell}>
        <button
          className={`${css.date} ${activeEnd ? css.active : ''}`}
          onClick={toggleEnd}
        >
          <span className={css.text}>{formatDate(endDate) || 'Дата конца'}</span>
          <img className={css.arrow} src='images/triangle.svg'/>
        </button>
        {activeEnd && (
          <div className={css.datepicker_wrapper}>
            <DatePicker
              selected={endDate}
              onChange={handleEndChange}
              dateFormat="dd.MM.yyyy"
              inline
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePickerCustom;
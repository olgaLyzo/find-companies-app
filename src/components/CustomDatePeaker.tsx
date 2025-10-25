import React, { useState } from 'react';
import css from '../scss/datapeaker.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePeakerProps {
  startDate: string;
  endDate: string;
  onChangeStartDate: (dateStr: string) => void;
  onChangeEndDate: (dateStr: string) => void;
}

const CustomDatePeaker: React.FC<CustomDatePeakerProps> = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate
}) => {
  const [active, setActive] = useState<{ start: boolean; end: boolean }>({ start: false, end: false });
  const [error, setError] = useState<string>('');

  const convertStrToDate = (dateStr: string): Date | null => {
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? null : date;
  };

  const selectedStart = startDate ? convertStrToDate(startDate) : null;
  const selectedEnd = endDate ? convertStrToDate(endDate) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // чтобы сравнивать только даты

  const checkErrors = (date: Date | null, type: 'start' | 'end') => {
    if (!date) {
      setError('');
      return;
    }

    // Проверка: дата не должна быть в будущем
    if (date > today) {
      setError('Дата не должна быть из будущего');
      return;
    }

    // Проверка: дата начала не позже даты конца
    if (type === 'start' && selectedEnd && date > selectedEnd) {
      setError('Дата начала поиска не должна быть позже даты конца поиска');
      return;
    }

    // Проверка: дата конца не раньше даты начала
    if (type === 'end' && selectedStart && date < selectedStart) {
      setError('Дата конца не должна быть раньше даты начала');
      return;
    }

    setError('');
  };

  const handleChangeDate = (field: 'start' | 'end', date: Date | null) => {
    if (date) {
      checkErrors(date, field);
    } else {
      setError('');
    }

    const dateStr = date ? date.toLocaleDateString('ru-RU') : '';

    if (field === 'start') {
      onChangeStartDate(dateStr);
      setActive(prev => ({ ...prev, start: false }));
    } else {
      onChangeEndDate(dateStr);
      setActive(prev => ({ ...prev, end: false }));
    }
  };

  return (
    <div className={css.dates_container}>
      <div className={css.date_cell}>
        <button
          className={`${css.date} ${active.start ? css.active : ''}`}
          onClick={() => setActive(prev => ({ ...prev, start: !prev.start }))}
        >
          <span className={css.text}>{startDate || 'Дата начала'}</span>
          <img className={css.arrow} src='images/triangle.svg' alt='иконка стрелки' />
        </button>
        {active.start && (
          <div className={css.datepicker_wrapper}>
            <DatePicker
              selected={selectedStart}
              onChange={(date: Date | null) => handleChangeDate('start', date)}
              dateFormat="dd.MM.yyyy"
              inline
            />
          </div>
        )}
      </div>

      <div className={css.date_cell}>
        <button
          className={`${css.date} ${active.end ? css.active : ''}`}
          onClick={() => setActive(prev => ({ ...prev, end: !prev.end }))}
        >
          <span className={css.text}>{endDate || 'Дата конца'}</span>
          <img className={css.arrow} src='images/triangle.svg' alt='иконка стрелки' />
        </button>
        {active.end && (<div className={css.datepicker_wrapper}>
            <DatePicker
              selected={selectedEnd}
              onChange={(date: Date | null) => handleChangeDate('end', date)}
              dateFormat="dd.MM.yyyy"
              inline
            />
          </div>
        )}
      </div>
      {error && <div className={css.error_text}>{error}</div>}
    </div>
  );
};

export default CustomDatePeaker;
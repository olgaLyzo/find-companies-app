import React, { useState } from 'react';
import css from '../scss/components_styles/datapeaker.module.scss';
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
  const [activeDate, setActiveDate] = useState<'start' | 'end' | null>(null);
	const [error, setError] = useState<string>('');
	const [dateErrors, setDateErrors] = useState({
		start: false,
		end: false
	});

  const convertStrToDate = (dateStr: string): Date | null => {
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? null : date;
  };

	const clearTime = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
};
  const selectedStart = startDate ? convertStrToDate(startDate) : null;
  const selectedEnd = endDate ? convertStrToDate(endDate) : null;
  const today = clearTime(new Date());
  today.setHours(0, 0, 0, 0); 

const checkErrors = (date: Date | null, type: 'start' | 'end') => {
  let startError = false;
  let endError = false;
  let message = '';

  const newStart = type === 'start' ? date : selectedStart;
  const newEnd = type === 'end' ? date : selectedEnd;

  if (!newStart || !newEnd) {
    if (!newStart) startError = true;
    if (!newEnd) endError = true;

    message = 'Введите корректные данные';
  }

  else if (newStart > newEnd) {
    startError = true;
    message = 'Дата начала не может быть позже даты конца';
  }

  else if (newEnd < newStart) {
    endError = true;
    message = 'Дата конца не может быть раньше даты начала';
  }

	else if (clearTime(newEnd) > today) {
		endError = true;
		message = 'Дата конца не может быть больше текущей даты';
	}
	
  setDateErrors({
    start: startError,
    end: endError
  });

  setError(message);
};

	const handleChangeDate = (field: 'start' | 'end', date: Date | null) => {
  if (date) {
    checkErrors(date, field);
  } else {
		setError('');
		setDateErrors({
			start: false,
			end: false
		});
  }

  const dateStr = date ? date.toLocaleDateString('ru-RU') : '';

  if (field === 'start') {
    onChangeStartDate(dateStr);
  } else {
    onChangeEndDate(dateStr);
  }

  setActiveDate(null);
};

  return (
    <div className={css.dates_container}>
			<div className={css.date_cell_container}>
				<div className={css.date_cell}>
					<button
						className={`
							${css.date}
							${activeDate === 'start' ? css.active : ''}
							${dateErrors.start ? css.error : ''}
						`}
						onClick={() => setActiveDate(activeDate === 'start' ? null : 'start')}
					>
						<span className={css.text}>{startDate || 'Дата начала'}</span>
						<img className={css.arrow} src='images/triangle.svg' alt='иконка стрелки' />
					</button>
					{activeDate === 'start' && (
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
						className={`
							${css.date}
							${activeDate === 'end' ? css.active : ''}
							${dateErrors.end ? css.error : ''}
						`}
						onClick={() => setActiveDate(activeDate === 'end' ? null : 'end')}
					>
						<span className={css.text}>{endDate || 'Дата конца'}</span>
						<img className={css.arrow} src='images/triangle.svg' alt='иконка стрелки' />
					</button>
					{activeDate === 'end' && (<div className={css.datepicker_wrapper}>
							<DatePicker
								selected={selectedEnd}
								onChange={(date: Date | null) => handleChangeDate('end', date)}
								dateFormat="dd.MM.yyyy"
								inline
							/>
						</div>
					)}
				</div>
			</div>
			
      {error && <div className={css.error_text}>{error}</div>}
    </div>
  );
};

export default CustomDatePeaker;
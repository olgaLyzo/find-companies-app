import React, { useState } from 'react';
import css from '../scss/components_styles/datapeaker.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePeakerProps {
  startDate: string;
  endDate: string;
  onChangeStartDate: (dateStr: string) => void;
  onChangeEndDate: (dateStr: string) => void;
	onErrorChange: (hasError: boolean) => void;
}

const CustomDatePeaker: React.FC<CustomDatePeakerProps> = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
	onErrorChange
}) => {
  const [activeDate, setActiveDate] = useState<'start' | 'end' | null>(null);
	const [dateValidation, setDateValidation] = useState<{
	start: {
		error: boolean;
		message: string;
		touched: boolean;
	};
	end: {
		error: boolean;
		message: string;
		touched: boolean;
	};
}>({
	start: {
		error: false,
		message: '',
		touched: false,
	},
	end: {
		error: false,
		message: '',
		touched: false,
	}
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
	let start = {
		error: false,
		message: ''
	};

	let end = {
		error: false,
		message: ''
	};

	const newStart = type === 'start' ? date : selectedStart;
	const newEnd = type === 'end' ? date : selectedEnd;


	// если дата начала не выбрана
	if (!newStart && type === 'start') {
		start.error = true;
		start.message = 'Введите корректные данные';
	}


	// если дата конца не выбрана
	if (!newEnd && type === 'end') {
		end.error = true;
		end.message = 'Введите корректные данные';
	}


	// проверяем дату начала отдельно
	if (newStart && clearTime(newStart) > today) {
		start.error = true;
		start.message = 'Дата начала не может быть больше текущей даты';
	}


	// проверяем диапазон, если выбраны обе даты
	if (newStart && newEnd) {

		if (newStart > newEnd) {
			start.error = true;
			start.message = 'Дата начала не может быть позже даты конца';
		}

		if (newEnd < newStart) {
			end.error = true;
			end.message = 'Дата конца не может быть раньше даты начала';
		}

		if (clearTime(newEnd) > today) {
			end.error = true;
			end.message = 'Дата конца не может быть больше текущей даты';
		}
	}


	setDateValidation(prev => ({
		start: {
			...prev.start,
			error: start.error,
			message: start.message,
		},
		end: {
			...prev.end,
			error: end.error,
			message: end.message,
		}
	}));


	const hasError = start.error || end.error;
	onErrorChange(hasError);
};

const handleChangeDate = (field: 'start' | 'end', date: Date | null) => {

  setDateValidation(prev => ({
    ...prev,
    [field]: {
      ...prev[field],
      touched: true
    }
  }));

const dateStr = date ? date.toLocaleDateString('ru-RU') : '';

if (field === 'start') {
  onChangeStartDate(dateStr);
} else {
  onChangeEndDate(dateStr);
}

if (date) {
  checkErrors(date, field);
} else {
  setDateValidation(prev => ({
    ...prev,
    [field]: {
      ...prev[field],
      error: true,
      message: 'Введите корректные данные'
    }
  }));
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
							${dateValidation.start.error ? css.error : ''}
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
							${dateValidation.end.error ? css.error : ''}
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
			
      {/* {error && <div className={css.error_text}>{error}</div>} */}
    {dateValidation.start.touched && dateValidation.start.message && (
			<div className={css.error_text}>
				{dateValidation.start.message}
			</div>
		)}

		{dateValidation.end.touched && dateValidation.end.message && (
			<div className={css.error_text}>
				{dateValidation.end.message}
			</div>
		)}
		</div>
  );
};

export default CustomDatePeaker;
import React, { useState, useEffect, useMemo } from 'react';
import css from '../scss/components_styles/datepicker.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface CustomDatePickerProps {
  startDate: string;
  endDate: string;
  onChangeStartDate: (dateStr: string) => void;
  onChangeEndDate: (dateStr: string) => void;
  onErrorChange: (hasError: boolean) => void;
}interface DateFieldValidation {
  error: boolean;
  message: string;
  touched: boolean;
}

interface DateValidation {
  start: DateFieldValidation;
  end: DateFieldValidation;
}

const clearTime = (date: Date) => {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};


const convertStrToDate = (dateStr: string): Date | null => {
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? null : date;
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
  onErrorChange,
}) => {
  const [activeDate, setActiveDate] = useState<'start' | 'end' | null>(null);
  const [dateValidation, setDateValidation] = useState<DateValidation>({
		start: {
			error: false,
			message: '',
			touched: false,
		},
		end: {
			error: false,
			message: '',
			touched: false,
		},
	});

  const selectedStart = startDate ? convertStrToDate(startDate) : null;
  const selectedEnd = endDate ? convertStrToDate(endDate) : null;
  const today = useMemo(() => {
  const date = clearTime(new Date());
		date.setHours(0, 0, 0, 0);
		return date;
	}, []);

  useEffect(() => {
    const start = {
      error: false,
      message: '',
    };
    const end = {
      error: false,
      message: '',
    };
    if (dateValidation.start.touched && !selectedStart) {
      start.error = true;
      start.message = 'Введите корректные данные';
    }
    if (dateValidation.end.touched && !selectedEnd) {
      end.error = true;
      end.message = 'Введите корректные данные';
    }
    if (selectedStart && clearTime(selectedStart) > today) {
      start.error = true;
      start.message = 'Дата начала не может быть больше текущей даты';
    }
    if (selectedEnd && clearTime(selectedEnd) > today) {
      end.error = true;
      end.message = 'Дата конца не может быть больше текущей даты';
    }
    if (selectedStart && selectedEnd) {
      if (selectedStart > selectedEnd) {
        start.error = true;
        start.message = 'Дата начала не может быть позже даты конца';
      }
      if (selectedEnd < selectedStart) {
        end.error = true;
        end.message = 'Дата конца не может быть раньше даты начала';
      }
    }

    setDateValidation((prev) => ({
      start: {
        ...prev.start,
        error: start.error,
        message: start.message,
      },
      end: {
        ...prev.end,
        error: end.error,
        message: end.message,
      },
    }));

    onErrorChange(start.error || end.error);
  }, [
			startDate,
			endDate,
			dateValidation.start.touched,
			dateValidation.end.touched,
			selectedStart,
			selectedEnd,
			today,
			onErrorChange,
		]);

  const handleChangeDate = (field: 'start' | 'end', date: Date | null) => {
    setDateValidation((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        touched: true,
      },
    }));

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
						type='button'
            className={`
							${css.date}
							${activeDate === 'start' ? css.active : ''}
							${dateValidation.start.error ? css.error : ''}
						`}
            onClick={() => setActiveDate(activeDate === 'start' ? null : 'start')}
          >
            <span className={css.text}>{startDate || 'Дата начала'}</span>
            <img className={css.arrow} src="images/triangle.svg" alt="иконка стрелки" />
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
						type='button'
            className={`
							${css.date}
							${activeDate === 'end' ? css.active : ''}
							${dateValidation.end.error ? css.error : ''}
						`}
            onClick={() => setActiveDate(activeDate === 'end' ? null : 'end')}
          >
            <span className={css.text}>{endDate || 'Дата конца'}</span>
            <img className={css.arrow} src="images/triangle.svg" alt="иконка стрелки" />
          </button>
          {activeDate === 'end' && (
            <div className={css.datepicker_wrapper}>
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
      {dateValidation.start.touched && dateValidation.start.message && (
        <div className={css.error_text}>{dateValidation.start.message}</div>
      )}
      {dateValidation.end.touched && dateValidation.end.message && (
        <div className={css.error_text}>{dateValidation.end.message}</div>
      )}
    </div>
  );
};

export default CustomDatePicker;

import React, { useState, useEffect } from 'react';
import css from '../scss/components_styles/searching.module.scss'; 
import Checkbox from './Checkbox';
import CustomDatePeaker from './CustomDatePeaker';

const dataInit = {
  inn: '', 
  tone: 'Любая', 
  documentCount: '', 
  dateStart: '', 
  dateEnd: ''
};

const errorsInit = {
  inn: false,
  tone: false,
  documentCount: false,
  dateStart: false,
  dateEnd: false
};

const formatInn = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const parts = [
    digits.substring(0, 2),
    digits.substring(2, 5),
    digits.substring(5, 8),
    digits.substring(8, 10)
  ];
  return parts.filter(Boolean).join(' ');
};

const validateField = (name: string, value: string): boolean => {
  switch (name) {
    case 'inn':
      return /^\d{2} \d{3} \d{3} \d{2}$/.test(value);
    case 'tone':
      return value !== '';
    case 'documentCount':
      const num = Number(value);
      return /^\d*$/.test(value) && num >= 1 && num <= 1000;
    case 'dateStart':
    case 'dateEnd':
      return value.trim() !== '';
    default:
      return true;
  }
};

const SearchForm: React.FC = () => {
  const [data, setData] = useState(dataInit);
  const [errors, setErrors] = useState(errorsInit);
  const [isFormValid, setIsFormValid] = useState(false);
	const [dateError, setDateError] = useState(false);

  useEffect(() => {
    const allFilled = Object.values(data).every(v => v.trim() !== '');
		const noErrors = Object.values(errors).every(err => err === false);
		setIsFormValid(allFilled && noErrors && !dateError);  
	}, [data, errors, dateError]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'inn') {
      const formattedInn = formatInn(value);
      setData(prev => ({ ...prev, inn: formattedInn }));
      const isValid = /^\d{2} \d{3} \d{3} \d{2}$/.test(formattedInn);
      setErrors(prev => ({ ...prev, inn: !isValid }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
      const isValid = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: !isValid }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      inn: !validateField('inn', data.inn),
      tone: !validateField('tone', data.tone),
      documentCount: !validateField('documentCount', data.documentCount),
      dateStart: !validateField('dateStart', data.dateStart),
      dateEnd: !validateField('dateEnd', data.dateEnd),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).every(err => err === false)) {
      console.log('Форма отправлена:', data);
    }
  };

  return (
    <form className={css.form_container} onSubmit={handleSubmit}>
      <div className={css.form_grafs}>
        <div className={css.form_field}>
          <label>ИНН компании <span className={errors.inn ? css.error_label : ''}>*</span></label>
          <input
            className={`${errors.inn ? css.error : ''}`}
            type="text"
            name="inn"
            placeholder="XX XXX XXX XX"
            value={data.inn}
            onChange={handleChange}
            required
          />
          {errors.inn && (
            <div className={css.error_text}>Введите корректные данные</div>
          )}
        </div>

        <div className={css.form_field}>
          <label>Тональность</label>
          <select
            name="tone"
            value={data.tone}
            onChange={handleChange}
            required
          >
            <option value="Любая">Любая</option>
            <option value="Позитивная">Позитивная</option>
            <option value="Негативная">Негативная</option>
          </select>
        </div>

        <div className={css.form_field}>
          <label>Количество документов в выдаче <span className={errors.documentCount ? css.error_label : ''}>*</span>
					</label>
          <input
            className={`${errors.documentCount ? css.error : ''}`}
            type="text"
            name="documentCount"
            placeholder="От 1 до 1000"
            value={data.documentCount}
            onChange={handleChange}
            required
          />
          {errors.documentCount && (
            <div className={css.error_text}>Введите корректные данные</div>
          )}
        </div>

        <div className={css.form_field}>
          <label>Диапазон поиска <span className={dateError ? css.error_label : ''}> *</span>
					</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CustomDatePeaker
              // startDate={data.dateStart}
              // endDate={data.dateEnd}
              // onChangeStartDate={(dateStr) => setData(prev => ({ ...prev, dateStart: dateStr }))}
              // onChangeEndDate={(dateStr) => setData(prev => ({ ...prev, dateEnd: dateStr }))}
							startDate={data.dateStart}
							endDate={data.dateEnd}
							onChangeStartDate={(dateStr) => 
								setData(prev => ({ ...prev, dateStart: dateStr }))
							}
							onChangeEndDate={(dateStr) => 
								setData(prev => ({ ...prev, dateEnd: dateStr }))
							}
							onErrorChange={setDateError}
						/>
          </div>
        </div>
      </div>

      <div className={css.check_and_submit_container}>
        <Checkbox />
        <button
          type="submit"
          className={`${css.submit_button} ${isFormValid ? css.active_btn : ''}`}
          disabled={!isFormValid}
        >
          Поиск
        </button>
        <p className={css.note}>* Обязательные к заполнению поля</p>
      </div>
    </form>
  );
};

export default SearchForm;
import React, { useState, useMemo } from 'react';
import css from '../scss/components_styles/searching.module.scss';
import Checkbox from './Checkbox';
import CustomDatePicker from './CustomDatePicker';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { runSearch } from '../features/search/searchService';
import { formatInn, validateField } from '../utils/searchUtils';
import type { SearchField, SearchFormData, SearchFormErrors  } from '../types/search';
import { dataInit, errorsInit } from '../constants/searchFormConsts';


const SearchForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<SearchFormData>(dataInit);
  const [errors, setErrors] = useState<SearchFormErrors>(errorsInit);
  const [dateError, setDateError] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      data.inn !== '' &&
      data.tone !== '' &&
      data.documentCount !== '' &&
      data.dateStart !== '' &&
      data.dateEnd !== '' &&
      Object.values(errors).every((error) => !error) &&
      !dateError
    );
  }, [data, errors, dateError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as {
			name: SearchField;
			value: string;
		};
    if (name === 'inn') {
      const formattedInn = formatInn(value);
      setData((prev) => ({ ...prev, inn: formattedInn }));
      const isValid = /^\d{2} \d{3} \d{3} \d{2}$/.test(formattedInn);
      setErrors((prev) => ({ ...prev, inn: !isValid }));
    } else {
      const isValid = validateField(name, value);
      if (name === 'documentCount' && !isValid) {
        setData((prev) => ({
          ...prev,
          documentCount: '',
        }));
        setErrors((prev) => ({
          ...prev,
          documentCount: true,
        }));
        return;
      }
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: !isValid,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const { name, value } = e.target as {
			name: SearchField;
			value: string;
		};    
		const isValid = validateField(name, value);
    if (name === 'documentCount' && !isValid) {
      setData((prev) => ({
        ...prev,
        documentCount: '',
      }));
      setErrors((prev) => ({
        ...prev,
        documentCount: true,
      }));
    }
  };

	const validateForm = () => ({
		inn: !validateField('inn', data.inn),
		tone: !validateField('tone', data.tone),
		documentCount: !validateField('documentCount', data.documentCount),
		dateStart: !validateField('dateStart', data.dateStart),
		dateEnd: !validateField('dateEnd', data.dateEnd),
	});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.values(newErrors).every((err) => err === false)) {
      try {
				await runSearch(dispatch, data);
			} catch (error) {
				console.log('Ошибка поиска:', error);
			}
    }
  };

  return (
    <form className={css.form_container} onSubmit={handleSubmit}>
      <div className={css.form_grafs}>
        <div className={css.form_field}>
          <label>
            ИНН компании <span className={errors.inn ? css.error_label : ''}>*</span>
          </label>
          <input
            className={`${errors.inn ? css.error : ''}`}
            type="text"
            name="inn"
            placeholder="XX XXX XXX XX"
            value={data.inn}
            onChange={handleChange}
            required
          />
          {errors.inn && <div className={css.error_text}>Введите корректные данные</div>}
        </div>

        <div className={css.form_field}>
          <label>Тональность</label>
          <select name="tone" value={data.tone} onChange={handleChange} required>
            <option value="Любая">Любая</option>
            <option value="Позитивная">Позитивная</option>
            <option value="Негативная">Негативная</option>
          </select>
        </div>

        <div className={css.form_field}>
          <label>
            Количество документов в выдаче{' '}
            <span className={errors.documentCount ? css.error_label : ''}>*</span>
          </label>
          <input
            className={`${errors.documentCount ? css.error : ''}`}
            type="text"
            name="documentCount"
            placeholder="От 1 до 1000"
            value={data.documentCount}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.documentCount && <div className={css.error_text}>Введите корректные данные</div>}
        </div>
        <div className={css.form_field}>
          <label>
            Диапазон поиска <span className={dateError ? css.error_label : ''}> *</span>
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <CustomDatePicker
              startDate={data.dateStart}
              endDate={data.dateEnd}
              onChangeStartDate={(dateStr) => {
                setData((prev) => ({
                  ...prev,
                  dateStart: dateStr,
                }));
                setErrors((prev) => ({
                  ...prev,
                  dateStart: !validateField('dateStart', dateStr),
                }));
              }}
              onChangeEndDate={(dateStr) => {
                setData((prev) => ({
                  ...prev,
                  dateEnd: dateStr,
                }));
                setErrors((prev) => ({
                  ...prev,
                  dateEnd: !validateField('dateEnd', dateStr),
                }));
              }}
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

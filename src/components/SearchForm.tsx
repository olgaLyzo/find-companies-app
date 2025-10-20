import React, { useEffect, useState } from 'react';
import css from '../scss/searching.module.scss'; 
import Checkbox from './Checkbox';
import CustomDatePicker from './CustomDatePeaker';
import { Link } from 'react-router';

const SearchForm: React.FC = () => {
  const [data, setData] = useState({
    inn: '',
    tone: 'Любая',
    documentCount: '',
    dateStart: '',
    dateEnd: '',
  });
  const [errors, setErrors] = useState({
    inn: false,
    tone: false,
    documentCount: false,
    dateStart: false,
    dateEnd: false,
  });

	const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name: string, value: string): boolean => {
    switch (name) {
      case 'inn':
        return /^\d{10}$/.test(value);
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

	useEffect(() => {
		console.log('data:', data)
		console.log('errors:',errors)
    const allFilled = Object.values(data).every(v => v.trim() !== '');
    const allErrorsOK = Object.values(errors).every(err => err === false);
    const newValid = allFilled && allErrorsOK;

		setIsFormValid(newValid);
		console.log('isFormValid:',isFormValid)
	}, [data, errors]);

	


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    const isValid = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: !isValid }));
  };

const handleStartDateChange = (dateStr: string) => {
    setData(prev => ({ ...prev, dateStart: dateStr }));
  };
  const handleEndDateChange = (dateStr: string) => {
    setData(prev => ({ ...prev, dateEnd: dateStr }));
  };

const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

    const newErrors = Object.fromEntries(
      Object.entries(data).map(([name, value]) => [
        name,
        !validateField(name, value),
      ])
    ) as typeof errors;

    setErrors(newErrors);

    const isValidForm =
      Object.values(newErrors).every((err) => !err) &&
      Object.values(data).every((value) => value.trim() !== '');

    if (isValidForm) {
			setIsFormValid(true)
    }
  };

	
  return (
    <form className={css.form_container} onSubmit={handleSubmit}>
			<div className={css.form_field}>
				<label>ИНН компании *</label>
				<input
					className={`${errors.inn ? css.error : ''}`}
					type="text"
					name="inn"
					placeholder="10 цифр"
					value={data.inn}
					onChange={handleChange}
					required
				/>
				{errors.inn && (
					<div className={css.error_text}>Введите корректные данные</div>
				)}


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


				<label>Количество документов в выдаче *</label>
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
				<label>Диапазон поиска *</label>
				<CustomDatePicker 
					startDate={data.dateStart}
  				endDate={data.dateEnd}
					onChangeStart={(dateStr) => setData(prev => ({ ...prev, dateStart: dateStr }))}
  				onChangeEnd={(dateStr) => setData(prev => ({ ...prev, dateEnd: dateStr }))}
				/>
				
				{ 
					errors.dateEnd || errors.dateStart && (
  				<div className={css.error_text}>Введите корректные данные</div>
				)}			
			</div>
			<div className={css.check_and_submit_container}>
				<Checkbox />
				<Link to="/articles">
					<button 
						type="submit" 
						className={`${css.submit_button} ${isFormValid 
							? css.active_btn 
							: ''}`}
					>Поиск </button>
				</Link>
				<p className={css.note}>* Обязательные к заполнению поля</p>
			</div>
		</form>
  );
};

export default SearchForm;
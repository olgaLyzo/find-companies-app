import React, { useState, useMemo } from 'react';
import css from '../scss/components_styles/searching.module.scss'; 
import Checkbox from './Checkbox';
import CustomDatePeaker from './CustomDatePeaker';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { fetchHistograms } from '../features/search/histogramThunk';
import { setSearchStage } from '../features/search/searchSlice';
import { fetchDocuments } from '../features/search/searchThunk';

interface SearchFormProps {}

//Раскомментить в конце разработки и удалить DEV_MODE и Datainit под ним!!!!!!!!!!!!!!
// const dataInit = {
//   inn: '', 
//   tone: 'Любая', 
//   documentCount: '', 
//   dateStart: '', 
//   dateEnd: ''
// };

const DEV_MODE = true;

const dataInit = {
  inn: DEV_MODE ? '77 360 500 03' : '',
  tone: 'Любая',
  documentCount: DEV_MODE ? '10' : '',
  dateStart: DEV_MODE ? '01.01.2022' : '',
  dateEnd: DEV_MODE ? '21.07.2026' : ''
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

	const formatDateForApi = (date: string) => {
		const [day, month, year] = date.split('.');
		return `${year}-${month}-${day}`;
	};
	const createHistogramRequest = (data: typeof dataInit) => {
		return {
			issueDateInterval: {
				startDate: formatDateForApi(data.dateStart),
  			endDate: formatDateForApi(data.dateEnd),
			},
			searchContext: {
				targetSearchEntitiesContext: {
					targetSearchEntities: [
						{
							type: "company",
							sparkId: null,
							entityId: null,
							inn: Number(data.inn.replace(/\s/g, "")),
							maxFullness: true,
							inBusinessNews: null,
						},
					],
					onlyMainRole: true,
					tonality:
						data.tone === "Любая"
							? "any"
							: data.tone,
					onlyWithRiskFactors: false,
					riskFactors: {
						and: [],
						or: [],
						not: [],
					},
					themes: {
						and: [],
						or: [],
						not: [],
					},
				},
				themesFilter: {
					and: [],
					or: [],
					not: [],
				},
			},
			attributeFilters: {
				excludeTechNews: true,
				excludeAnnouncements: true,
				excludeDigests: true,
			},
			similarMode: "duplicates",
			limit: Number(data.documentCount),
			sortType: "sourceInfluence",
			sortDirectionType: "desc",
			intervalType: "month",
			histogramTypes: [
				"totalDocuments",
				"riskFactors",
			],
		};
	};


const SearchForm: React.FC<SearchFormProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
	
	const [data, setData] = useState(dataInit);
  const [errors, setErrors] = useState(errorsInit);
	const [dateError, setDateError] = useState(false);

	const isFormValid = useMemo(() => {
			return (
					data.inn !== '' &&
					data.tone !== '' &&
					data.documentCount !== '' &&
					data.dateStart !== '' &&
					data.dateEnd !== '' &&
					Object.values(errors).every(error => error === false) &&
					!dateError
			);
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
			const isValid = validateField(name, value);
			if (name === 'documentCount' && !isValid) {
				setData(prev => ({
					...prev,
					documentCount: ''
				}));
				setErrors(prev => ({
					...prev,
					documentCount: true
				}));
				return;
			}
			setData(prev => ({
				...prev,
				[name]: value
			}));
			setErrors(prev => ({
				...prev,
				[name]: !isValid
			}));
		}
	};

	const handleBlur = (
			e: React.FocusEvent<HTMLInputElement>
		) => {
			const { name, value } = e.target;
			const isValid = validateField(name, value);
			if (name === 'documentCount' && !isValid) {
				setData(prev => ({
					...prev,
					documentCount: ''
				}));
				setErrors(prev => ({
					...prev,
					documentCount: true
				}));
			}
	};

  const handleSubmit = async (e: React.FormEvent) => {
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
	try {

const params = createHistogramRequest(data);


	// показываем слайдер с loader
	dispatch(setSearchStage('histogramsLoading'));


	// 1. получаем статистику
	await dispatch(fetchHistograms(params)).unwrap();


	// статистика готова
	dispatch(setSearchStage('histogramsReady'));


	// 2. получаем документы
	await dispatch(fetchDocuments(params)).unwrap();


	// статьи готовы
	dispatch(setSearchStage('documentsReady'));		

	} catch (error) {
		console.log('Ошибка поиска:', error);
	}
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
						onBlur={handleBlur}
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
							startDate={data.dateStart}
							endDate={data.dateEnd}
							onChangeStartDate={(dateStr) => {
									setData(prev => ({
											...prev,
											dateStart: dateStr
									}));
									setErrors(prev => ({
											...prev,
											dateStart: !validateField('dateStart', dateStr)
									}));
							}}
							onChangeEndDate={(dateStr) => {
									setData(prev => ({
											...prev,
											dateEnd: dateStr
									}));
									setErrors(prev => ({
											...prev,
											dateEnd: !validateField('dateEnd', dateStr)
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
import type { SearchFormData, SearchFormErrors } from '../types/search';


export const dataInit: SearchFormData = {
  inn: '',
  tone: 'Любая',
  documentCount: '',
  dateStart: '',
  dateEnd: '',
};

export const errorsInit: SearchFormErrors = {
  inn: false,
  tone: false,
  documentCount: false,
  dateStart: false,
  dateEnd: false,
};


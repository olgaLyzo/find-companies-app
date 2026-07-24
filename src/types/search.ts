export interface SearchFormData {
  inn: string;
  tone: string;
  documentCount: string;
  dateStart: string;
  dateEnd: string;
}

export interface SearchFormErrors {
  inn: boolean;
  tone: boolean;
  documentCount: boolean;
  dateStart: boolean;
  dateEnd: boolean;
}

export type SearchField = keyof SearchFormData;
import type { SearchFormData } from '../types/search';

export const formatInn = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const parts = [
    digits.substring(0, 2),
    digits.substring(2, 5),
    digits.substring(5, 8),
    digits.substring(8, 10),
  ];
  return parts.filter(Boolean).join(' ');
};

export const validateField = (name: string, value: string): boolean => {
  switch (name) {
    case 'inn':
      return /^\d{2} \d{3} \d{3} \d{2}$/.test(value);
    case 'tone':
      return value !== '';
    case 'documentCount': {
			const num = Number(value);
			return /^\d*$/.test(value) && num >= 1 && num <= 1000;
		}
    case 'dateStart':
    case 'dateEnd':
      return value.trim() !== '';
    default:
      return true;
  }
};

export const formatDateForApi = (date: string) => {
  const [day, month, year] = date.split('.');
  return `${year}-${month}-${day}`;
};

export const createHistogramRequest = (data: SearchFormData) => {
  return {
    issueDateInterval: {
      startDate: formatDateForApi(data.dateStart),
      endDate: formatDateForApi(data.dateEnd),
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: 'company',
            sparkId: null,
            entityId: null,
            inn: Number(data.inn.replace(/\s/g, '')),
            maxFullness: true,
            inBusinessNews: null,
          },
        ],
        onlyMainRole: true,
        tonality: data.tone === 'Любая' ? 'any' : data.tone,
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
    similarMode: 'duplicates',
    limit: Number(data.documentCount),
    sortType: 'sourceInfluence',
    sortDirectionType: 'desc',
    intervalType: 'month',
    histogramTypes: ['totalDocuments', 'riskFactors'],
  };
};

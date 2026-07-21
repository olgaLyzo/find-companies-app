import { api } from './axios';

export interface HistogramRequest {
  issueDateInterval: {
    startDate: string;
    endDate: string;
  };
  searchContext: any;
  attributeFilters: any;
  similarMode: string;
  limit: number;
  sortType: string;
  sortDirectionType: string;
  intervalType: string;
  histogramTypes: string[];
}

export type SearchParams = HistogramRequest;


export async function searchDocuments(params: HistogramRequest) {
  console.log('API params:', params);
	console.log('URL:', api.defaults.baseURL + '/objectsearch');
  const response = await api.post('/objectsearch', params);

  console.log('API response:', response.data);

  return response.data;
}

export async function getHistograms(params: HistogramRequest) {
  console.log('Histogram params:', params);
  console.log(
    'Histogram URL:',
    api.defaults.baseURL + '/objectsearch/histograms'
  );

  const response = await api.post(
    '/objectsearch/histograms',
    {
      ...params,
      intervalType: 'month',
      histogramTypes: [
        'totalDocuments',
        'riskFactors'
      ]
    }
  );

  console.log('Histogram response:', response.data);

  return response.data;
}

export async function getDocuments(ids: string[]) {
  const response = await api.post('/documents', {
    ids
  });

  console.log('Documents response:', response.data);

  return response.data;
}

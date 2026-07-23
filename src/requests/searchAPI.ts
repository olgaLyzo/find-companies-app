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
  const response = await api.post('/objectsearch', params);
  return response.data;
}

export async function getHistograms(params: HistogramRequest) {
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
  return response.data;
}

export async function getDocuments(ids: string[]) {
  const response = await api.post('/documents', {
    ids
  });
  return response.data;
}

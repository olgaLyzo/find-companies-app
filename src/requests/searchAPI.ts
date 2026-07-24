import { api } from './axios';

export interface HistogramRequest {
  issueDateInterval: {
    startDate: string;
    endDate: string;
  };
  searchContext: Record<string, unknown>;
	attributeFilters: Record<string, unknown>;
  similarMode: string;
  limit: number;
  sortType: string;
  sortDirectionType: string;
  intervalType: string;
  histogramTypes: string[];
}

export type SearchParams = HistogramRequest;

export interface SearchDocumentItem {
  encodedId: string;
}

export interface SearchDocumentsResponse {
  items: SearchDocumentItem[];
}

export async function searchDocuments(
  params: HistogramRequest
): Promise<SearchDocumentsResponse> {
  const response = await api.post('/objectsearch', params);
  return response.data;
}

export async function getHistograms(params: HistogramRequest) {
  const response = await api.post('/objectsearch/histograms', {
    ...params,
    intervalType: 'month',
    histogramTypes: ['totalDocuments', 'riskFactors'],
  });
  return response.data;
}

export async function getDocuments(ids: string[]) {
  const response = await api.post('/documents', {
    ids,
  });
  return response.data;
}

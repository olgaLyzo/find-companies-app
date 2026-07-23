import { api } from './axios';
export async function searchDocuments(params) {
    const response = await api.post('/objectsearch', params);
    return response.data;
}
export async function getHistograms(params) {
    const response = await api.post('/objectsearch/histograms', {
        ...params,
        intervalType: 'month',
        histogramTypes: [
            'totalDocuments',
            'riskFactors'
        ]
    });
    return response.data;
}
export async function getDocuments(ids) {
    const response = await api.post('/documents', {
        ids
    });
    return response.data;
}

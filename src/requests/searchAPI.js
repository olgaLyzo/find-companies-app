import { api } from './axios';
export async function searchDocuments(params) {
    console.log('API params:', params);
    console.log('URL:', api.defaults.baseURL + '/objectsearch');
    const response = await api.post('/objectsearch', params);
    console.log('API response:', response.data);
    return response.data;
}
export async function getDocuments(ids) {
    const response = await api.post('/documents', {
        ids
    });
    console.log('Documents response:', response.data);
    return response.data;
}

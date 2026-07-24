import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../requests/axios';
export const fetchHistograms = createAsyncThunk('search/fetchHistograms', async (params, { rejectWithValue }) => {
    try {
        const response = await api.post('/objectsearch/histograms', params);
        return response.data;
    }
    catch (error) {
        const axiosError = error;
        return rejectWithValue(axiosError.response?.data?.message || 'Ошибка загрузки статистики');
    }
});

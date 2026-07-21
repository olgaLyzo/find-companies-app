import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../requests/axios';
export const fetchHistograms = createAsyncThunk('search/fetchHistograms', async (params, { rejectWithValue }) => {
    try {
        const response = await api.post('/objectsearch/histograms', params);
        console.log('Histogram response:', response.data);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data ||
            'Ошибка загрузки статистики');
    }
});

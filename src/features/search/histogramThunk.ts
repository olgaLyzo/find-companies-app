import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../requests/axios';
import { HistogramRequest } from '../../requests/searchAPI';

export const fetchHistograms = createAsyncThunk(
  'search/fetchHistograms',
  async (
    params: HistogramRequest,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        '/objectsearch/histograms',
        params
      );
      return response.data;
    } catch(error:any){
      return rejectWithValue(
        error.response?.data ||
        'Ошибка загрузки статистики'
      );
    }
  }
);
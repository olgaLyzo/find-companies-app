import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../requests/axios';
import type { HistogramRequest } from '../../requests/searchAPI';
import type { AxiosError } from 'axios';

export const fetchHistograms = createAsyncThunk(
  'search/fetchHistograms',
  async (params: HistogramRequest, { rejectWithValue }) => {
    try {
      const response = await api.post('/objectsearch/histograms', params);
      return response.data;
    } catch (error) {
			const axiosError = error as AxiosError<{ message?: string }>;
			return rejectWithValue(
				axiosError.response?.data?.message || 'Ошибка загрузки статистики'
			);
		}
  }
);

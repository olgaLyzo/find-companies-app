import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchDocuments, getDocuments, HistogramRequest } from '../../requests/searchAPI';
import type { AxiosError } from 'axios';
interface SearchItem {
  encodedId: string;
}
interface SearchResponse {
  items: SearchItem[];
}

export const fetchDocuments = createAsyncThunk(
  'search/fetchDocuments',
  async (params: HistogramRequest, { rejectWithValue }) => {
    try {
      const searchResult = (await searchDocuments(params)) as SearchResponse;
      const ids = searchResult.items.map((item) => item.encodedId);
      const documents = await getDocuments(ids);
      return documents;
    } catch (error) {
			const axiosError = error as AxiosError<{ message?: string }>;
			return rejectWithValue(
				axiosError.response?.data?.message || 'Ошибка загрузки данных'
			);
		}
  }
);

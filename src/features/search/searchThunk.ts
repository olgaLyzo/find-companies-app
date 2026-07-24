import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchDocuments, getDocuments, HistogramRequest } from '../../requests/searchAPI';

export const fetchDocuments = createAsyncThunk(
  'search/fetchDocuments',
  async (params: HistogramRequest, { rejectWithValue, dispatch }) => {
    try {
      const searchResult = await searchDocuments(params);
      const ids = searchResult.items.map((item: any) => item.encodedId);
      const documents = await getDocuments(ids);
      return documents;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Ошибка загрузки данных');
    }
  }
);

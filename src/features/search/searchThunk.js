import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchDocuments, getDocuments } from '../../requests/searchAPI';
export const fetchDocuments = createAsyncThunk('search/fetchDocuments', async (params, { rejectWithValue, dispatch }) => {
    try {
        console.log('Отправляем запрос:', params);
        const searchResult = await searchDocuments(params);
        const ids = searchResult.items.map((item) => item.encodedId);
        const documents = await getDocuments(ids);
        return documents;
    }
    catch (error) {
        console.log('Ошибка API:', error.response?.data);
        return rejectWithValue(error.response?.data || 'Ошибка загрузки данных');
    }
});

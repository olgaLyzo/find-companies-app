import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchDocuments, getDocuments } from '../../requests/searchAPI';
export const fetchDocuments = createAsyncThunk('search/fetchDocuments', async (params, { rejectWithValue }) => {
    try {
        const searchResult = (await searchDocuments(params));
        const ids = searchResult.items.map((item) => item.encodedId);
        const documents = await getDocuments(ids);
        return documents;
    }
    catch (error) {
        const axiosError = error;
        return rejectWithValue(axiosError.response?.data?.message || 'Ошибка загрузки данных');
    }
});

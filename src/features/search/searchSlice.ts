import { createSlice } from '@reduxjs/toolkit';
import { fetchDocuments } from './searchThunk';

interface SearchState {
  documents: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  documents: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })

      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
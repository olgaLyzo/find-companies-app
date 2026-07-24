import { fetchDocuments } from './searchThunk';
import { fetchHistograms } from './histogramThunk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchStage =
  | 'form'
  | 'histogramsLoading'
  | 'histogramsReady'
  | 'documentsReady';


interface SearchState {
  documents: any[];
  histograms: any[];
  loading: boolean;
  histogramsLoading: boolean;
  searchStage: SearchStage;
  error: string | null;
}

const initialState: SearchState = {
  documents: [],
  histograms: [],
  loading: false,
  histogramsLoading: false,
  searchStage: 'form',
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
		setSearchStage: (
  state,
  action: PayloadAction<SearchStage>
) => {
  state.searchStage = action.payload;
},
	},

  extraReducers: (builder) => {
    builder

      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
				state.searchStage = 'documentsReady';
      })

      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

			.addCase(fetchHistograms.pending, (state) => {
					state.histogramsLoading = true;
					state.searchStage = 'histogramsLoading';
					state.error = null;
			})

			.addCase(fetchHistograms.fulfilled, (state, action) => {
					console.log('HISTOGRAMS:', action.payload);

					state.histogramsLoading = false;
					state.histograms = action.payload.data;
					state.searchStage = 'histogramsReady';
			})

			.addCase(fetchHistograms.rejected, (state, action) => {
				state.histogramsLoading = false;
				state.error = action.payload as string;
			})
				},
			});

export const { setSearchStage } = searchSlice.actions;

export default searchSlice.reducer;
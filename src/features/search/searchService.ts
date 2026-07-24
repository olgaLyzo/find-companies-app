import type { AppDispatch } from '../../store/store';
import { fetchHistograms } from './histogramThunk';
import { fetchDocuments } from './searchThunk';
import { setSearchStage } from './searchSlice';
import { createHistogramRequest } from '../../utils/searchUtils';
import type { SearchFormData } from '../../types/search';

export const runSearch = async (
  dispatch: AppDispatch,
  data: SearchFormData 
): Promise<void> => {
  const params = createHistogramRequest(data);

  dispatch(setSearchStage('histogramsLoading'));
  await dispatch(fetchHistograms(params)).unwrap();
  dispatch(setSearchStage('histogramsReady'));
  await dispatch(fetchDocuments(params)).unwrap();
  dispatch(setSearchStage('documentsReady'));
};
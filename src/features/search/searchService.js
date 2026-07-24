import { fetchHistograms } from './histogramThunk';
import { fetchDocuments } from './searchThunk';
import { setSearchStage } from './searchSlice';
import { createHistogramRequest } from '../../utils/searchUtils';
export const runSearch = async (dispatch, data) => {
    const params = createHistogramRequest(data);
    dispatch(setSearchStage('histogramsLoading'));
    await dispatch(fetchHistograms(params)).unwrap();
    dispatch(setSearchStage('histogramsReady'));
    await dispatch(fetchDocuments(params)).unwrap();
    dispatch(setSearchStage('documentsReady'));
};

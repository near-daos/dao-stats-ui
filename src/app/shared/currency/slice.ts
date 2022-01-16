import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus } from 'src/store/types';
import { currencyService } from 'src/api';

import { CurrencyState } from './types';

const initialState: CurrencyState = {
  currency: null,
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getCurrency = createAsyncThunk('contracts/getCurrency', async () =>
  currencyService.getCurrency(),
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrency.fulfilled, (state, { payload }) => {
      state.loading = RequestStatus.SUCCESS;
      state.error = null;
      state.currency = payload.data;
    });

    builder.addCase(getCurrency.rejected, (state, { error }) => {
      state.loading = RequestStatus.FAILED;
      state.error = error.message;
    });

    builder.addCase(getCurrency.pending, (state) => {
      state.loading = RequestStatus.PENDING;
    });
  },
});

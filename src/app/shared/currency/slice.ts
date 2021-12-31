/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus } from 'src/store/types';
import { currencyService } from 'src/api';

import { currencyState } from './types';

const initialState: currencyState = {
  currency: null,
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getCurrency = createAsyncThunk(
  'contracts/getCurrency',
  async () => {
    const response = await currencyService.getCurrency();

    return response.data;
  },
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrency.fulfilled, (state, { payload }) => {
      state.loading = RequestStatus.SUCCESS;
      state.error = null;
      state.currency = payload;
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

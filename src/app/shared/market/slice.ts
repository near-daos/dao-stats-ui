import { createSlice, createAsyncThunk, isRejected } from '@reduxjs/toolkit';
import { PriceParamsHistory, marketService } from 'src/api';

import { MarketState } from './types';

const initialState: MarketState = {
  price: null,
  error: null,
};

export const getPrice = createAsyncThunk(
  'market/getPrice',
  async (params: PriceParamsHistory) => marketService.getPrice(params),
);

const isRejectedAction = isRejected(getPrice);

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrice.fulfilled, (state, { payload }) => {
      state.price = payload.data;
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });
  },
});

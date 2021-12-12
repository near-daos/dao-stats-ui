/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';

import { RequestStatus } from '../../store/types';
import { autocompleteState } from './types';
import { autocompleteService, InputParams } from '../../api';

const initialState: autocompleteState = {
  autocomplete: null,
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getAutocomplete = createAsyncThunk(
  'autocomplete/getAutocomplete',
  async (params: InputParams) => {
    const response = await autocompleteService.getAutocomplete(params);

    return response.data;
  },
);

const isPendingAction = isPending(getAutocomplete);
const isRejectedAction = isRejected(getAutocomplete);
const isFulfilledAction = isFulfilled(getAutocomplete);

export const autocompleteSlice = createSlice({
  name: 'autocomplete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAutocomplete.fulfilled, (state, { payload }) => {
      state.autocomplete = payload;
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.loading = RequestStatus.FAILED;
      state.error = error.message;
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.loading = RequestStatus.PENDING;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.loading = RequestStatus.SUCCESS;
      state.error = null;
    });
  },
});

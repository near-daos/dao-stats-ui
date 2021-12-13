/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';

import { RequestStatus } from '../../../store/types';
import { daoState } from './types';
import { autocompleteService, InputParams } from '../../../api';

const initialState: daoState = {
  autocomplete: null,
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getDao = createAsyncThunk(
  'autocomplete/getAutocomplete',
  async (params: InputParams) => {
    const response = await autocompleteService.getAutocomplete(params);

    return response.data;
  },
);

const isPendingAction = isPending(getDao);
const isRejectedAction = isRejected(getDao);
const isFulfilledAction = isFulfilled(getDao);

export const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDao.fulfilled, (state, { payload }) => {
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

import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
  createAction,
} from '@reduxjs/toolkit';

import { RequestStatus } from '../../../store/types';
import { DaoState } from './types';
import { daosService, InputParams, DaoParams } from '../../../api';

const initialState: DaoState = {
  autocomplete: null,
  dao: null,
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getDao = createAsyncThunk(
  'dao/getDao',
  async (params: DaoParams) => daosService.getDao(params),
);

export const getAutocompleteValue = createAsyncThunk(
  'dao/getAutocompleteValue',
  async (params: InputParams) => daosService.getAutocomplete(params),
);

export const clearDao = createAction('dao/clearDao');

const isPendingAction = isPending(getDao, getAutocompleteValue);
const isRejectedAction = isRejected(getDao, getAutocompleteValue);
const isFulfilledAction = isFulfilled(getDao, getAutocompleteValue);

export const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAutocompleteValue.fulfilled, (state, { payload }) => {
      state.autocomplete = payload.data;
    });

    builder.addCase(getDao.fulfilled, (state, { payload }) => {
      state.dao = payload.data;
    });

    builder.addCase(clearDao, (state) => {
      state.dao = null;
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

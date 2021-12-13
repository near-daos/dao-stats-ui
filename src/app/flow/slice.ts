/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';

import { RequestStatus } from '../../store/types';
import { flowState } from './types';
import { flowService, Params, DaoParams } from '../../api';

const initialState: flowState = {
  flow: null,
  flowDao: null,
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getFlow = createAsyncThunk(
  'flow/getFlow',
  async (params: Params) => {
    const response = await flowService.getFlow(params);

    return response.data;
  },
);

export const getFlowDao = createAsyncThunk(
  'flow/getFlowDao',
  async (params: DaoParams) => {
    const response = await flowService.getFlowDao(params);

    return response.data;
  },
);

const isPendingAction = isPending(getFlow, getFlowDao);
const isRejectedAction = isRejected(getFlow, getFlowDao);
const isFulfilledAction = isFulfilled(getFlow, getFlowDao);

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFlow.fulfilled, (state, { payload }) => {
      state.flow = payload;
    });

    builder.addCase(getFlowDao.fulfilled, (state, { payload }) => {
      state.flowDao = payload;
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

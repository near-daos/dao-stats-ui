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
  flowHistory: null,
  flowLeaderboard: null,
  flowTransactionsHistory: null,
  flowTransactionsLeaderboard: null,
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

export const getFlowHistory = createAsyncThunk(
  'flow/getFlowHistory',
  async (params: Params) => {
    const response = await flowService.getFlowHistory(params);

    return response.data;
  },
);

export const getFlowLeaderboard = createAsyncThunk(
  'flow/getFlowLeaderboard',
  async (params: Params) => {
    const response = await flowService.getFlowLeaderboard(params);

    return response.data;
  },
);

export const getFlowTransactionsHistory = createAsyncThunk(
  'flow/getFlowTransactionsHistory',
  async (params: Params) => {
    const response = await flowService.getFlowTransactionsHistory(params);

    return response.data;
  },
);

export const getFlowTransactionsLeaderboard = createAsyncThunk(
  'flow/getFlowTransactionsLeaderboard',
  async (params: Params) => {
    const response = await flowService.getFlowTransactionsLeaderboard(params);

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

    builder.addCase(getFlowHistory.fulfilled, (state, { payload }) => {
      state.flowHistory = payload;
    });

    builder.addCase(getFlowLeaderboard.fulfilled, (state, { payload }) => {
      state.flowLeaderboard = payload;
    });

    builder.addCase(
      getFlowTransactionsHistory.fulfilled,
      (state, { payload }) => {
        state.flowTransactionsHistory = payload;
      },
    );

    builder.addCase(
      getFlowTransactionsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.flowTransactionsLeaderboard = payload;
      },
    );

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

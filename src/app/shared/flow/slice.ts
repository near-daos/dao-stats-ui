/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isFulfilled,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {
  flowService,
  Params,
  DaoParams,
  FlowMetricsEntity,
  DaoHistoryParams,
} from 'src/api';
import { RequestStatus } from '../../../store/types';
import { flowState, FlowDaoEntity } from './types';

export const flowDaoAdapter = createEntityAdapter<FlowDaoEntity>();
export const flowDaoFundsAdapter = createEntityAdapter<FlowMetricsEntity>();
export const flowDaoTransactionsAdapter = createEntityAdapter<
  FlowMetricsEntity
>();

const initialState: flowState = {
  flow: null,
  flowHistory: null,
  flowLeaderboard: null,
  flowTransactionsHistory: null,
  flowTransactionsLeaderboard: null,
  flowDao: flowDaoAdapter.getInitialState(),
  flowDaoFunds: flowDaoFundsAdapter.getInitialState(),
  flowDaoTransactions: flowDaoTransactionsAdapter.getInitialState(),
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

    return { id: params.dao, ...response.data };
  },
);

export const getFlowDaoFunds = createAsyncThunk(
  'flow/getFlowDaoFunds',
  async (params: DaoHistoryParams) => {
    const response = await flowService.getFlowDaoFunds(params);

    return { id: params.dao, ...response.data };
  },
);

export const getFlowDaoTransactions = createAsyncThunk(
  'flow/getFlowDaoTransactions',
  async (params: DaoHistoryParams) => {
    const response = await flowService.getFlowDaoTransactions(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

const isRejectedAction = isRejected(
  getFlow,
  getFlowDao,
  getFlowHistory,
  getFlowLeaderboard,
  getFlowTransactionsHistory,
  getFlowTransactionsLeaderboard,
  getFlowDaoFunds,
  getFlowDaoTransactions,
);
const isFulfilledAction = isFulfilled(
  getFlow,
  getFlowDao,
  getFlowHistory,
  getFlowLeaderboard,
  getFlowTransactionsHistory,
  getFlowTransactionsLeaderboard,
  getFlowDaoFunds,
  getFlowDaoTransactions,
);

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFlow.fulfilled, (state, { payload }) => {
      state.flow = payload;
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

    builder.addCase(getFlowDao.fulfilled, (state, { payload }) => {
      flowDaoAdapter.upsertOne(state.flowDao, payload);
    });

    builder.addCase(getFlowDaoFunds.fulfilled, (state, { payload }) => {
      flowDaoFundsAdapter.upsertOne(state.flowDaoFunds, payload);
    });

    builder.addCase(getFlowDaoTransactions.fulfilled, (state, { payload }) => {
      flowDaoTransactionsAdapter.upsertOne(state.flowDaoTransactions, payload);
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.loading = RequestStatus.FAILED;
      state.error = error.message;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.loading = RequestStatus.SUCCESS;
      state.error = null;
    });
  },
});

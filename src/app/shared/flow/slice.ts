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
import { FlowState, FlowDaoEntity } from './types';

export const flowDaoAdapter = createEntityAdapter<FlowDaoEntity>();
export const flowDaoFundsAdapter = createEntityAdapter<FlowMetricsEntity>();
export const flowDaoTransactionsAdapter = createEntityAdapter<
  FlowMetricsEntity
>();

const initialState: FlowState = {
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
  async (params: Params) => flowService.getFlow(params),
);

export const getFlowHistory = createAsyncThunk(
  'flow/getFlowHistory',
  async (params: Params) => flowService.getFlowHistory(params),
);

export const getFlowLeaderboard = createAsyncThunk(
  'flow/getFlowLeaderboard',
  async (params: Params) => flowService.getFlowLeaderboard(params),
);

export const getFlowTransactionsHistory = createAsyncThunk(
  'flow/getFlowTransactionsHistory',
  async (params: Params) => flowService.getFlowTransactionsHistory(params),
);

export const getFlowTransactionsLeaderboard = createAsyncThunk(
  'flow/getFlowTransactionsLeaderboard',
  async (params: Params) => flowService.getFlowTransactionsLeaderboard(params),
);

export const getFlowDao = createAsyncThunk(
  'flow/getFlowDao',
  async (params: DaoParams) => flowService.getFlowDao(params),
);

export const getFlowDaoFunds = createAsyncThunk(
  'flow/getFlowDaoFunds',
  async (params: DaoHistoryParams) => flowService.getFlowDaoFunds(params),
);

export const getFlowDaoTransactions = createAsyncThunk(
  'flow/getFlowDaoTransactions',
  async (params: DaoHistoryParams) =>
    flowService.getFlowDaoTransactions(params),
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
      state.flow = payload.data;
    });

    builder.addCase(getFlowHistory.fulfilled, (state, { payload }) => {
      state.flowHistory = payload.data;
    });

    builder.addCase(getFlowLeaderboard.fulfilled, (state, { payload }) => {
      state.flowLeaderboard = payload.data;
    });

    builder.addCase(
      getFlowTransactionsHistory.fulfilled,
      (state, { payload }) => {
        state.flowTransactionsHistory = payload.data;
      },
    );

    builder.addCase(
      getFlowTransactionsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.flowTransactionsLeaderboard = payload.data;
      },
    );

    builder.addCase(
      getFlowDao.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        flowDaoAdapter.upsertOne(state.flowDao, { id: dao, ...payload.data });
      },
    );

    builder.addCase(
      getFlowDaoFunds.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        flowDaoFundsAdapter.upsertOne(state.flowDaoFunds, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getFlowDaoTransactions.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        flowDaoTransactionsAdapter.upsertOne(state.flowDaoTransactions, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.error = null;
    });
  },
});

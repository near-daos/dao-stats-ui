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
  HistoryParams,
} from 'src/api';
import { RequestStatus } from '../../../store/types';
import { flowState, FlowDaoEntity } from './types';

export const flowDaoAdapter = createEntityAdapter<FlowDaoEntity>();
export const flowDaoIncomingFundsAdapter = createEntityAdapter<
  FlowMetricsEntity
>();
export const flowDaoOutgoingFundsAdapter = createEntityAdapter<
  FlowMetricsEntity
>();
export const flowDaoIncomingTransactionsAdapter = createEntityAdapter<
  FlowMetricsEntity
>();
export const flowDaoOutgoingTransactionsAdapter = createEntityAdapter<
  FlowMetricsEntity
>();

const initialState: flowState = {
  flow: null,
  flowDaos: null,
  flowHistory: null,
  flowLeaderboard: null,
  flowTransactionsHistory: null,
  flowTransactionsLeaderboard: null,
  flowDao: flowDaoAdapter.getInitialState(),
  flowDaoIncomingFunds: flowDaoIncomingFundsAdapter.getInitialState(),
  flowDaoOutgoingFunds: flowDaoOutgoingFundsAdapter.getInitialState(),
  flowDaoIncomingTransactions: flowDaoIncomingTransactionsAdapter.getInitialState(),
  flowDaoOutgoingTransactions: flowDaoOutgoingTransactionsAdapter.getInitialState(),
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

    return { id: params.dao, ...response.data };
  },
);

export const getFlowDaos = createAsyncThunk(
  'flow/getFlowDaos',
  async (params: HistoryParams) => {
    const response = await flowService.getFlowDaos(params);

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

export const getFlowDaoIncomingFunds = createAsyncThunk(
  'flow/getFlowDaoIncomingFunds',
  async (params: DaoHistoryParams) => {
    const response = await flowService.getflowDaoIncomingFunds(params);

    return { id: params.dao, ...response.data };
  },
);

export const getFlowDaoOutgoingFunds = createAsyncThunk(
  'flow/getFlowDaoOutgoingFunds',
  async (params: DaoHistoryParams) => {
    const response = await flowService.getflowDaoOutgoingFunds(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

export const getFlowDaoIncomingTransactions = createAsyncThunk(
  'flow/getFlowDaoIncomingTransactions',
  async (params: DaoHistoryParams) => {
    const response = await flowService.getflowDaoIncomingTransactions(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

export const getFlowDaoOutgoingTransactions = createAsyncThunk(
  'flow/getFlowDaoOutgoingTransactions',
  async (params: DaoHistoryParams) => {
    const response = await flowService.getflowDaoOutgoingTransactions(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

const isRejectedAction = isRejected(
  getFlow,
  getFlowDao,
  getFlowDaos,
  getFlowHistory,
  getFlowLeaderboard,
  getFlowTransactionsHistory,
  getFlowTransactionsLeaderboard,
  getFlowDaoIncomingFunds,
  getFlowDaoOutgoingFunds,
  getFlowDaoIncomingTransactions,
  getFlowDaoOutgoingTransactions,
);
const isFulfilledAction = isFulfilled(
  getFlow,
  getFlowDao,
  getFlowDaos,
  getFlowHistory,
  getFlowLeaderboard,
  getFlowTransactionsHistory,
  getFlowTransactionsLeaderboard,
  getFlowDaoIncomingFunds,
  getFlowDaoOutgoingFunds,
  getFlowDaoIncomingTransactions,
  getFlowDaoOutgoingTransactions,
);

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFlow.fulfilled, (state, { payload }) => {
      state.flow = payload;
    });

    builder.addCase(getFlowDao.fulfilled, (state, { payload }) => {
      flowDaoAdapter.upsertOne(state.flowDao, payload);
    });

    builder.addCase(getFlowDaos.fulfilled, (state, { payload }) => {
      state.flowDaos = payload;
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

    builder.addCase(getFlowDaoIncomingFunds.fulfilled, (state, { payload }) => {
      flowDaoIncomingFundsAdapter.upsertOne(state.flowDaoIncomingFunds, {
        id: payload.id,
        metrics: payload.metrics,
      });
    });

    builder.addCase(getFlowDaoOutgoingFunds.fulfilled, (state, { payload }) => {
      flowDaoOutgoingFundsAdapter.upsertOne(state.flowDaoOutgoingFunds, {
        id: payload.id,
        metrics: payload.metrics,
      });
    });

    builder.addCase(
      getFlowDaoIncomingTransactions.fulfilled,
      (state, { payload }) => {
        flowDaoIncomingTransactionsAdapter.upsertOne(
          state.flowDaoIncomingTransactions,
          {
            id: payload.id,
            metrics: payload.metrics,
          },
        );
      },
    );

    builder.addCase(
      getFlowDaoOutgoingTransactions.fulfilled,
      (state, { payload }) => {
        flowDaoOutgoingTransactionsAdapter.upsertOne(
          state.flowDaoOutgoingTransactions,
          {
            id: payload.id,
            metrics: payload.metrics,
          },
        );
      },
    );

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

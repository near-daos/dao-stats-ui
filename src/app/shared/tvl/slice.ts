/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isFulfilled,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {
  tvlService,
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
  MetricsEntity,
} from 'src/api';

import { TvlDaoEntity, tvlState } from './types';

export const tvlDaoAdapter = createEntityAdapter<TvlDaoEntity>();
export const tvlDaoBountiesNumberAdapter = createEntityAdapter<MetricsEntity>();
export const tvlDaoBountiesVlAdapter = createEntityAdapter<MetricsEntity>();

const initialState: tvlState = {
  tvl: null,
  tvlTvl: null,
  tvlLeaderboard: null,
  tvlAvgTvl: null,
  tvlBountiesAndGrantsVL: null,
  tvlBountiesAndGrantsVlLeaderboard: null,
  tvlDao: tvlDaoAdapter.getInitialState(),
  tvlDaoBountiesNumber: tvlDaoBountiesNumberAdapter.getInitialState(),
  tvlDaoBountiesVl: tvlDaoBountiesVlAdapter.getInitialState(),
  error: null,
};

export const getTvl = createAsyncThunk(
  'governance/getTvl',
  async (params: Params) => {
    const response = await tvlService.getTvl(params);

    return response.data;
  },
);

export const getTvlHistory = createAsyncThunk(
  'governance/getTvlHistory',
  async (params: HistoryParams) => {
    const response = await tvlService.getTvlHistory(params);

    return response.data;
  },
);

export const getTvlLeaderboard = createAsyncThunk(
  'governance/getTvlLeaderboard',
  async (params: Params) => {
    const response = await tvlService.getTvlLeaderboard(params);

    return response.data;
  },
);

export const getTvlAvgTvl = createAsyncThunk(
  'governance/getTvlAvgTvl',
  async (params: HistoryParams) => {
    const response = await tvlService.getTvlAvgTvl(params);

    return response.data;
  },
);

export const getTvlBountiesAndGrantsVl = createAsyncThunk(
  'governance/getTvlBountiesAndGrantsVl',
  async (params: HistoryParams) => {
    const response = await tvlService.getTvlBountiesAndGrantsVl(params);

    return response.data;
  },
);

export const getTvlBountiesAndGrantsVlLeaderboard = createAsyncThunk(
  'governance/getTvlBountiesAndGrantsVlLeaderboard',
  async (params: Params) => {
    const response = await tvlService.getTvlBountiesAndGrantsVlLeaderboard(
      params,
    );

    return response.data;
  },
);

export const getTvlDao = createAsyncThunk(
  'governance/getTvlDao',
  async (params: DaoParams) => {
    const response = await tvlService.getTvlDao(params);

    return { id: params.dao, ...response.data };
  },
);

export const getTvlDaoBountiesNumber = createAsyncThunk(
  'governance/getTvlDaoBountiesNumber',
  async (params: DaoHistoryParams) => {
    const response = await tvlService.getTvlDaoBountiesNumber(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

export const getTvlDaoBountiesVl = createAsyncThunk(
  'governance/getTvlDaoBountiesVl',
  async (params: DaoHistoryParams) => {
    const response = await tvlService.getTvlDaoBountiesVl(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

const isRejectedAction = isRejected(
  getTvl,
  getTvlHistory,
  getTvlLeaderboard,
  getTvlAvgTvl,
  getTvlBountiesAndGrantsVl,
  getTvlBountiesAndGrantsVlLeaderboard,
  getTvlDao,
  getTvlDaoBountiesNumber,
  getTvlDaoBountiesVl,
);
const isFulfilledAction = isFulfilled(
  getTvl,
  getTvlHistory,
  getTvlLeaderboard,
  getTvlAvgTvl,
  getTvlBountiesAndGrantsVl,
  getTvlBountiesAndGrantsVlLeaderboard,
  getTvlDao,
  getTvlDaoBountiesNumber,
  getTvlDaoBountiesVl,
);

export const tvlSlice = createSlice({
  name: 'tvl',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTvl.fulfilled, (state, { payload }) => {
      state.tvl = payload;
    });

    builder.addCase(getTvlHistory.fulfilled, (state, { payload }) => {
      state.tvlTvl = payload;
    });

    builder.addCase(getTvlLeaderboard.fulfilled, (state, { payload }) => {
      state.tvlLeaderboard = payload;
    });

    builder.addCase(getTvlAvgTvl.fulfilled, (state, { payload }) => {
      state.tvlAvgTvl = payload;
    });

    builder.addCase(
      getTvlBountiesAndGrantsVl.fulfilled,
      (state, { payload }) => {
        state.tvlBountiesAndGrantsVL = payload;
      },
    );

    builder.addCase(
      getTvlBountiesAndGrantsVlLeaderboard.fulfilled,
      (state, { payload }) => {
        state.tvlBountiesAndGrantsVlLeaderboard = payload;
      },
    );

    builder.addCase(getTvlDao.fulfilled, (state, { payload }) => {
      tvlDaoAdapter.upsertOne(state.tvlDao, payload);
    });

    builder.addCase(getTvlDaoBountiesNumber.fulfilled, (state, { payload }) => {
      tvlDaoBountiesNumberAdapter.upsertOne(state.tvlDaoBountiesNumber, {
        id: payload.id,
        metrics: payload.metrics,
      });
    });

    builder.addCase(getTvlDaoBountiesVl.fulfilled, (state, { payload }) => {
      tvlDaoBountiesVlAdapter.upsertOne(state.tvlDaoBountiesVl, {
        id: payload.id,
        metrics: payload.metrics,
      });
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.error = null;
    });
  },
});

import {
  createSlice,
  createAsyncThunk,
  isRejected,
  createEntityAdapter,
  createAction,
} from '@reduxjs/toolkit';
import {
  tvlService,
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
  MetricsEntity,
} from 'src/api';

import { TvlDaoEntity, TvlState } from './types';

export const tvlDaoAdapter = createEntityAdapter<TvlDaoEntity>();
export const tvlDaoBountiesNumberAdapter = createEntityAdapter<MetricsEntity>();
export const tvlDaoBountiesVlAdapter = createEntityAdapter<MetricsEntity>();
export const tvlDaoTvlAdapter = createEntityAdapter<MetricsEntity>();

const initialState: TvlState = {
  tvl: null,
  tvlTvl: null,
  tvlLeaderboard: null,
  tvlAvgTvl: null,
  tvlBountiesAndGrantsVL: null,
  tvlBountiesAndGrantsVlLeaderboard: null,
  tvlDao: tvlDaoAdapter.getInitialState(),
  tvlDaoBountiesNumber: tvlDaoBountiesNumberAdapter.getInitialState(),
  tvlDaoBountiesVl: tvlDaoBountiesVlAdapter.getInitialState(),
  tvlDaoTvl: tvlDaoTvlAdapter.getInitialState(),
  error: null,
};

export const getTvl = createAsyncThunk(
  'governance/getTvl',
  async (params: Params) => tvlService.getTvl(params),
);

export const getTvlHistory = createAsyncThunk(
  'governance/getTvlHistory',
  async (params: HistoryParams) => tvlService.getTvlHistory(params),
);

export const getTvlLeaderboard = createAsyncThunk(
  'governance/getTvlLeaderboard',
  async (params: Params) => tvlService.getTvlLeaderboard(params),
);

export const getTvlAvgTvl = createAsyncThunk(
  'governance/getTvlAvgTvl',
  async (params: HistoryParams) => tvlService.getTvlAvgTvl(params),
);

export const getTvlBountiesAndGrantsVl = createAsyncThunk(
  'governance/getTvlBountiesAndGrantsVl',
  async (params: HistoryParams) => tvlService.getTvlBountiesAndGrantsVl(params),
);

export const getTvlBountiesAndGrantsVlLeaderboard = createAsyncThunk(
  'governance/getTvlBountiesAndGrantsVlLeaderboard',
  async (params: Params) =>
    tvlService.getTvlBountiesAndGrantsVlLeaderboard(params),
);

export const getTvlDao = createAsyncThunk(
  'governance/getTvlDao',
  async (params: DaoParams) => tvlService.getTvlDao(params),
);

export const getTvlDaoBountiesNumber = createAsyncThunk(
  'governance/getTvlDaoBountiesNumber',
  async (params: DaoHistoryParams) =>
    tvlService.getTvlDaoBountiesNumber(params),
);

export const getTvlDaoBountiesVl = createAsyncThunk(
  'governance/getTvlDaoBountiesVl',
  async (params: DaoHistoryParams) => tvlService.getTvlDaoBountiesVl(params),
);

export const getTvlDaoTvl = createAsyncThunk(
  'governance/getTvlDaoTvl',
  async (params: DaoHistoryParams) => tvlService.getTvlDaoTvl(params),
);

export const clearTvlError = createAction('tvl/clearTvlError');

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
  getTvlDaoTvl,
);

export const tvlSlice = createSlice({
  name: 'tvl',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTvl.fulfilled, (state, { payload }) => {
      state.tvl = payload.data;
    });

    builder.addCase(getTvlHistory.fulfilled, (state, { payload }) => {
      state.tvlTvl = payload.data;
    });

    builder.addCase(getTvlLeaderboard.fulfilled, (state, { payload }) => {
      state.tvlLeaderboard = payload.data;
    });

    builder.addCase(getTvlAvgTvl.fulfilled, (state, { payload }) => {
      state.tvlAvgTvl = payload.data;
    });

    builder.addCase(
      getTvlBountiesAndGrantsVl.fulfilled,
      (state, { payload }) => {
        state.tvlBountiesAndGrantsVL = payload.data;
      },
    );

    builder.addCase(
      getTvlBountiesAndGrantsVlLeaderboard.fulfilled,
      (state, { payload }) => {
        state.tvlBountiesAndGrantsVlLeaderboard = payload.data;
      },
    );

    builder.addCase(
      getTvlDao.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        tvlDaoAdapter.upsertOne(state.tvlDao, { id: dao, ...payload.data });
      },
    );

    builder.addCase(
      getTvlDaoBountiesNumber.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        tvlDaoBountiesNumberAdapter.upsertOne(state.tvlDaoBountiesNumber, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getTvlDaoBountiesVl.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        tvlDaoBountiesVlAdapter.upsertOne(state.tvlDaoBountiesVl, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getTvlDaoTvl.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        tvlDaoTvlAdapter.upsertOne(state.tvlDaoTvl, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(clearTvlError, (state) => {
      state.error = null;
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });
  },
});

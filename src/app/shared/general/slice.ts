/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isFulfilled,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';
import {
  generalService,
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
} from 'src/api';
import { buildMetrics } from 'src/utils';

import { generalState, MetricsEntity, GeneralDaoEntity } from './types';

export const generalDaoGroupsAdapter = createEntityAdapter<MetricsEntity>();
export const generalDaoAdapter = createEntityAdapter<GeneralDaoEntity>();

const initialState: generalState = {
  general: null,
  generalDaos: null,
  generalActive: null,
  generalActiveLeaderboard: null,
  generalGroups: null,
  generalGroupsLeaderboard: null,
  averageGroups: null,
  generalDao: generalDaoAdapter.getInitialState(),
  generalDaoGroups: generalDaoGroupsAdapter.getInitialState(),
  error: null,
};

export const getGeneral = createAsyncThunk(
  'general/getGeneral',
  async (params: Params) => {
    const response = await generalService.getGeneral(params);

    return response.data;
  },
);

export const getGeneralDao = createAsyncThunk(
  'general/getGeneralDao',
  async (params: DaoParams) => {
    const response = await generalService.getGeneralDao(params);

    return { id: params.dao, ...response.data };
  },
);

export const getGeneralDaos = createAsyncThunk(
  'general/getGeneralDaos',
  async (params: HistoryParams) => {
    const response = await generalService.getGeneralDaos(params);

    return response.data;
  },
);

export const getGeneralActive = createAsyncThunk(
  'general/getGeneralActive',
  async (params: HistoryParams) => {
    const response = await generalService.getGeneralActive(params);

    return response.data;
  },
);

export const getGeneralActiveLeaderboard = createAsyncThunk(
  'general/getGeneralActiveLeaderboard',
  async (params: Params) => {
    const response = await generalService.getGeneralActiveLeaderboard(params);

    return response.data;
  },
);

export const getGeneralGroups = createAsyncThunk(
  'general/getGeneralGroups',
  async (params: HistoryParams) => {
    const response = await generalService.getGeneralGroups(params);

    return response.data;
  },
);

export const getGeneralGroupsLeaderboard = createAsyncThunk(
  'general/getGeneralGroupsLeaderboard',
  async (params: Params) => {
    const response = await generalService.getGeneralGroupsLeaderboard(params);

    return response.data;
  },
);

export const getGeneralAverageGroups = createAsyncThunk(
  'general/getGeneralAverageGroups',
  async (params: Params) => {
    const response = await generalService.getGeneralAverageGroups(params);

    return response.data;
  },
);

export const getGeneralDaoGroups = createAsyncThunk(
  'general/getGeneralDaoGroups',
  async (params: DaoHistoryParams) => {
    const response = await generalService.getGeneralDaoGroups(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);
const isRejectedAction = isRejected(
  getGeneral,
  getGeneralActive,
  getGeneralActiveLeaderboard,
  getGeneralDao,
  getGeneralDaos,
  getGeneralGroups,
  getGeneralGroupsLeaderboard,
  getGeneralAverageGroups,
  getGeneralDaoGroups,
);
const isFulfilledAction = isFulfilled(
  getGeneral,
  getGeneralActive,
  getGeneralActiveLeaderboard,
  getGeneralDao,
  getGeneralDaos,
  getGeneralGroups,
  getGeneralGroupsLeaderboard,
  getGeneralAverageGroups,
  getGeneralDaoGroups,
);

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGeneral.fulfilled, (state, { payload }) => {
      state.general = payload;
    });

    builder.addCase(getGeneralDao.fulfilled, (state, { payload }) => {
      generalDaoAdapter.upsertOne(state.generalDao, payload);
    });

    builder.addCase(getGeneralDaos.fulfilled, (state, { payload }) => {
      state.generalDaos = { metrics: buildMetrics(payload.metrics) };
    });

    builder.addCase(getGeneralActive.fulfilled, (state, { payload }) => {
      state.generalActive = { metrics: buildMetrics(payload.metrics) };
    });

    builder.addCase(
      getGeneralActiveLeaderboard.fulfilled,
      (state, { payload }) => {
        state.generalActiveLeaderboard = payload;
      },
    );

    builder.addCase(getGeneralGroups.fulfilled, (state, { payload }) => {
      state.generalGroups = {
        metrics: buildMetrics(sortBy(payload.metrics, ['timestamp'])),
      };
    });

    builder.addCase(
      getGeneralGroupsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.generalGroupsLeaderboard = payload;
      },
    );

    builder.addCase(getGeneralAverageGroups.fulfilled, (state, { payload }) => {
      state.averageGroups = { metrics: buildMetrics(payload.metrics) };
    });

    builder.addCase(getGeneralDaoGroups.fulfilled, (state, { payload }) => {
      generalDaoGroupsAdapter.upsertOne(state.generalDaoGroups, {
        id: payload.id,
        metrics: buildMetrics(payload.metrics),
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

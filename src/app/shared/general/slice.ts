import {
  createSlice,
  createAsyncThunk,
  isRejected,
  createEntityAdapter,
  createAction,
} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';
import {
  generalService,
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
  MetricsEntity,
  MetricItem,
} from 'src/api';
import { buildMetrics } from 'src/utils';

import { GeneralDaoEntity, GeneralState } from './types';

export const generalDaoGroupsAdapter = createEntityAdapter<MetricsEntity>();
export const generalDaoActivityAdapter = createEntityAdapter<MetricsEntity>();
export const generalDaoAdapter = createEntityAdapter<GeneralDaoEntity>();

const initialState: GeneralState = {
  general: null,
  generalDaos: null,
  generalActive: null,
  generalActiveLeaderboard: null,
  generalGroups: null,
  generalGroupsLeaderboard: null,
  averageGroups: null,
  generalDao: generalDaoAdapter.getInitialState(),
  generalDaoGroups: generalDaoGroupsAdapter.getInitialState(),
  generalDaoActivity: generalDaoActivityAdapter.getInitialState(),
  error: null,
};

export const clearGeneralError = createAction('general/clearGeneralError');

export const getGeneral = createAsyncThunk(
  'general/getGeneral',
  async (params: Params) => generalService.getGeneral(params),
);

export const getGeneralDao = createAsyncThunk(
  'general/getGeneralDao',
  async (params: DaoParams) => generalService.getGeneralDao(params),
);

export const getGeneralDaos = createAsyncThunk(
  'general/getGeneralDaos',
  async (params: HistoryParams) => generalService.getGeneralDaos(params),
);

export const getGeneralActive = createAsyncThunk(
  'general/getGeneralActive',
  async (params: HistoryParams) => generalService.getGeneralActive(params),
);

export const getGeneralActiveLeaderboard = createAsyncThunk(
  'general/getGeneralActiveLeaderboard',
  async (params: Params) => generalService.getGeneralActiveLeaderboard(params),
);

export const getGeneralGroups = createAsyncThunk(
  'general/getGeneralGroups',
  async (params: HistoryParams) => generalService.getGeneralGroups(params),
);

export const getGeneralGroupsLeaderboard = createAsyncThunk(
  'general/getGeneralGroupsLeaderboard',
  async (params: Params) => generalService.getGeneralGroupsLeaderboard(params),
);

export const getGeneralAverageGroups = createAsyncThunk(
  'general/getGeneralAverageGroups',
  async (params: Params) => generalService.getGeneralAverageGroups(params),
);

export const getGeneralDaoGroups = createAsyncThunk(
  'general/getGeneralDaoGroups',
  async (params: DaoHistoryParams) =>
    generalService.getGeneralDaoGroups(params),
);

export const getGeneralDaoActivity = createAsyncThunk(
  'general/getGeneralDaoActivity',
  async (params: DaoHistoryParams) =>
    generalService.getGeneralDaoActivity(params),
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
  getGeneralDaoActivity,
);

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGeneral.fulfilled, (state, { payload }) => {
      state.general = payload.data;
    });

    builder.addCase(
      getGeneralDao.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        generalDaoAdapter.upsertOne(state.generalDao, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(getGeneralDaos.fulfilled, (state, { payload }) => {
      state.generalDaos = payload.data;
    });

    builder.addCase(getGeneralActive.fulfilled, (state, { payload }) => {
      state.generalActive = payload.data;
    });

    builder.addCase(
      getGeneralActiveLeaderboard.fulfilled,
      (state, { payload }) => {
        state.generalActiveLeaderboard = payload.data;
      },
    );

    builder.addCase(getGeneralGroups.fulfilled, (state, { payload }) => {
      state.generalGroups = {
        metrics: sortBy(payload.data.metrics, 'timestamp'),
      };
    });

    builder.addCase(
      getGeneralGroupsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.generalGroupsLeaderboard = payload.data;
      },
    );

    builder.addCase(getGeneralAverageGroups.fulfilled, (state, { payload }) => {
      state.averageGroups = payload.data;
    });

    builder.addCase(
      getGeneralDaoGroups.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        generalDaoGroupsAdapter.upsertOne(state.generalDaoGroups, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getGeneralDaoActivity.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        generalDaoActivityAdapter.upsertOne(state.generalDaoActivity, {
          id: dao,
          metrics: buildMetrics(payload.data.metrics, true) as MetricItem[],
        });
      },
    );

    builder.addCase(clearGeneralError, (state) => {
      state.error = null;
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });
  },
});

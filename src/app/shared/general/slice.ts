/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';
import { generalService, HistoryParams, Params, DaoParams } from 'src/api';
import { RequestStatus } from 'src/store/types';

import { generalState } from './types';

const initialState: generalState = {
  general: null,
  dao: null,
  generalDaos: null,
  generalActive: null,
  generalActiveLeaderboard: null,
  generalGroups: null,
  generalGroupsLeaderboard: null,
  averageGroups: null,
  loading: RequestStatus.NOT_ASKED,
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

    return response.data;
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

const isPendingAction = isPending(
  getGeneral,
  getGeneralActive,
  getGeneralActiveLeaderboard,
  getGeneralDao,
  getGeneralDaos,
  getGeneralGroups,
  getGeneralGroupsLeaderboard,
  getGeneralAverageGroups,
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
      state.dao = payload;
    });

    builder.addCase(getGeneralDaos.fulfilled, (state, { payload }) => {
      state.generalDaos = payload;
    });

    builder.addCase(getGeneralActive.fulfilled, (state, { payload }) => {
      state.generalActive = payload;
    });

    builder.addCase(
      getGeneralActiveLeaderboard.fulfilled,
      (state, { payload }) => {
        state.generalActiveLeaderboard = payload;
      },
    );

    builder.addCase(getGeneralGroups.fulfilled, (state, { payload }) => {
      state.generalGroups = {
        metrics: sortBy(payload.metrics, ['timestamp']),
      };
    });

    builder.addCase(
      getGeneralGroupsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.generalGroupsLeaderboard = payload;
      },
    );

    builder.addCase(getGeneralAverageGroups.fulfilled, (state, { payload }) => {
      state.averageGroups = payload;
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

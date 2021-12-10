/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';

import { RequestStatus } from '../../store/types';
import { generalState } from './types';
import { generalService, HistoryParams, Params, DaoParams } from '../../api';

const initialState: generalState = {
  general: null,
  dao: null,
  generalDaos: null,
  generalActivity: null,
  generalActivityLeaderboard: null,
  generalGroups: null,
  generalGroupsLeaderboard: null,
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

export const getGeneralActivity = createAsyncThunk(
  'general/getGeneralActivity',
  async (params: HistoryParams) => {
    const response = await generalService.getGeneralActivity(params);

    return response.data;
  },
);

export const getGeneralActivityLeaderboard = createAsyncThunk(
  'general/getGeneralActivityLeaderboard',
  async (params: Params) => {
    const response = await generalService.getGeneralActivityLeaderboard(params);

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

const isPendingAction = isPending(
  getGeneral,
  getGeneralActivity,
  getGeneralActivityLeaderboard,
  getGeneralDao,
  getGeneralDaos,
  getGeneralGroups,
  getGeneralGroupsLeaderboard,
);
const isRejectedAction = isRejected(
  getGeneral,
  getGeneralActivity,
  getGeneralActivityLeaderboard,
  getGeneralDao,
  getGeneralDaos,
  getGeneralGroups,
  getGeneralGroupsLeaderboard,
);
const isFulfilledAction = isFulfilled(
  getGeneral,
  getGeneralActivity,
  getGeneralActivityLeaderboard,
  getGeneralDao,
  getGeneralDaos,
  getGeneralGroups,
  getGeneralGroupsLeaderboard,
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

    builder.addCase(getGeneralActivity.fulfilled, (state, { payload }) => {
      state.generalActivity = payload;
    });

    builder.addCase(
      getGeneralActivityLeaderboard.fulfilled,
      (state, { payload }) => {
        state.generalActivityLeaderboard = payload;
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

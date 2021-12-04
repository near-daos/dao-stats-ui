/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';
import { RequestStatus } from '../../store/types';
import { generalState } from './types';
import {
  generalService,
  HistoryParams,
  Params,
  DaoHistoryParams,
} from '../../api';

const initialState: generalState = {
  general: {
    dao: { count: 0, growth: 0 },
    activity: { count: 0, growth: 0 },
    groups: { count: 0, growth: 0 },
  },
  dao: {
    dao: { count: 0, growth: 0 },
    activity: { count: 0, growth: 0 },
    groups: { count: 0, growth: 0 },
  },
  leaderboard: { metrics: [] },
  history: { metrics: [] },
  daoHistory: { metrics: [] },
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getGeneral = createAsyncThunk(
  'general/getGeneral',
  async (params: Params) => generalService.getGeneral(params),
);

export const getGeneralActivity = createAsyncThunk(
  'general/getGeneralActivity',
  async (params: HistoryParams) => generalService.getGeneralActivity(params),
);

export const getGeneralActivityLeaderboard = createAsyncThunk(
  'general/getGeneralActivityLeaderboard',
  async (params: Params) =>
    generalService.getGeneralActivityLeaderboard(params),
);

export const getGeneralDao = createAsyncThunk(
  'general/getGeneralDao',
  async (params: DaoHistoryParams) => generalService.getGeneralDao(params),
);

export const getGeneralDaos = createAsyncThunk(
  'general/getGeneralDaos',
  async (params: DaoHistoryParams) => generalService.getGeneralDaos(params),
);

const isPendingAction = isPending(
  getGeneral,
  getGeneralActivity,
  getGeneralActivityLeaderboard,
  getGeneralDao,
  getGeneralDaos,
);
const isRejectedAction = isRejected(
  getGeneral,
  getGeneralActivity,
  getGeneralActivityLeaderboard,
  getGeneralDao,
  getGeneralDaos,
);
const isFulfilledAction = isFulfilled(
  getGeneral,
  getGeneralActivity,
  getGeneralActivityLeaderboard,
  getGeneralDao,
  getGeneralDaos,
);

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGeneral.fulfilled, (state, { payload }) => {
      state.general = payload.data;
    });

    builder.addCase(getGeneralActivity.fulfilled, (state, { payload }) => {
      state.history = payload.data;
    });

    builder.addCase(
      getGeneralActivityLeaderboard.fulfilled,
      (state, { payload }) => {
        state.leaderboard = payload.data;
      },
    );

    builder.addCase(getGeneralDao.fulfilled, (state, { payload }) => {
      state.dao = payload.data;
    });

    builder.addCase(getGeneralDaos.fulfilled, (state, { payload }) => {
      state.daoHistory = payload.data;
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

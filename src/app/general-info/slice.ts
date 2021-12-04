/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';
import { RequestStatus } from '../../store/types';
import { generalInfoState } from './types';
import { generalInfoService } from '../../api/general-info';
import { HistoryParams, Params, DaoHistoryParams } from '../../api/types';

const initialState: generalInfoState = {
  generalInfo: {
    dao: null,
    activity: null,
    groups: null,
  },
  dao: {
    dao: null,
    activity: null,
    groups: null,
  },
  leaderboard: { metrics: [] },
  history: { metrics: [] },
  daoHistory: { metrics: [] },
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getGeneralInfo = createAsyncThunk(
  'generalInfo/getGeneralInfo',
  async (params: Params) => generalInfoService.getGeneralInfo(params),
);

export const getGeneralInfoActivity = createAsyncThunk(
  'generalInfo/getGeneralInfoActivity',
  async (params: HistoryParams) =>
    generalInfoService.getGeneralInfoActivity(params),
);

export const getGeneralInfoActivityLeaderboard = createAsyncThunk(
  'generalInfo/getGeneralInfoActivityLeaderboard',
  async (params: Params) =>
    generalInfoService.getGeneralInfoActivityLeaderboard(params),
);

export const getGeneralInfoDao = createAsyncThunk(
  'generalInfo/getGeneralInfoDao',
  async (params: DaoHistoryParams) =>
    generalInfoService.getGeneralInfoDao(params),
);

export const getGeneralInfoDaos = createAsyncThunk(
  'generalInfo/getGeneralDaos',
  async (params: DaoHistoryParams) => generalInfoService.getGeneralDaos(params),
);

const isPendingAction = isPending(
  getGeneralInfo,
  getGeneralInfoActivity,
  getGeneralInfoActivityLeaderboard,
  getGeneralInfoDao,
  getGeneralInfoDaos,
);
const isRejectedAction = isRejected(
  getGeneralInfo,
  getGeneralInfoActivity,
  getGeneralInfoActivityLeaderboard,
  getGeneralInfoDao,
  getGeneralInfoDaos,
);
const isFulfilledAction = isFulfilled(
  getGeneralInfo,
  getGeneralInfoActivity,
  getGeneralInfoActivityLeaderboard,
  getGeneralInfoDao,
  getGeneralInfoDaos,
);

export const generalInfoSlice = createSlice({
  name: 'generalInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGeneralInfo.fulfilled, (state, { payload }) => {
      state.generalInfo = payload.data;
    });

    builder.addCase(getGeneralInfoActivity.fulfilled, (state, { payload }) => {
      state.history = payload.data;
    });

    builder.addCase(
      getGeneralInfoActivityLeaderboard.fulfilled,
      (state, { payload }) => {
        state.leaderboard = payload.data;
      },
    );

    builder.addCase(getGeneralInfoDao.fulfilled, (state, { payload }) => {
      state.dao = payload.data;
    });

    builder.addCase(getGeneralInfoDaos.fulfilled, (state, { payload }) => {
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

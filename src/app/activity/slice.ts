/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';
import { RequestStatus } from '../../store/types';
import { activityState } from './types';
import {
  activityService,
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
} from '../../api';

const initialState: activityState = {
  activity: null,
  activityProposals: null,
  activityProposalsLeaderboard: null,
  activityProposalsTypes: null,
  activityProposalsTypesLeaderboard: null,
  activityRate: null,
  activityRateLeaderboard: null,
  activityDao: null,
  activityDaoProposals: null,
  activityDaoProposalsTypes: null,
  activityDaoRate: null,
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getActivity = createAsyncThunk(
  'activity/getActivity',
  async (params: Params) => activityService.getActivity(params),
);

export const getActivityProposals = createAsyncThunk(
  'activity/getActivityProposals',
  async (params: HistoryParams) => activityService.getActivityProposals(params),
);

export const getActivityProposalsLeaderboard = createAsyncThunk(
  'activity/getActivityProposalsLeaderboard',
  async (params: Params) =>
    activityService.getActivityProposalsLeaderboard(params),
);

export const getActivityProposalsTypes = createAsyncThunk(
  'activity/getActivityProposalsTypes',
  async (params: HistoryParams) =>
    activityService.getActivityProposalsTypes(params),
);

export const getActivityProposalsTypesLeaderboard = createAsyncThunk(
  'activity/getActivityProposalsTypesLeaderboard',
  async (params: Params) =>
    activityService.getActivityProposalsTypesLeaderboard(params),
);

export const getActivityRate = createAsyncThunk(
  'activity/getActivityRate',
  async (params: HistoryParams) => activityService.getActivityRate(params),
);

export const getActivityRateLeaderboard = createAsyncThunk(
  'activity/getActivityRateLeaderboard',
  async (params: Params) => activityService.getActivityRateLeaderboard(params),
);

export const getActivityDao = createAsyncThunk(
  'activity/getActivityDao',
  async (params: DaoParams) => activityService.getActivityDao(params),
);

export const getActivityDaoProposals = createAsyncThunk(
  'activity/getActivityDaoProposals',
  async (params: DaoHistoryParams) =>
    activityService.getActivityDaoProposals(params),
);

export const getActivityDaoProposalsTypes = createAsyncThunk(
  'activity/getActivityDaoProposalsTypes',
  async (params: DaoHistoryParams) =>
    activityService.getActivityDaoProposalsTypes(params),
);

export const getActivityDaoRate = createAsyncThunk(
  'activity/getActivityDaoRate',
  async (params: DaoHistoryParams) =>
    activityService.getActivityDaoRate(params),
);

const isPendingAction = isPending(
  getActivity,
  getActivityProposals,
  getActivityProposalsLeaderboard,
  getActivityProposalsTypes,
  getActivityRate,
  getActivityRateLeaderboard,
  getActivityDao,
  getActivityDaoProposals,
  getActivityDaoProposalsTypes,
  getActivityDaoRate,
);
const isRejectedAction = isRejected(
  getActivity,
  getActivityProposals,
  getActivityProposalsLeaderboard,
  getActivityProposalsTypes,
  getActivityRate,
  getActivityRateLeaderboard,
  getActivityDao,
  getActivityDaoProposals,
  getActivityDaoProposalsTypes,
  getActivityDaoRate,
);
const isFulfilledAction = isFulfilled(
  getActivity,
  getActivityProposals,
  getActivityProposalsLeaderboard,
  getActivityProposalsTypes,
  getActivityRate,
  getActivityRateLeaderboard,
  getActivityDao,
  getActivityDaoProposals,
  getActivityDaoProposalsTypes,
  getActivityDaoRate,
);

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getActivity.fulfilled, (state, { payload }) => {
      state.activity = payload.data;
    });

    builder.addCase(getActivityProposals.fulfilled, (state, { payload }) => {
      state.activityProposals = payload.data;
    });

    builder.addCase(
      getActivityProposalsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.activityProposalsLeaderboard = payload.data;
      },
    );

    builder.addCase(
      getActivityProposalsTypes.fulfilled,
      (state, { payload }) => {
        state.activityProposalsTypes = payload.data;
      },
    );

    builder.addCase(getActivityRate.fulfilled, (state, { payload }) => {
      state.activityRate = payload.data;
    });

    builder.addCase(
      getActivityRateLeaderboard.fulfilled,
      (state, { payload }) => {
        state.activityRateLeaderboard = payload.data;
      },
    );

    builder.addCase(getActivityDao.fulfilled, (state, { payload }) => {
      state.activityDao = payload.data;
    });

    builder.addCase(getActivityDaoProposals.fulfilled, (state, { payload }) => {
      state.activityDaoProposals = payload.data;
    });

    builder.addCase(
      getActivityDaoProposalsTypes.fulfilled,
      (state, { payload }) => {
        state.activityDaoProposalsTypes = payload.data;
      },
    );

    builder.addCase(getActivityDaoRate.fulfilled, (state, { payload }) => {
      state.activityDaoRate = payload.data;
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

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
  async (params: Params) => {
    const response = await activityService.getActivity(params);

    return response.data;
  },
);

export const getActivityProposals = createAsyncThunk(
  'activity/getActivityProposals',
  async (params: HistoryParams) => {
    const response = await activityService.getActivityProposals(params);

    return response.data;
  },
);

export const getActivityProposalsLeaderboard = createAsyncThunk(
  'activity/getActivityProposalsLeaderboard',
  async (params: Params) => {
    const response = await activityService.getActivityProposalsLeaderboard(
      params,
    );

    return response.data;
  },
);

export const getActivityProposalsTypes = createAsyncThunk(
  'activity/getActivityProposalsTypes',
  async (params: HistoryParams) => {
    const response = await activityService.getActivityProposalsTypes(params);

    return response.data;
  },
);

export const getActivityProposalsTypesLeaderboard = createAsyncThunk(
  'activity/getActivityProposalsTypesLeaderboard',
  async (params: Params) => {
    const response = await activityService.getActivityProposalsTypesLeaderboard(
      params,
    );

    return response.data;
  },
);

export const getActivityRate = createAsyncThunk(
  'activity/getActivityRate',
  async (params: HistoryParams) => {
    const response = await activityService.getActivityRate(params);

    return response.data;
  },
);

export const getActivityRateLeaderboard = createAsyncThunk(
  'activity/getActivityRateLeaderboard',
  async (params: Params) => {
    const response = await activityService.getActivityRateLeaderboard(params);

    return response.data;
  },
);

export const getActivityDao = createAsyncThunk(
  'activity/getActivityDao',
  async (params: DaoParams) => {
    const response = await activityService.getActivityDao(params);

    return response.data;
  },
);

export const getActivityDaoProposals = createAsyncThunk(
  'activity/getActivityDaoProposals',
  async (params: DaoHistoryParams) => {
    const response = await activityService.getActivityDaoProposals(params);

    return response.data;
  },
);

export const getActivityDaoProposalsTypes = createAsyncThunk(
  'activity/getActivityDaoProposalsTypes',
  async (params: DaoHistoryParams) => {
    const response = await activityService.getActivityDaoProposalsTypes(params);

    return response.data;
  },
);

export const getActivityDaoRate = createAsyncThunk(
  'activity/getActivityDaoRate',
  async (params: DaoHistoryParams) => {
    const response = await activityService.getActivityDaoRate(params);

    return response.data;
  },
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
      state.activity = payload;
    });

    builder.addCase(getActivityProposals.fulfilled, (state, { payload }) => {
      state.activityProposals = payload;
    });

    builder.addCase(
      getActivityProposalsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.activityProposalsLeaderboard = payload;
      },
    );

    builder.addCase(
      getActivityProposalsTypes.fulfilled,
      (state, { payload }) => {
        state.activityProposalsTypes = {
          metrics: {
            payout: sortBy(payload.metrics.payout, 'timestamp'),
            councilMember: sortBy(payload.metrics.councilMember, 'timestamp'),
            policyChange: sortBy(payload.metrics.policyChange, 'timestamp'),
            expired: sortBy(payload.metrics.expired, 'timestamp'),
          },
        };
      },
    );
    builder.addCase(
      getActivityProposalsTypesLeaderboard.fulfilled,
      (state, { payload }) => {
        state.activityProposalsTypesLeaderboard = payload;
      },
    );

    builder.addCase(getActivityRate.fulfilled, (state, { payload }) => {
      state.activityRate = payload;
    });

    builder.addCase(
      getActivityRateLeaderboard.fulfilled,
      (state, { payload }) => {
        state.activityRateLeaderboard = payload;
      },
    );

    builder.addCase(getActivityDao.fulfilled, (state, { payload }) => {
      state.activityDao = payload;
    });

    builder.addCase(getActivityDaoProposals.fulfilled, (state, { payload }) => {
      state.activityDaoProposals = payload;
    });

    builder.addCase(
      getActivityDaoProposalsTypes.fulfilled,
      (state, { payload }) => {
        state.activityDaoProposalsTypes = payload;
      },
    );

    builder.addCase(getActivityDaoRate.fulfilled, (state, { payload }) => {
      state.activityDaoRate = payload;
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

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
import { activityService } from '../../api/activity';
import {
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
} from '../../api/types';

const initialState: activityState = {
  activity: {
    proposals: null,
    rate: null,
    ratio: null,
  },
  dao: {
    proposals: null,
    rate: null,
    ratio: null,
  },
  history: { metrics: [] },
  daoHistory: { metrics: [] },
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getActivity = createAsyncThunk(
  'activity/getActivity',
  async (params: Params) => activityService.getActivity(params),
);

export const getActivityHistory = createAsyncThunk(
  'activity/getActivityHistory',
  async (params: HistoryParams) => activityService.getActivityHistory(params),
);

export const getActivityDao = createAsyncThunk(
  'activity/getActivityDao',
  async (params: DaoParams) => activityService.getActivityDao(params),
);

export const getActivityDaoHistory = createAsyncThunk(
  'activity/getActivityDaoHistory',
  async (params: DaoHistoryParams) =>
    activityService.getActivityDaoHistory(params),
);

const isPendingAction = isPending(
  getActivity,
  getActivityHistory,
  getActivityDao,
  getActivityDaoHistory,
);
const isRejectedAction = isRejected(
  getActivity,
  getActivityHistory,
  getActivityDao,
  getActivityDaoHistory,
);
const isFulfilledAction = isFulfilled(
  getActivity,
  getActivityHistory,
  getActivityDao,
  getActivityDaoHistory,
);

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getActivity.fulfilled, (state, { payload }) => {
      state.activity = payload.data;
    });

    builder.addCase(getActivityHistory.fulfilled, (state, { payload }) => {
      state.history = payload.data;
    });

    builder.addCase(getActivityDao.fulfilled, (state, { payload }) => {
      state.dao = payload.data;
    });

    builder.addCase(getActivityDaoHistory.fulfilled, (state, { payload }) => {
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

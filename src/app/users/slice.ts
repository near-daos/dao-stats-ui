/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';
import { RequestStatus } from '../../store/types';
import { usersState } from './types';
import {
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
  usersService,
} from '../../api';

const initialState: usersState = {
  users: {
    users: { count: 0, growth: 0 },
    councilSize: { count: 0, growth: 0 },
    interactions: { count: 0, growth: 0 },
  },
  dao: {
    users: { count: 0, growth: 0 },
    councilSize: { count: 0, growth: 0 },
    interactions: { count: 0, growth: 0 },
  },
  history: { metrics: [] },
  daoHistory: { metrics: [] },
  leaderboard: { metrics: [] },
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (params: Params) => usersService.getUsers(params),
);

export const getUsersHistory = createAsyncThunk(
  'users/getUsersHistory',
  async (params: HistoryParams) => usersService.getUsersHistory(params),
);

export const getUsersDao = createAsyncThunk(
  'users/getUsersDao',
  async (params: DaoParams) => usersService.getUsersDao(params),
);

export const getUsersDaoHistory = createAsyncThunk(
  'users/getUsersDaoHistory',
  async (params: DaoHistoryParams) => usersService.getUsersDaoHistory(params),
);

export const getUsersLeaderboard = createAsyncThunk(
  'users/getUsersLeaderboard',
  async (params: Params) => usersService.getUsersLeaderboard(params),
);

const isPendingAction = isPending(
  getUsers,
  getUsersHistory,
  getUsersDao,
  getUsersDaoHistory,
  getUsersLeaderboard,
);
const isRejectedAction = isRejected(
  getUsers,
  getUsersHistory,
  getUsersDao,
  getUsersDaoHistory,
  getUsersLeaderboard,
);
const isFulfilledAction = isFulfilled(
  getUsers,
  getUsersHistory,
  getUsersDao,
  getUsersDaoHistory,
  getUsersLeaderboard,
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload.data;
    });

    builder.addCase(getUsersHistory.fulfilled, (state, { payload }) => {
      state.history = payload.data;
    });

    builder.addCase(getUsersDao.fulfilled, (state, { payload }) => {
      state.dao = payload.data;
    });

    builder.addCase(getUsersDaoHistory.fulfilled, (state, { payload }) => {
      state.daoHistory = payload.data;
    });

    builder.addCase(getUsersLeaderboard.fulfilled, (state, { payload }) => {
      state.leaderboard = payload.data;
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

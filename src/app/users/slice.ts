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
  users: null,
  dao: null,
  history: null,
  daoHistory: null,
  leaderboard: null,
  usersInteractions: null,
  usersInteractionsLeaderboard: null,
  usersAveragePerDaoHistory: null,
  usersInteractionsPerDaoHistory: null,
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (params: Params) => {
    const response = await usersService.getUsers(params);

    return response.data;
  },
);

export const getUsersHistory = createAsyncThunk(
  'users/getUsersHistory',
  async (params: HistoryParams) => {
    const response = await usersService.getUsersHistory(params);

    return response.data;
  },
);

export const getUsersDao = createAsyncThunk(
  'users/getUsersDao',
  async (params: DaoParams) => {
    const response = await usersService.getUsersDao(params);

    return response.data;
  },
);

export const getUsersDaoHistory = createAsyncThunk(
  'users/getUsersDaoHistory',
  async (params: DaoHistoryParams) => {
    const response = await usersService.getUsersDaoHistory(params);

    return response.data;
  },
);

export const getUsersLeaderboard = createAsyncThunk(
  'users/getUsersLeaderboard',
  async (params: Params) => {
    const response = await usersService.getUsersLeaderboard(params);

    return response.data;
  },
);

export const getUsersInteractionsHistory = createAsyncThunk(
  'users/getUsersInteractionsHistory',
  async (params: HistoryParams) => {
    const response = await usersService.getUsersInteractionsHistory(params);

    return response.data;
  },
);

export const getUsersInteractionsLeaderboard = createAsyncThunk(
  'users/getUsersInteractionsLeaderboard',
  async (params: Params) => {
    const response = await usersService.getUsersInteractionsLeaderboard(params);

    return response.data;
  },
);

export const getUsersAveragePerDaoHistory = createAsyncThunk(
  'users/getUsersAveragePerDaoHistory',
  async (params: HistoryParams) => {
    const response = await usersService.getUsersAveragePerDaoHistory(params);

    return response.data;
  },
);

export const getUsersInteractionsPerDaoHistory = createAsyncThunk(
  'users/getUsersInteractionsPerDaoHistory',
  async (params: HistoryParams) => {
    const response = await usersService.getUsersInteractionsPerDaoHistory(
      params,
    );

    return response.data;
  },
);

const isPendingAction = isPending(
  getUsers,
  getUsersHistory,
  getUsersDao,
  getUsersDaoHistory,
  getUsersLeaderboard,
  getUsersInteractionsHistory,
  getUsersInteractionsLeaderboard,
  getUsersAveragePerDaoHistory,
  getUsersInteractionsPerDaoHistory,
);
const isRejectedAction = isRejected(
  getUsers,
  getUsersHistory,
  getUsersDao,
  getUsersDaoHistory,
  getUsersLeaderboard,
  getUsersInteractionsHistory,
  getUsersInteractionsLeaderboard,
  getUsersAveragePerDaoHistory,
  getUsersInteractionsPerDaoHistory,
);
const isFulfilledAction = isFulfilled(
  getUsers,
  getUsersHistory,
  getUsersDao,
  getUsersDaoHistory,
  getUsersLeaderboard,
  getUsersInteractionsHistory,
  getUsersInteractionsLeaderboard,
  getUsersAveragePerDaoHistory,
  getUsersInteractionsPerDaoHistory,
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });

    builder.addCase(getUsersHistory.fulfilled, (state, { payload }) => {
      state.history = payload;
    });

    builder.addCase(getUsersDao.fulfilled, (state, { payload }) => {
      state.dao = payload;
    });

    builder.addCase(getUsersDaoHistory.fulfilled, (state, { payload }) => {
      state.daoHistory = payload;
    });

    builder.addCase(getUsersLeaderboard.fulfilled, (state, { payload }) => {
      state.leaderboard = payload;
    });

    builder.addCase(
      getUsersInteractionsHistory.fulfilled,
      (state, { payload }) => {
        state.usersInteractions = payload;
      },
    );

    builder.addCase(
      getUsersInteractionsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.usersInteractionsLeaderboard = payload;
      },
    );

    builder.addCase(
      getUsersAveragePerDaoHistory.fulfilled,
      (state, { payload }) => {
        state.usersAveragePerDaoHistory = payload;
      },
    );

    builder.addCase(
      getUsersInteractionsPerDaoHistory.fulfilled,
      (state, { payload }) => {
        state.usersInteractionsPerDaoHistory = payload;
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

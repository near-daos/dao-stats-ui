/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isFulfilled,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';
import {
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
  usersService,
  MetricsEntity,
} from 'src/api';

import { UsersDaoEntity, usersState } from './types';

export const usersDaoAdapter = createEntityAdapter<UsersDaoEntity>();
export const usersDaoUsersAdapter = createEntityAdapter<MetricsEntity>();
export const usersDaoMembersAdapter = createEntityAdapter<MetricsEntity>();
export const usersDaoInteractionsAdapter = createEntityAdapter<MetricsEntity>();

const initialState: usersState = {
  users: null,
  usersUsers: null,
  usersLeaderboard: null,
  usersMembers: null,
  usersMembersLeaderboard: null,
  usersAverageUsers: null,
  usersInteractions: null,
  usersInteractionsLeaderboard: null,
  usersAverageInteractions: null,
  usersDao: usersDaoAdapter.getInitialState(),
  usersDaoUsers: usersDaoUsersAdapter.getInitialState(),
  usersDaoMembers: usersDaoMembersAdapter.getInitialState(),
  usersDaoInteractions: usersDaoInteractionsAdapter.getInitialState(),
  error: null,
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (params: Params) => {
    const response = await usersService.getUsers(params);

    return response.data;
  },
);

export const getUsersUsers = createAsyncThunk(
  'users/getUsersUsers',
  async (params: HistoryParams) => {
    const response = await usersService.getUsersUsers(params);

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

export const getUsersMembers = createAsyncThunk(
  'users/getUsersMembers',
  async (params: HistoryParams) => {
    const response = await usersService.getUsersMembers(params);

    return response.data;
  },
);

export const getUsersMembersLeaderboard = createAsyncThunk(
  'users/getUsersMembersLeaderboard',
  async (params: Params) => {
    const response = await usersService.getUsersMembersLeaderboard(params);

    return response.data;
  },
);

export const getUsersAverageUsers = createAsyncThunk(
  'users/getUsersAverageUsers',
  async (params: HistoryParams) => {
    const response = await usersService.getUsersAverageUsers(params);

    return response.data;
  },
);

export const getUsersInteractions = createAsyncThunk(
  'users/getUsersInteractions',
  async (params: HistoryParams) => {
    const response = await usersService.getUsersInteractions(params);

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

export const getUsersAverageInteractions = createAsyncThunk(
  'users/getUsersAverageInteractions',
  async (params: HistoryParams) => {
    const response = await usersService.getUsersAverageInteractions(params);

    return response.data;
  },
);

export const getUsersDao = createAsyncThunk(
  'users/getUsersDao',
  async (params: DaoParams) => {
    const response = await usersService.getUsersDao(params);

    return { id: params.dao, ...response.data };
  },
);

export const getUsersDaoUsers = createAsyncThunk(
  'users/getUsersDaoUsers',
  async (params: DaoHistoryParams) => {
    const response = await usersService.getUsersDaoUsers(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

export const getUsersDaoMembers = createAsyncThunk(
  'users/getUsersDaoMembers',
  async (params: DaoHistoryParams) => {
    const response = await usersService.getUsersDaoMembers(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

export const getUsersDaoInteractions = createAsyncThunk(
  'users/getUsersDaoInteractions',
  async (params: DaoHistoryParams) => {
    const response = await usersService.getUsersDaoInteractions(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

const isRejectedAction = isRejected(
  getUsers,
  getUsersUsers,
  getUsersLeaderboard,
  getUsersMembers,
  getUsersMembersLeaderboard,
  getUsersAverageUsers,
  getUsersInteractions,
  getUsersInteractionsLeaderboard,
  getUsersAverageInteractions,
  getUsersDao,
  getUsersDaoUsers,
  getUsersDaoMembers,
  getUsersDaoInteractions,
);

const isFulfilledAction = isFulfilled(
  getUsers,
  getUsersUsers,
  getUsersLeaderboard,
  getUsersMembers,
  getUsersMembersLeaderboard,
  getUsersAverageUsers,
  getUsersInteractions,
  getUsersInteractionsLeaderboard,
  getUsersAverageInteractions,
  getUsersDao,
  getUsersDaoUsers,
  getUsersDaoMembers,
  getUsersDaoInteractions,
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });

    builder.addCase(getUsersUsers.fulfilled, (state, { payload }) => {
      state.usersUsers = {
        metrics: payload.metrics,
      };
    });

    builder.addCase(getUsersLeaderboard.fulfilled, (state, { payload }) => {
      state.usersLeaderboard = payload;
    });

    builder.addCase(getUsersMembers.fulfilled, (state, { payload }) => {
      state.usersMembers = {
        metrics: payload.metrics,
      };
    });

    builder.addCase(
      getUsersMembersLeaderboard.fulfilled,
      (state, { payload }) => {
        state.usersMembersLeaderboard = payload;
      },
    );

    builder.addCase(getUsersAverageUsers.fulfilled, (state, { payload }) => {
      state.usersAverageUsers = {
        metrics: payload.metrics,
      };
    });

    builder.addCase(getUsersInteractions.fulfilled, (state, { payload }) => {
      state.usersInteractions = {
        metrics: payload.metrics,
      };
    });

    builder.addCase(
      getUsersInteractionsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.usersInteractionsLeaderboard = payload;
      },
    );

    builder.addCase(
      getUsersAverageInteractions.fulfilled,
      (state, { payload }) => {
        state.usersAverageInteractions = {
          metrics: sortBy(payload.metrics, 'timestamp'),
        };
      },
    );

    builder.addCase(getUsersDao.fulfilled, (state, { payload }) => {
      usersDaoAdapter.upsertOne(state.usersDao, payload);
    });

    builder.addCase(getUsersDaoUsers.fulfilled, (state, { payload }) => {
      usersDaoUsersAdapter.upsertOne(state.usersDaoUsers, {
        id: payload.id,
        metrics: payload.metrics,
      });
    });

    builder.addCase(getUsersDaoMembers.fulfilled, (state, { payload }) => {
      usersDaoMembersAdapter.upsertOne(state.usersDaoMembers, {
        id: payload.id,
        metrics: payload.metrics,
      });
    });

    builder.addCase(getUsersDaoInteractions.fulfilled, (state, { payload }) => {
      usersDaoInteractionsAdapter.upsertOne(state.usersDaoInteractions, {
        id: payload.id,
        metrics: payload.metrics,
      });
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.error = null;
    });
  },
});

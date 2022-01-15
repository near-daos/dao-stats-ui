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

import { UsersDaoEntity, UsersState } from './types';

export const usersDaoAdapter = createEntityAdapter<UsersDaoEntity>();
export const usersDaoUsersAdapter = createEntityAdapter<MetricsEntity>();
export const usersDaoMembersAdapter = createEntityAdapter<MetricsEntity>();
export const usersDaoInteractionsAdapter = createEntityAdapter<MetricsEntity>();

const initialState: UsersState = {
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
  async (params: Params) => usersService.getUsers(params),
);

export const getUsersUsers = createAsyncThunk(
  'users/getUsersUsers',
  async (params: HistoryParams) => usersService.getUsersUsers(params),
);

export const getUsersLeaderboard = createAsyncThunk(
  'users/getUsersLeaderboard',
  async (params: Params) => usersService.getUsersLeaderboard(params),
);

export const getUsersMembers = createAsyncThunk(
  'users/getUsersMembers',
  async (params: HistoryParams) => usersService.getUsersMembers(params),
);

export const getUsersMembersLeaderboard = createAsyncThunk(
  'users/getUsersMembersLeaderboard',
  async (params: Params) => usersService.getUsersMembersLeaderboard(params),
);

export const getUsersAverageUsers = createAsyncThunk(
  'users/getUsersAverageUsers',
  async (params: HistoryParams) => usersService.getUsersAverageUsers(params),
);

export const getUsersInteractions = createAsyncThunk(
  'users/getUsersInteractions',
  async (params: HistoryParams) => usersService.getUsersInteractions(params),
);

export const getUsersInteractionsLeaderboard = createAsyncThunk(
  'users/getUsersInteractionsLeaderboard',
  async (params: Params) =>
    usersService.getUsersInteractionsLeaderboard(params),
);

export const getUsersAverageInteractions = createAsyncThunk(
  'users/getUsersAverageInteractions',
  async (params: HistoryParams) =>
    usersService.getUsersAverageInteractions(params),
);

export const getUsersDao = createAsyncThunk(
  'users/getUsersDao',
  async (params: DaoParams) => usersService.getUsersDao(params),
);

export const getUsersDaoUsers = createAsyncThunk(
  'users/getUsersDaoUsers',
  async (params: DaoHistoryParams) => usersService.getUsersDaoUsers(params),
);

export const getUsersDaoMembers = createAsyncThunk(
  'users/getUsersDaoMembers',
  async (params: DaoHistoryParams) => usersService.getUsersDaoMembers(params),
);

export const getUsersDaoInteractions = createAsyncThunk(
  'users/getUsersDaoInteractions',
  async (params: DaoHistoryParams) =>
    usersService.getUsersDaoInteractions(params),
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
      state.users = payload.data;
    });

    builder.addCase(getUsersUsers.fulfilled, (state, { payload }) => {
      state.usersUsers = payload.data;
    });

    builder.addCase(getUsersLeaderboard.fulfilled, (state, { payload }) => {
      state.usersLeaderboard = payload.data;
    });

    builder.addCase(getUsersMembers.fulfilled, (state, { payload }) => {
      state.usersMembers = payload.data;
    });

    builder.addCase(
      getUsersMembersLeaderboard.fulfilled,
      (state, { payload }) => {
        state.usersMembersLeaderboard = payload.data;
      },
    );

    builder.addCase(getUsersAverageUsers.fulfilled, (state, { payload }) => {
      state.usersAverageUsers = payload.data;
    });

    builder.addCase(getUsersInteractions.fulfilled, (state, { payload }) => {
      state.usersInteractions = payload.data;
    });

    builder.addCase(
      getUsersInteractionsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.usersInteractionsLeaderboard = payload.data;
      },
    );

    builder.addCase(
      getUsersAverageInteractions.fulfilled,
      (state, { payload }) => {
        state.usersAverageInteractions = {
          metrics: sortBy(payload.data.metrics, 'timestamp'),
        };
      },
    );

    builder.addCase(
      getUsersDao.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        usersDaoAdapter.upsertOne(state.usersDao, { id: dao, ...payload.data });
      },
    );

    builder.addCase(
      getUsersDaoUsers.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        usersDaoUsersAdapter.upsertOne(state.usersDaoUsers, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getUsersDaoMembers.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        usersDaoMembersAdapter.upsertOne(state.usersDaoMembers, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getUsersDaoInteractions.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        usersDaoInteractionsAdapter.upsertOne(state.usersDaoInteractions, {
          id: dao,
          metrics: payload.data.metrics,
        });
      },
    );

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.error = null;
    });
  },
});

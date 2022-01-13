import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

import {
  usersDaoAdapter,
  usersDaoInteractionsAdapter,
  usersDaoMembersAdapter,
  usersDaoUsersAdapter,
  usersSlice,
} from './slice';

const getState = (state: RootState) => state[usersSlice.name];

export const selectorUsers = createSelector(
  (state: RootState) => getState(state).users,
  (data) => data,
);

export const selectorError = createSelector(
  (state: RootState) => getState(state).error,
  (error) => error,
);

export const selectUsersUsers = createSelector(
  (state: RootState) => getState(state).usersUsers,
  (data) => data,
);

export const selectUsersLeaderboard = createSelector(
  (state: RootState) => getState(state).usersLeaderboard,
  (data) => data,
);

export const selectUsersMembers = createSelector(
  (state: RootState) => getState(state).usersMembers,
  (data) => data,
);

export const selectUsersMembersLeaderboard = createSelector(
  (state: RootState) => getState(state).usersMembersLeaderboard,
  (data) => data,
);

export const selectUsersAverageUsers = createSelector(
  (state: RootState) => getState(state).usersAverageUsers,
  (data) => data,
);

export const selectUsersInteractions = createSelector(
  (state: RootState) => getState(state).usersInteractions,
  (data) => data,
);

export const selectUsersInteractionsLeaderboard = createSelector(
  (state: RootState) => getState(state).usersInteractionsLeaderboard,
  (data) => data,
);

export const selectUsersAverageInteractions = createSelector(
  (state: RootState) => getState(state).usersAverageInteractions,
  (data) => data,
);

const { selectById: selectUsersDaoItem } = usersDaoAdapter.getSelectors(
  (state: RootState) => state[usersSlice.name].usersDao,
);

export const selectUsersDaoById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectUsersDaoItem(state, id) : null);

const {
  selectById: selectUsersDaoUsersItem,
} = usersDaoUsersAdapter.getSelectors(
  (state: RootState) => state[usersSlice.name].usersDaoUsers,
);

export const selectUsersDaoUsersById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectUsersDaoUsersItem(state, id) : null);

const {
  selectById: selectUsersDaoMembersItem,
} = usersDaoMembersAdapter.getSelectors(
  (state: RootState) => state[usersSlice.name].usersDaoMembers,
);

export const selectUsersDaoMembersById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectUsersDaoMembersItem(state, id) : null);

const {
  selectById: selectUsersDaoInteractionsItem,
} = usersDaoInteractionsAdapter.getSelectors(
  (state: RootState) => state[usersSlice.name].usersDaoInteractions,
);

export const selectUsersDaoInteractionById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectUsersDaoInteractionsItem(state, id) : null);

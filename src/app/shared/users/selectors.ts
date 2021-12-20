import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

import { usersSlice } from './slice';

const getState = (state: RootState) => state[usersSlice.name];

export const selectorUsers = createSelector(
  (state: RootState) => getState(state).users,
  (data) => data,
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

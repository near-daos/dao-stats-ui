import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

import { usersSlice } from './slice';

const getState = (state: RootState) => state[usersSlice.name];

export const selectorUsers = createSelector(
  (state: RootState) => getState(state).users,
  (data) => data,
);

export const selectUsersHistory = createSelector(
  (state: RootState) => getState(state).history,
  (data) => data,
);

export const selectUsersDao = createSelector(
  (state: RootState) => getState(state).dao,
  (data) => data,
);

export const selectUsersDaoHistory = createSelector(
  (state: RootState) => getState(state).daoHistory,
  (data) => data,
);

export const selectUsersLeaderboard = createSelector(
  (state: RootState) => getState(state).leaderboard,
  (data) => data,
);

export const selectUsersInteractionHistory = createSelector(
  (state: RootState) => getState(state).usersInteractions,
  (data) => data,
);

export const selectUsersInteractionLeaderboard = createSelector(
  (state: RootState) => getState(state).usersInteractionsLeaderboard,
  (data) => data,
);

export const selectUsersAveragePerDaoHistory = createSelector(
  (state: RootState) => getState(state).usersAveragePerDaoHistory,
  (data) => data,
);

export const selectUsersInteractionsPerDaoHistory = createSelector(
  (state: RootState) => getState(state).usersInteractionsPerDaoHistory,
  (data) => data,
);

export const selectUsersMembersOfDaoHistory = createSelector(
  (state: RootState) => getState(state).usersMembersOfDaoHistory,
  (data) => data,
);

export const selectUsersMembersOfDaoLeaderboard = createSelector(
  (state: RootState) => getState(state).usersMembersOfDaoLeaderboard,
  (data) => data,
);

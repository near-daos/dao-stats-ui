import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

import { generalSlice } from './slice';

const getState = (state: RootState) => state[generalSlice.name];

export const selectLoading = createSelector(
  (state: RootState) => getState(state).loading,
  (data) => data,
);

export const selectGeneral = createSelector(
  (state: RootState) => getState(state).general,
  (data) => data,
);

export const selectGeneralDaos = createSelector(
  (state: RootState) => getState(state).generalDaos,
  (data) => data,
);

export const selectGeneralActive = createSelector(
  (state: RootState) => getState(state).generalActive,
  (data) => data,
);

export const selectGeneralActiveLeaderboard = createSelector(
  (state: RootState) => getState(state).generalActiveLeaderboard,
  (data) => data,
);

export const selectGeneralGroups = createSelector(
  (state: RootState) => getState(state).generalGroups,
  (data) => data,
);

export const selectGeneralGroupsLeaderboard = createSelector(
  (state: RootState) => getState(state).generalGroupsLeaderboard,
  (data) => data,
);

export const selectGeneralAverageGroups = createSelector(
  (state: RootState) => getState(state).averageGroups,
  (data) => data,
);

export const selectGeneralDao = createSelector(
  (state: RootState) => getState(state).dao,
  (data) => data,
);

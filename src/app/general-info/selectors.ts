import { createSelector } from '@reduxjs/toolkit';

import { generalSlice } from './slice';
import { RootState } from '../../store/root-reducer';

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

export const selectGeneralActivity = createSelector(
  (state: RootState) => getState(state).generalActivity,
  (data) => data,
);

export const selectGeneralActivityLeaderboard = createSelector(
  (state: RootState) => getState(state).generalActivityLeaderboard,
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

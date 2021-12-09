import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store/root-reducer';
import { activitySlice } from './slice';

const getState = (state: RootState) => state[activitySlice.name];

export const selectActivity = createSelector(
  (state: RootState) => getState(state).activity,
  (data) => data,
);

export const selectActivityProposals = createSelector(
  (state: RootState) => getState(state).activityProposals,
  (data) => data,
);

export const selectActivityProposalsLeaderboard = createSelector(
  (state: RootState) => getState(state).activityProposalsLeaderboard,
  (data) => data,
);

export const selectActivityProposalsTypes = createSelector(
  (state: RootState) => getState(state).activityProposalsTypes,
  (data) => data,
);

export const selectActivityProposalsTypesLeaderboard = createSelector(
  (state: RootState) => getState(state).activityProposalsTypesLeaderboard,
  (data) => data,
);

export const selectActivityRate = createSelector(
  (state: RootState) => getState(state).activityRate,
  (data) => data,
);

export const selectActivityRateLeaderboard = createSelector(
  (state: RootState) => getState(state).activityRateLeaderboard,
  (data) => data,
);

export const selectActivityDao = createSelector(
  (state: RootState) => getState(state).activityDao,
  (data) => data,
);

export const selectActivityDaoProposals = createSelector(
  (state: RootState) => getState(state).activityDaoProposals,
  (data) => data,
);

export const selectActivityDaoProposalsTypes = createSelector(
  (state: RootState) => getState(state).activityDaoProposalsTypes,
  (data) => data,
);

export const selectActivityDaoRate = createSelector(
  (state: RootState) => getState(state).activityDaoRate,
  (data) => data,
);

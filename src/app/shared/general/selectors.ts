import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

import {
  generalDaoActivityAdapter,
  generalDaoAdapter,
  generalDaoGroupsAdapter,
  generalSlice,
} from './slice';

const getState = (state: RootState) => state[generalSlice.name];

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

const {
  selectById: selectGeneralDaoGroupsItem,
} = generalDaoGroupsAdapter.getSelectors(
  (state: RootState) => state[generalSlice.name].generalDaoGroups,
);

export const selectGeneralDaoGroupsById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectGeneralDaoGroupsItem(state, id) : null);

const { selectById: selectGeneralDaoItem } = generalDaoAdapter.getSelectors(
  (state: RootState) => state[generalSlice.name].generalDao,
);

export const selectGeneralDaoById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectGeneralDaoItem(state, id) : null);

const {
  selectById: selectGeneralActivituItem,
} = generalDaoActivityAdapter.getSelectors(
  (state: RootState) => state[generalSlice.name].generalDaoActivity,
);

export const selectGeneralDaoActivityById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectGeneralActivituItem(state, id) : null);

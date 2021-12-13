import { createSelector } from '@reduxjs/toolkit';

import { flowSlice } from './slice';
import { RootState } from '../../store/root-reducer';

const getState = (state: RootState) => state[flowSlice.name];

export const selectLoading = createSelector(
  (state: RootState) => getState(state).loading,
  (data) => data,
);

export const selectFlow = createSelector(
  (state: RootState) => getState(state).flow,
  (data) => data,
);

export const selectFlowDao = createSelector(
  (state: RootState) => getState(state).flowDao,
  (data) => data,
);
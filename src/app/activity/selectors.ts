import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store/root-reducer';
import { activitySlice } from './slice';

const getState = (state: RootState) => state[activitySlice.name];

export const selectActivity = createSelector(
  (state: RootState) => getState(state).activity,
  (data) => data,
);

export const selectActivityHistory = createSelector(
  (state: RootState) => getState(state).history,
  (data) => data,
);

export const selectActivityDao = createSelector(
  (state: RootState) => getState(state).dao,
  (data) => data,
);

export const selectActivityDaoHistory = createSelector(
  (state: RootState) => getState(state).daoHistory,
  (data) => data,
);

import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store/root-reducer';
import { activitySlice } from './slice';

const getState = (state: RootState) => state[activitySlice.name];

export const selector = createSelector(
  (state: RootState) => getState(state).activity,
  (data) => data,
);

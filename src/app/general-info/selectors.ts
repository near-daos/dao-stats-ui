import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store/root-reducer';
import { generalInfoSlice } from './slice';

const getState = (state: RootState) => state[generalInfoSlice.name];

export const selector = createSelector(
  (state: RootState) => getState(state).generalInfo,
  (data) => data,
);

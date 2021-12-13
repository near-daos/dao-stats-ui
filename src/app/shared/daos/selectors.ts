import { createSelector } from '@reduxjs/toolkit';

import { daoSlice } from './slice';
import { RootState } from '../../../store/root-reducer';

const getState = (state: RootState) => state[daoSlice.name];

export const selectDao = createSelector(
  (state: RootState) => getState(state).autocomplete,
  (data) => data,
);

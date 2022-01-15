import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

import { daoSlice } from './slice';

const getState = (state: RootState) => state[daoSlice.name];

export const selectDaoError = createSelector(
  (state: RootState) => getState(state).error,
  (data) => data,
);

export const selectAutocomplete = createSelector(
  (state: RootState) => getState(state).autocomplete,
  (data) => data,
);

export const selectCurrentDao = createSelector(
  (state: RootState) => getState(state).dao,
  (data) => data,
);

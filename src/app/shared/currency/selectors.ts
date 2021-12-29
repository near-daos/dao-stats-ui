import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

import { currencySlice } from './slice';

const getState = (state: RootState) => state[currencySlice.name];

export const selectCurrency = createSelector(
  (state: RootState) => getState(state).currency,
  (data) => data,
);

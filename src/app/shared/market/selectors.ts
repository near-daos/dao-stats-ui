import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

import { marketSlice } from './slice';

const getState = (state: RootState) => state[marketSlice.name];

export const selectPrice = createSelector(
  (state: RootState) => getState(state).price,
  (price) => price,
);

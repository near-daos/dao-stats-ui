import { createSelector } from '@reduxjs/toolkit';

import { generalSlice } from './slice';
import { RootState } from '../../store/root-reducer';

const getState = (state: RootState) => state[generalSlice.name];

export const selectGeneral = createSelector(
  (state: RootState) => getState(state).general,
  (data) => data,
);

export const selectGeneralDaos = createSelector(
  (state: RootState) => getState(state).generalDaos,
  (data) => data,
);

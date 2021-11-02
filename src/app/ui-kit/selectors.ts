import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store/root-reducer';
import { uiKitSlice } from './slice';

const getState = (state: RootState) => state[uiKitSlice.name];

export const selectLocale = createSelector(
  (state: RootState) => getState(state).todos,
  (todos) => todos,
);

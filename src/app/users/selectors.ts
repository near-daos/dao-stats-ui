import { createSelector } from '@reduxjs/toolkit';

import { usersSlice } from './slice';
import { RootState } from '../../store/root-reducer';

const getState = (state: RootState) => state[usersSlice.name];

export const selectorUsers = createSelector(
  (state: RootState) => getState(state).users,
  (data) => data,
);

import { createSelector } from '@reduxjs/toolkit';

import { autocompleteSlice } from './slice';
import { RootState } from '../../store/root-reducer';

const getState = (state: RootState) => state[autocompleteSlice.name];

export const selectAutocomplete = createSelector(
  (state: RootState) => getState(state).autocomplete,
  (data) => data,
);

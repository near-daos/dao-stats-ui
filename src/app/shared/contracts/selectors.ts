import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

import { contractsSlice } from './slice';

const getState = (state: RootState) => state[contractsSlice.name];

export const selectContactError = createSelector(
  (state: RootState) => getState(state).error,
  (error) => error,
);

export const selectContracts = createSelector(
  (state: RootState) => getState(state).contracts,
  (data) => data,
);

export const selectContractsLoadingState = createSelector(
  (state: RootState) => getState(state).loading,
  (data) => data,
);

export const selectSelectedContract = createSelector(
  (state: RootState) => getState(state).selectedContract,
  (data) => data,
);

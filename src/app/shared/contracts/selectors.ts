import { createSelector } from '@reduxjs/toolkit';

import { contractsSlice } from './slice';
import { RootState } from '../../../store/root-reducer';

const getState = (state: RootState) => state[contractsSlice.name];

export const selectorContracts = createSelector(
  (state: RootState) => getState(state).contracts,
  (data) => data,
);

export const selectorContractsLoadingState = createSelector(
  (state: RootState) => getState(state).loading,
  (data) => data,
);

export const selectorSelectedContract = createSelector(
  (state: RootState) => getState(state).selectedContract,
  (data) => data,
);

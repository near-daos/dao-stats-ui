import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

import { RequestStatus } from 'src/store/types';
import { loadingSlice } from './slice';

const selectLoading = (state: RootState) => state[loadingSlice.name];

export const selectActionLoading = (action: string) =>
  createSelector(
    selectLoading,
    (state): RequestStatus => state[action] || RequestStatus.NOT_ASKED,
  );

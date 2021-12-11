/* eslint-disable no-param-reassign */
import {
  createReducer,
  createSelector,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import { RequestStatus } from './types';

export const LOADING_STATE_PATH = 'loading';

export type LoadingState = {
  [key: string]: RequestStatus;
};

const loadingState: LoadingState = {};

interface AppState {
  [LOADING_STATE_PATH]: LoadingState;
}

type Selector = <T extends AppState>(state: T) => RequestStatus;

const selectLoading = (state: AppState) => state[LOADING_STATE_PATH];

export const selectActionLoading = (action: string): Selector =>
  createSelector(
    selectLoading,
    (state): RequestStatus => state[action] || RequestStatus.NOT_ASKED,
  );

export const loadingReducer = createReducer(loadingState, (builder) => {
  builder.addMatcher(isPending, (state, { type, meta }) => {
    state[type.split(`/${meta.requestStatus}`)[0]] = RequestStatus.PENDING;
  });
  builder.addMatcher(isFulfilled, (state, { type, meta }) => {
    state[type.split(`/${meta.requestStatus}`)[0]] = RequestStatus.SUCCESS;
  });
  builder.addMatcher(isRejected, (state, { type, meta }) => {
    state[type.split(`/${meta.requestStatus}`)[0]] = RequestStatus.FAILED;
  });
});

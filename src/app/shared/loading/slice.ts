import {
  createSlice,
  isRejected,
  isPending,
  isFulfilled,
} from '@reduxjs/toolkit';
import { RequestStatus } from 'src/store/types';

import { LoadingState } from './types';

const initialState: LoadingState = {};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state, { type, meta }) => {
      state[type.split(`/${meta.requestStatus}`)[0]] = RequestStatus.PENDING;
    });
    builder.addMatcher(isFulfilled, (state, { type, meta }) => {
      state[type.split(`/${meta.requestStatus}`)[0]] = RequestStatus.SUCCESS;
    });
    builder.addMatcher(isRejected, (state, { type, meta }) => {
      state[type.split(`/${meta.requestStatus}`)[0]] = RequestStatus.FAILED;
    });
  },
});

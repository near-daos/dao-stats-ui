/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  isRejected,
  isFulfilled,
  isPending,
} from '@reduxjs/toolkit';

import { RequestStatus } from '../../store/types';
import { todosService } from '../../api';
import { UIKitState } from './types';

export const todosAdapter = createEntityAdapter();

const initialState: UIKitState = {
  todos: todosAdapter.getInitialState(),
  loading: RequestStatus.DRAFT,
  error: null,
};

export const uiKitSlice = createSlice({
  name: 'uiKit',
  initialState,
  reducers: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  extraReducers: (builder) => {},
});

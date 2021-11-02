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
import { todosService, Todo } from '../../api';
import { UIKitState } from './types';

export const todosAdapter = createEntityAdapter<Todo>();

const initialState: UIKitState = {
  todos: todosAdapter.getInitialState(),
  loading: RequestStatus.DRAFT,
  error: null,
};

export const getTodos = createAsyncThunk('uiKit/getTodos', async () =>
  todosService.getTodos(),
);

export const getTodo = createAsyncThunk('uiKit/getTodo', async (id: string) =>
  todosService.getTodo(id),
);

const isPendingAction = isPending(getTodos, getTodo);
const isRejectedAction = isRejected(getTodos, getTodo);
const isFulfilledAction = isFulfilled(getTodos, getTodo);

export const uiKitSlice = createSlice({
  name: 'uiKit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, { payload }) => {
      todosAdapter.setAll(state.todos, payload.data);
    });
    builder.addCase(getTodo.fulfilled, (state, { payload }) => {
      todosAdapter.upsertOne(state.todos, payload.data);
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.loading = RequestStatus.FAILED;
      state.error = error.message;
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.loading = RequestStatus.PENDING;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.loading = RequestStatus.SUCCESS;
      state.error = null;
    });
  },
});

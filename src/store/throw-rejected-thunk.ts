import {
  isAsyncThunkAction,
  isRejected,
  unwrapResult,
  Middleware,
  AnyAction,
} from '@reduxjs/toolkit';

export const throwRejectedThunk: Middleware = () => (next) => (
  action: AnyAction,
) => {
  if (isAsyncThunkAction(action) && isRejected(action)) {
    const res = next(action);

    return unwrapResult(res);
  }

  return next(action);
};

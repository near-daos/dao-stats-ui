import { useDispatch, createSelectorHook } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer, RootState } from './root-reducer';
import { routerMiddleware } from './history';
import { throwRejectedThunk } from './throw-rejected-thunk';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
        serializableCheck: false,
      }).concat(routerMiddleware, throwRejectedThunk),
    devTools: window.__RUNTIME_CONFIG__.NODE_ENV !== 'production',
  });

export const store = createStore();

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector = createSelectorHook<RootState>();

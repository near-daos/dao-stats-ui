import { useDispatch, createSelectorHook } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer, RootState } from './root-reducer';
import { routerMiddleware } from './history';

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
        serializableCheck: true,
      }).concat(routerMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

export const store = createStore();

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector = createSelectorHook<RootState>();

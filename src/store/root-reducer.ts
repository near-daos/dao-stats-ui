import { RouterState } from 'connected-react-router';
import { CombinedState, combineReducers } from 'redux';

import { uiKitSlice, UIKitState } from '../app';
import { routerReducer } from './history';

export type RootState = CombinedState<{
  router: RouterState<unknown>;
  [uiKitSlice.name]: UIKitState;
}>;

export const rootReducer = combineReducers({
  router: routerReducer,
  [uiKitSlice.name]: uiKitSlice.reducer,
});

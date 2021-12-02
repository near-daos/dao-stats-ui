import { RouterState } from 'connected-react-router';
import { CombinedState, combineReducers } from 'redux';

import { activitySlice, activityState } from '../app/activity';
import { routerReducer } from './history';

export type RootState = CombinedState<{
  router: RouterState<unknown>;
  [activitySlice.name]: activityState;
}>;

export const rootReducer = combineReducers({
  router: routerReducer,
  [activitySlice.name]: activitySlice.reducer,
});

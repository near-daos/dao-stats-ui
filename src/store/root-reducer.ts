import { RouterState } from 'connected-react-router';
import { CombinedState, combineReducers } from 'redux';

import { activityState } from '../app/activity/types';
import { activitySlice } from '../app/activity/slice';
import { generalInfoState } from '../app/general-info/types';
import { generalInfoSlice } from '../app/general-info/slice';

import { routerReducer } from './history';

export type RootState = CombinedState<{
  router: RouterState<unknown>;
  [activitySlice.name]: activityState;
  [generalInfoSlice.name]: generalInfoState;
}>;

export const rootReducer = combineReducers({
  router: routerReducer,
  [activitySlice.name]: activitySlice.reducer,
  [generalInfoSlice.name]: generalInfoSlice.reducer,
});

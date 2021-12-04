import { RouterState } from 'connected-react-router';
import { CombinedState, combineReducers } from 'redux';

import { activitySlice } from '../app/activity/slice';
import { activityState } from '../app/activity/types';
import { generalSlice } from '../app/general-info/slice';
import { generalState } from '../app/general-info/types';
import { usersSlice } from '../app/users/slice';
import { usersState } from '../app/users/types';

import { routerReducer } from './history';

export type RootState = CombinedState<{
  router: RouterState<unknown>;
  [activitySlice.name]: activityState;
  [generalSlice.name]: generalState;
  [usersSlice.name]: usersState;
}>;

export const rootReducer = combineReducers({
  router: routerReducer,
  [activitySlice.name]: activitySlice.reducer,
  [generalSlice.name]: generalSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
});

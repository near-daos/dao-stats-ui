import { RouterState } from 'connected-react-router';
import { CombinedState, combineReducers } from 'redux';
import { autocompleteSlice } from 'src/components/autocomplete/slice';
import { autocompleteState } from 'src/components/autocomplete/types';
import { LoadingState, loadingReducer } from './loading';
import { activitySlice } from '../app/activity/slice';
import { activityState } from '../app/activity/types';
import { generalSlice } from '../app/general-info/slice';
import { generalState } from '../app/general-info/types';
import { usersSlice } from '../app/users/slice';
import { usersState } from '../app/users/types';
import { contractState } from '../app/shared/contracts/types';
import { contractsSlice } from '../app/shared/contracts/slice';

import { routerReducer } from './history';

export type RootState = CombinedState<{
  loading: LoadingState;
  router: RouterState<unknown>;
  [activitySlice.name]: activityState;
  [generalSlice.name]: generalState;
  [usersSlice.name]: usersState;
  [contractsSlice.name]: contractState;
  [autocompleteSlice.name]: autocompleteState;
}>;

export const rootReducer = combineReducers({
  loading: loadingReducer,
  router: routerReducer,
  [activitySlice.name]: activitySlice.reducer,
  [generalSlice.name]: generalSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
  [contractsSlice.name]: contractsSlice.reducer,
  [autocompleteSlice.name]: autocompleteSlice.reducer,
});

import { RouterState } from 'connected-react-router';
import { CombinedState, combineReducers } from 'redux';

import { daoSlice } from 'src/app/shared/daos/slice';
import { daoState } from 'src/app/shared/daos/types';
import { governanceSlice } from 'src/app/governance/slice';
import { governanceState } from 'src/app/governance/types';
import { generalSlice } from 'src/app/general-info/slice';
import { generalState } from 'src/app/general-info/types';
import { usersSlice } from 'src/app/users/slice';
import { usersState } from 'src/app/users/types';
import { contractState } from 'src/app/shared/contracts/types';
import { contractsSlice } from 'src/app/shared/contracts/slice';
import { flowState } from 'src/app/flow/types';
import { flowSlice } from 'src/app/flow/slice';
import { LoadingState, loadingReducer } from './loading';

import { routerReducer } from './history';

export type RootState = CombinedState<{
  loading: LoadingState;
  router: RouterState<unknown>;
  [governanceSlice.name]: governanceState;
  [generalSlice.name]: generalState;
  [usersSlice.name]: usersState;
  [contractsSlice.name]: contractState;
  [flowSlice.name]: flowState;
  [daoSlice.name]: daoState;
}>;

export const rootReducer = combineReducers({
  loading: loadingReducer,
  router: routerReducer,
  [governanceSlice.name]: governanceSlice.reducer,
  [generalSlice.name]: generalSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
  [contractsSlice.name]: contractsSlice.reducer,
  [flowSlice.name]: flowSlice.reducer,
  [daoSlice.name]: daoSlice.reducer,
});

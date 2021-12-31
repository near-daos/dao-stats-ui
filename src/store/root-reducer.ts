import { RouterState } from 'connected-react-router';
import { CombinedState, combineReducers } from 'redux';

import { daoSlice } from 'src/app/shared/daos/slice';
import { daoState } from 'src/app/shared/daos/types';
import { governanceSlice } from 'src/app/shared/governance/slice';
import { governanceState } from 'src/app/shared/governance/types';
import { generalSlice } from 'src/app/shared/general/slice';
import { generalState } from 'src/app/shared/general/types';
import { usersSlice } from 'src/app/shared/users/slice';
import { usersState } from 'src/app/shared/users/types';
import { contractState } from 'src/app/shared/contracts/types';
import { contractsSlice } from 'src/app/shared/contracts/slice';
import { flowState } from 'src/app/shared/flow/types';
import { flowSlice } from 'src/app/shared/flow/slice';
import { tokensState } from 'src/app/shared/tokens/types';
import { tokensSlice } from 'src/app/shared/tokens/slice';
import { currencyState } from 'src/app/shared/currency/types';
import { currencySlice } from 'src/app/shared/currency/slice';
import { tvlState } from 'src/app/shared/tvl/types';
import { tvlSlice } from 'src/app/shared/tvl/slice';
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
  [tokensSlice.name]: tokensState;
  [currencySlice.name]: currencyState;
  [tvlSlice.name]: tvlState;
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
  [tokensSlice.name]: tokensSlice.reducer,
  [currencySlice.name]: currencySlice.reducer,
  [tvlSlice.name]: tvlSlice.reducer,
});

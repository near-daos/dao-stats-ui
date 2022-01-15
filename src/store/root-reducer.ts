import { RouterState } from 'connected-react-router';
import { CombinedState, combineReducers } from 'redux';

import { daoSlice } from 'src/app/shared/daos/slice';
import { DaoState } from 'src/app/shared/daos/types';
import { governanceSlice } from 'src/app/shared/governance/slice';
import { GovernanceState } from 'src/app/shared/governance/types';
import { generalSlice } from 'src/app/shared/general/slice';
import { GeneralState } from 'src/app/shared/general/types';
import { usersSlice } from 'src/app/shared/users/slice';
import { UsersState } from 'src/app/shared/users/types';
import { ContractState } from 'src/app/shared/contracts/types';
import { contractsSlice } from 'src/app/shared/contracts/slice';
import { FlowState } from 'src/app/shared/flow/types';
import { flowSlice } from 'src/app/shared/flow/slice';
import { TokensState } from 'src/app/shared/tokens/types';
import { tokensSlice } from 'src/app/shared/tokens/slice';
import { CurrencyState } from 'src/app/shared/currency/types';
import { currencySlice } from 'src/app/shared/currency/slice';
import { TvlState } from 'src/app/shared/tvl/types';
import { tvlSlice } from 'src/app/shared/tvl/slice';
import { LoadingState, loadingReducer } from './loading';

import { routerReducer } from './history';

export type RootState = CombinedState<{
  loading: LoadingState;
  router: RouterState<unknown>;
  [governanceSlice.name]: GovernanceState;
  [generalSlice.name]: GeneralState;
  [usersSlice.name]: UsersState;
  [contractsSlice.name]: ContractState;
  [flowSlice.name]: FlowState;
  [daoSlice.name]: DaoState;
  [tokensSlice.name]: TokensState;
  [currencySlice.name]: CurrencyState;
  [tvlSlice.name]: TvlState;
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

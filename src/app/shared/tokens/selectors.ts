import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';
import {
  tokensSlice,
  tokensDaoAdapter,
  tokensDaoNftsAdapter,
  tokensDaoFtsVlAdapter,
  tokensDaoFtsAdapter,
} from './slice';

const getState = (state: RootState) => state[tokensSlice.name];

export const selectTokens = createSelector(
  (state: RootState) => getState(state).tokens,
  (data) => data,
);

export const selectTokensNfts = createSelector(
  (state: RootState) => getState(state).tokensNfts,
  (data) => data,
);

export const selectTokensNftsLeaderboard = createSelector(
  (state: RootState) => getState(state).tokensNftsLeaderboard,
  (data) => data,
);

export const selectTokensFts = createSelector(
  (state: RootState) => getState(state).tokensFts,
  (data) => data,
);

export const selectTokensFtsLeaderboard = createSelector(
  (state: RootState) => getState(state).tokensFtsLeaderboard,
  (data) => data,
);

export const selectTokensFtsVl = createSelector(
  (state: RootState) => getState(state).tokensFtsVl,
  (data) => data,
);

export const selectTokensFtsVlLeaderboard = createSelector(
  (state: RootState) => getState(state).tokensFtsVlLeaderboard,
  (data) => data,
);

const { selectById: selectTokensDaoItem } = tokensDaoAdapter.getSelectors(
  (state: RootState) => state[tokensSlice.name].tokensDao,
);

export const selectTokensDaoById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectTokensDaoItem(state, id) : null);

const {
  selectById: selectTokensNftsDaoItem,
} = tokensDaoNftsAdapter.getSelectors(
  (state: RootState) => state[tokensSlice.name].tokensNftsDao,
);

export const selectTokensNftsDaoById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectTokensNftsDaoItem(state, id) : null);

const { selectById: selectTokensFtsDaoItem } = tokensDaoFtsAdapter.getSelectors(
  (state: RootState) => state[tokensSlice.name].tokensFtsDao,
);

export const selectTokensFtsDaoById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectTokensFtsDaoItem(state, id) : null);

const {
  selectById: selectTokensFtsVlDaoItem,
} = tokensDaoFtsVlAdapter.getSelectors(
  (state: RootState) => state[tokensSlice.name].tokensFtsVlDao,
);

export const selectTokensFtsVlDaoById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectTokensFtsVlDaoItem(state, id) : null);

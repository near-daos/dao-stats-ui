import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';
import { currencySlice, currencyState } from 'src/app/shared/currency';
import {
  updateLeaderboardDataWithCurrency,
  updateMetricsDataWithCurrency,
} from 'src/utils/update-data-with-currency';
import { Tokens } from 'src/api';

import {
  tokensSlice,
  tokensDaoAdapter,
  tokensDaoNftsAdapter,
  tokensDaoFtsVlAdapter,
  tokensDaoFtsAdapter,
} from './slice';

const updateTokensWithCurrency = (
  tokens: Tokens | null,
  currency: currencyState,
) => {
  if (!tokens) {
    return null;
  }

  return {
    ...tokens,
    ftsVl: {
      growth: tokens?.ftsVl?.growth,
      count: (tokens?.ftsVl?.count || 0) * (currency.currency?.near?.usd || 0),
    },
  };
};

const getState = (state: RootState) => state[tokensSlice.name];
const getCurrencyState = (state: RootState) => state[currencySlice.name];

export const selectTokens = createSelector(
  (state: RootState) => getState(state).tokens,
  getCurrencyState,
  (tokens, currency) => updateTokensWithCurrency(tokens, currency),
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
  getCurrencyState,
  (tokens, currency) => updateMetricsDataWithCurrency(tokens, currency),
);

export const selectTokensFtsVlLeaderboard = createSelector(
  (state: RootState) => getState(state).tokensFtsVlLeaderboard,
  getCurrencyState,
  (leaderboard, currency) =>
    updateLeaderboardDataWithCurrency(leaderboard, currency),
);

const { selectById: selectTokensDaoItem } = tokensDaoAdapter.getSelectors(
  (state: RootState) => state[tokensSlice.name].tokensDao,
);

export const selectTokensDaoById = (id: string | undefined) =>
  createSelector(
    (state: RootState) => (id ? selectTokensDaoItem(state, id) : null),
    getCurrencyState,
    (tokens, currency) =>
      tokens ? updateTokensWithCurrency(tokens, currency) : null,
  );

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

export const selectTokensFtsVlDaoById = (id: string | undefined) =>
  createSelector(
    (state: RootState) => (id ? selectTokensFtsVlDaoItem(state, id) : null),
    getCurrencyState,
    (tokens, currency) =>
      tokens ? updateMetricsDataWithCurrency(tokens, currency) : null,
  );

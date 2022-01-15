import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';
import { currencySlice } from 'src/app/shared/currency';
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

const updateTokensWithCurrency = (tokens: Tokens | null, currency = 0) => {
  if (!tokens) {
    return null;
  }

  return {
    ...tokens,
    ftsVl: {
      growth: tokens?.ftsVl?.growth,
      count: (tokens?.ftsVl?.count || 0) * currency,
    },
  };
};

const getState = (state: RootState) => state[tokensSlice.name];
const getCurrencyState = (state: RootState) => state[currencySlice.name];

export const selectTokensError = createSelector(
  (state: RootState) => getState(state).error,
  (error) => error,
);

export const selectTokens = createSelector(
  (state: RootState) => getState(state).tokens,
  getCurrencyState,
  (tokens, currency) =>
    updateTokensWithCurrency(tokens, currency?.currency?.near?.usd || 0),
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
  (tokens, currency) =>
    updateMetricsDataWithCurrency({
      metrics: tokens?.metrics,
      currency: currency?.currency?.near?.usd || 0,
    }),
);

export const selectTokensFtsVlLeaderboard = createSelector(
  (state: RootState) => getState(state).tokensFtsVlLeaderboard,
  getCurrencyState,
  (leaderboard, currency) =>
    updateLeaderboardDataWithCurrency(
      leaderboard,
      currency?.currency?.near?.usd || 0,
    ),
);

const { selectById: selectTokensDaoItem } = tokensDaoAdapter.getSelectors(
  (state: RootState) => state[tokensSlice.name].tokensDao,
);

export const selectTokensDaoById = (id: string | undefined) =>
  createSelector(
    (state: RootState) => (id ? selectTokensDaoItem(state, id) : null),
    getCurrencyState,
    (tokens, currency) =>
      tokens
        ? updateTokensWithCurrency(tokens, currency?.currency?.near?.usd || 0)
        : null,
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
      tokens
        ? updateMetricsDataWithCurrency({
            metrics: tokens?.metrics,
            currency: currency?.currency?.near?.usd || 0,
          })
        : null,
  );

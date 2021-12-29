import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';
import { currencySlice } from 'src/app/shared/currency';
import {
  tokensSlice,
  tokensDaoAdapter,
  tokensDaoNftsAdapter,
  tokensDaoFtsVlAdapter,
  tokensDaoFtsAdapter,
} from './slice';

const getState = (state: RootState) => state[tokensSlice.name];
const getCurrencyState = (state: RootState) => state[currencySlice.name];

export const selectTokens = createSelector(
  (state: RootState) => getState(state).tokens,
  getCurrencyState,
  (tokens, currencyState) => {
    if (!tokens) {
      return null;
    }

    return {
      ...tokens,
      ftsVl: {
        growth: tokens?.ftsVl?.growth,
        count:
          (tokens?.ftsVl?.count || 0) *
          (currencyState.currency?.near?.usd || 0),
      },
    };
  },
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
  (tokens, currencyState) => {
    if (!tokens) {
      return null;
    }

    return {
      metrics: tokens.metrics.map((metric) => ({
        ...metric,
        count: (currencyState.currency?.near?.usd || 0) * metric.count,
      })),
    };
  },
);

export const selectTokensFtsVlLeaderboard = createSelector(
  (state: RootState) => getState(state).tokensFtsVlLeaderboard,
  getCurrencyState,
  (leaderboard, currencyState) => {
    if (!leaderboard) {
      return null;
    }

    return {
      metrics: leaderboard?.metrics?.map((metric) => ({
        ...metric,
        overview: metric?.overview?.map((overviewItem) => ({
          ...overviewItem,
          count: (currencyState.currency?.near?.usd || 0) * overviewItem.count,
        })),
      })),
    };
  },
);

const { selectById: selectTokensDaoItem } = tokensDaoAdapter.getSelectors(
  (state: RootState) => state[tokensSlice.name].tokensDao,
);

export const selectTokensDaoById = (id: string | undefined) =>
  createSelector(
    (state: RootState) => (id ? selectTokensDaoItem(state, id) : null),
    getCurrencyState,
    (tokens, currencyState) => {
      if (!tokens) {
        return null;
      }

      return {
        ...tokens,
        ftsVl: {
          growth: tokens?.ftsVl?.growth,
          count:
            (tokens?.ftsVl?.count || 0) *
            (currencyState.currency?.near?.usd || 0),
        },
      };
    },
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
    (tokens, currencyState) => {
      if (!tokens) {
        return null;
      }

      return {
        metrics: tokens.metrics.map((metric) => ({
          ...metric,
          count: (currencyState.currency?.near?.usd || 0) * metric.count,
        })),
      };
    },
  );

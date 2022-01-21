import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';
import { currencySlice } from 'src/app/shared/currency';
import { marketSlice } from 'src/app/shared/market';
import {
  updateLeaderboardDataWithCurrency,
  updateMetricsDataWithCurrency,
} from 'src/utils/update-data-with-currency';
import {
  tvlSlice,
  tvlDaoBountiesVlAdapter,
  tvlDaoBountiesNumberAdapter,
  tvlDaoAdapter,
  tvlDaoTvlAdapter,
} from './slice';

const getState = (state: RootState) => state[tvlSlice.name];
const getCurrencyState = (state: RootState) => state[currencySlice.name];
const getMarketState = (state: RootState) => state[marketSlice.name];

export const selectTvlError = createSelector(
  (state: RootState) => getState(state).error,
  (error) => error,
);

export const selectTvl = createSelector(
  (state: RootState) => getState(state).tvl,
  getCurrencyState,
  (tvl, currency) => {
    if (!tvl) {
      return null;
    }

    return {
      tvl: {
        ...tvl.tvl,
        count: (tvl?.tvl?.count || 0) * (currency.currency?.near?.usd || 0),
      },
      avgTvl: {
        ...tvl.avgTvl,
        count: (tvl?.avgTvl?.count || 0) * (currency.currency?.near?.usd || 0),
      },
      bountiesAndGrantsVl: {
        ...tvl.bountiesAndGrantsVl,
        count:
          (tvl?.bountiesAndGrantsVl?.count || 0) *
          (currency.currency?.near?.usd || 0),
      },
      ftsVl: {
        ...tvl.ftsVl,
        count: (tvl?.ftsVl?.count || 0) * (currency.currency?.near?.usd || 0),
      },
    };
  },
);

export const selectTvlTvl = createSelector(
  (state: RootState) => getState(state).tvlTvl,
  getMarketState,
  (tvl, market) => {
    if (!tvl) {
      return null;
    }

    return updateMetricsDataWithCurrency({
      metrics: tvl?.metrics,
      priceItems: market?.price || [],
    });
  },
);

export const selectTvlLeaderboard = createSelector(
  (state: RootState) => getState(state).tvlLeaderboard,
  getCurrencyState,
  (tvl, currency) =>
    updateLeaderboardDataWithCurrency(tvl, currency?.currency?.near?.usd || 0),
);

export const selectTvlBountiesAndGrantsVl = createSelector(
  (state: RootState) => getState(state).tvlBountiesAndGrantsVL,
  getMarketState,
  (tvl, market) =>
    updateMetricsDataWithCurrency({
      metrics: tvl?.metrics,
      priceItems: market?.price || [],
    }),
);

export const selectTvlBountiesAndGrantsVlLeaderboard = createSelector(
  (state: RootState) => getState(state).tvlBountiesAndGrantsVlLeaderboard,
  getCurrencyState,
  (tvl, currency) =>
    updateLeaderboardDataWithCurrency(tvl, currency?.currency?.near?.usd || 0),
);

const { selectById: selectTvlDaoItem } = tvlDaoAdapter.getSelectors(
  (state: RootState) => state[tvlSlice.name].tvlDao,
);

export const selectTvlDaoById = (id: string | undefined) =>
  createSelector(
    (state: RootState) => (id ? selectTvlDaoItem(state, id) : null),
    getCurrencyState,
    (tvl, currency) => {
      if (!tvl) {
        return null;
      }

      return {
        ...tvl,
        grants: {
          ...tvl.grants,
          vl: {
            ...tvl.grants.vl,
            count: (currency.currency?.near?.usd || 0) * tvl.grants.vl.count,
          },
        },
        bounties: {
          ...tvl.bounties,
          vl: {
            ...tvl.bounties.vl,
            count: (currency.currency?.near?.usd || 0) * tvl.bounties.vl.count,
          },
        },
        tvl: {
          ...tvl.tvl,
          count: (tvl?.tvl?.count || 0) * (currency.currency?.near?.usd || 0),
        },
      };
    },
  );

const {
  selectById: selectTvlDaoBountiesNumberItem,
} = tvlDaoBountiesNumberAdapter.getSelectors(
  (state: RootState) => state[tvlSlice.name].tvlDaoBountiesNumber,
);

export const selectTvlDaoBountiesNumberById = (id?: string) => (
  state: RootState,
) => (id ? selectTvlDaoBountiesNumberItem(state, id) : null);

const {
  selectById: selectTvlDaoBountiesVlItem,
} = tvlDaoBountiesVlAdapter.getSelectors(
  (state: RootState) => state[tvlSlice.name].tvlDaoBountiesVl,
);

export const selectTvlDaoBountiesVlById = (id?: string) =>
  createSelector(
    (state: RootState) => (id ? selectTvlDaoBountiesVlItem(state, id) : null),
    getMarketState,
    (tvl, market) =>
      tvl
        ? updateMetricsDataWithCurrency({
            metrics: tvl?.metrics,
            priceItems: market?.price || [],
          })
        : null,
  );

const { selectById: selectTvlDaoTvlItem } = tvlDaoTvlAdapter.getSelectors(
  (state: RootState) => state[tvlSlice.name].tvlDaoTvl,
);

export const selectTvlDaoTvlById = (id?: string) =>
  createSelector(
    (state: RootState) => (id ? selectTvlDaoTvlItem(state, id) : null),
    getMarketState,
    (tvl, market) =>
      tvl
        ? updateMetricsDataWithCurrency({
            metrics: tvl?.metrics,
            priceItems: market?.price || [],
          })
        : null,
  );

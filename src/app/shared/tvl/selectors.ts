import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';
import { currencySlice, currencyState } from 'src/app/shared/currency';
import {
  tvlSlice,
  tvlDaoBountiesVlAdapter,
  tvlDaoBountiesNumberAdapter,
  tvlDaoAdapter,
} from './slice';
import { Leaderboard, Metrics } from '../../../api';

const updateMetricsDataWithCurrency = (
  data: (Metrics & { id?: string }) | null,
  currencyData: currencyState,
) => {
  if (!data) {
    return null;
  }

  return {
    metrics: data.metrics.map((metric) => ({
      ...metric,
      count: (currencyData.currency?.near?.usd || 0) * metric.count,
    })),
  };
};

const updateLeaderboardDataWithCurrency = (
  leaderboard: Leaderboard | null,
  currencyData: currencyState,
) => {
  if (!leaderboard) {
    return null;
  }

  return {
    metrics: leaderboard?.metrics?.map((metric) => ({
      ...metric,
      overview: metric?.overview?.map((overviewItem) => ({
        ...overviewItem,
        count: (currencyData.currency?.near?.usd || 0) * overviewItem.count,
      })),
    })),
  };
};

const getState = (state: RootState) => state[tvlSlice.name];
const getCurrencyState = (state: RootState) => state[currencySlice.name];

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
  getCurrencyState,
  (tvl, currency) => updateMetricsDataWithCurrency(tvl, currency),
);

export const selectTvlLeaderboard = createSelector(
  (state: RootState) => getState(state).tvlLeaderboard,
  getCurrencyState,
  (tvl, currency) => updateLeaderboardDataWithCurrency(tvl, currency),
);

export const selectTvlAvgTvl = createSelector(
  (state: RootState) => getState(state).tvlAvgTvl,
  getCurrencyState,
  (tvl, currency) => updateMetricsDataWithCurrency(tvl, currency),
);

export const selectTvlBountiesAndGrantsVLl = createSelector(
  (state: RootState) => getState(state).tvlBountiesAndGrantsVL,
  getCurrencyState,
  (tvl, currency) => updateMetricsDataWithCurrency(tvl, currency),
);

export const selectTvlBountiesAndGrantsVlLeaderboard = createSelector(
  (state: RootState) => getState(state).tvlBountiesAndGrantsVlLeaderboard,
  getCurrencyState,
  (tvl, currency) => updateLeaderboardDataWithCurrency(tvl, currency),
);

const { selectById: selectTvlDaoItem } = tvlDaoAdapter.getSelectors(
  (state: RootState) => state[tvlSlice.name].tvlDao,
);

export const selectTokensDaoById = (id: string | undefined) =>
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
          number: {
            ...tvl.grants.number,
            count:
              (tvl.grants.number.count || 0) *
              (currency.currency?.near?.usd || 0),
          },
          vl: {
            ...tvl.grants.vl,
            count:
              (tvl.grants.vl.count || 0) * (currency.currency?.near?.usd || 0),
          },
        },
        bounties: {
          number: {
            ...tvl.bounties.number,
            count:
              (tvl.grants.number.count || 0) *
              (currency.currency?.near?.usd || 0),
          },
          vl: {
            ...tvl.bounties.vl,
            count:
              (tvl.grants.vl.count || 0) * (currency.currency?.near?.usd || 0),
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

export const selectTvlDaoBountiesNumberById = (id?: string) =>
  createSelector(
    (state: RootState) =>
      id ? selectTvlDaoBountiesNumberItem(state, id) : null,
    getCurrencyState,
    (tvl, currency) =>
      tvl ? updateMetricsDataWithCurrency(tvl, currency) : null,
  );

const {
  selectById: selectTvlDaoBountiesVlItem,
} = tvlDaoBountiesVlAdapter.getSelectors(
  (state: RootState) => state[tvlSlice.name].tvlDaoBountiesVl,
);

export const selectTvlDaoBountiesVlById = (id?: string) =>
  createSelector(
    (state: RootState) => (id ? selectTvlDaoBountiesVlItem(state, id) : null),
    getCurrencyState,
    (tvl, currency) =>
      tvl ? updateMetricsDataWithCurrency(tvl, currency) : null,
  );

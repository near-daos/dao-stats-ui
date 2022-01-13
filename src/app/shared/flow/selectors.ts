import { createSelector } from '@reduxjs/toolkit';
import { currencySlice } from 'src/app/shared/currency';
import {
  updateLeaderboardDataWithCurrency,
  updateMetricsDataWithCurrency,
} from 'src/utils/update-data-with-currency';
import {
  flowSlice,
  flowDaoAdapter,
  flowDaoFundsAdapter,
  flowDaoTransactionsAdapter,
} from './slice';
import { RootState } from '../../../store/root-reducer';

const getState = (state: RootState) => state[flowSlice.name];
const getCurrencyState = (state: RootState) => state[currencySlice.name];

export const selectLoading = createSelector(
  (state: RootState) => getState(state).loading,
  (data) => data,
);

export const selectFlow = createSelector(
  (state: RootState) => getState(state).flow,
  getCurrencyState,
  (flow, currency) => {
    if (!flow) {
      return null;
    }

    const { totalIn, totalOut, transactionsIn, transactionsOut } = flow || {};

    const currencyValue = currency.currency?.near?.usd || 0;

    return {
      totalIn: {
        ...totalIn,
        count: (totalIn?.count || 0) * currencyValue,
        countNear: totalIn?.count,
      },
      totalOut: {
        ...totalOut,
        count: (totalOut?.count || 0) * currencyValue,
        countNear: totalOut?.count,
      },
      transactionsIn,
      transactionsOut,
    };
  },
);

export const selectFlowHistory = createSelector(
  (state: RootState) => getState(state).flowHistory,
  getCurrencyState,
  (flow, currency) => updateMetricsDataWithCurrency(flow, currency),
);

export const selectFlowLeaderboard = createSelector(
  (state: RootState) => getState(state).flowLeaderboard,
  getCurrencyState,
  (flow, currency) => updateLeaderboardDataWithCurrency(flow, currency),
);

export const selectFlowTransactionsHistory = createSelector(
  (state: RootState) => getState(state).flowTransactionsHistory,
  (flow) => flow,
);

export const selectFlowTransactionsLeaderboard = createSelector(
  (state: RootState) => getState(state).flowTransactionsLeaderboard,
  (flow) => flow,
);

const { selectById: selectFlowDaoItem } = flowDaoAdapter.getSelectors(
  (state: RootState) => state[flowSlice.name].flowDao,
);

export const selectFlowDaoById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectFlowDaoItem(state, id) : null);

const { selectById: selectFlowDaoFundsItem } = flowDaoFundsAdapter.getSelectors(
  (state: RootState) => state[flowSlice.name].flowDaoFunds,
);

export const selectFlowDaoFundsById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectFlowDaoFundsItem(state, id) : null);

const {
  selectById: selectFlowDaoTransactionsItem,
} = flowDaoTransactionsAdapter.getSelectors(
  (state: RootState) => state[flowSlice.name].flowDaoTransactions,
);

export const selectFlowDaoTransactionsById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectFlowDaoTransactionsItem(state, id) : null);

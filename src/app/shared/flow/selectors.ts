import { createSelector } from '@reduxjs/toolkit';
import { currencySlice } from 'src/app/shared/currency';
import {
  updateLeaderboardDataWithCurrency,
  updateMetricsDataWithCurrency,
} from 'src/utils/update-data-with-currency';
import {
  flowSlice,
  flowDaoAdapter,
  flowDaoIncomingFundsAdapter,
  flowDaoOutgoingFundsAdapter,
  flowDaoIncomingTransactionsAdapter,
  flowDaoOutgoingTransactionsAdapter,
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

    return {
      totalIn: {
        ...flow.totalIn,
        count:
          (flow?.totalIn?.count || 0) * (currency.currency?.near?.usd || 0),
        countNear: flow?.totalIn?.count,
      },
      totalOut: {
        ...flow.totalOut,
        count:
          (flow?.totalOut?.count || 0) * (currency.currency?.near?.usd || 0),
        countNear: flow?.totalOut?.count,
      },
      transactionsIn: {
        ...flow.transactionsIn,
        count:
          (flow?.transactionsIn?.count || 0) *
          (currency.currency?.near?.usd || 0),
        countNear: flow?.transactionsIn?.count,
      },
      transactionsOut: {
        ...flow.transactionsOut,
        count:
          (flow?.transactionsOut?.count || 0) *
          (currency.currency?.near?.usd || 0),
        countNear: flow?.transactionsOut?.count,
      },
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
  getCurrencyState,
  (flow, currency) => updateMetricsDataWithCurrency(flow, currency),
);

export const selectFlowTransactionsLeaderboard = createSelector(
  (state: RootState) => getState(state).flowTransactionsLeaderboard,
  getCurrencyState,
  (flow, currency) => updateLeaderboardDataWithCurrency(flow, currency),
);

const { selectById: selectFlowDaoItem } = flowDaoAdapter.getSelectors(
  (state: RootState) => state[flowSlice.name].flowDao,
);

export const selectFlowDaoById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectFlowDaoItem(state, id) : null);

const {
  selectById: selectFlowDaoIncomingFundsItem,
} = flowDaoIncomingFundsAdapter.getSelectors(
  (state: RootState) => state[flowSlice.name].flowDaoIncomingFunds,
);

export const selectFlowDaoIncomingFundsById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectFlowDaoIncomingFundsItem(state, id) : null);

const {
  selectById: selectFlowDaoOutgoingFundsItem,
} = flowDaoOutgoingFundsAdapter.getSelectors(
  (state: RootState) => state[flowSlice.name].flowDaoOutgoingFunds,
);

export const selectFlowDaoOutgoingFundsById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectFlowDaoOutgoingFundsItem(state, id) : null);

const {
  selectById: selectFlowDaoIncomingTransactionsItem,
} = flowDaoIncomingTransactionsAdapter.getSelectors(
  (state: RootState) => state[flowSlice.name].flowDaoIncomingTransactions,
);

export const selectFlowDaoIncomingTransactionsById = (
  id: string | undefined,
) => (state: RootState) =>
  id ? selectFlowDaoIncomingTransactionsItem(state, id) : null;

const {
  selectById: selectFlowDaoOutgoingTransactionsItem,
} = flowDaoOutgoingTransactionsAdapter.getSelectors(
  (state: RootState) => state[flowSlice.name].flowDaoOutgoingTransactions,
);

export const selectFlowDaoOutgoingTransactionsById = (
  id: string | undefined,
) => (state: RootState) =>
  id ? selectFlowDaoOutgoingTransactionsItem(state, id) : null;

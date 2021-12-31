import { createSelector } from '@reduxjs/toolkit';
import { currencySlice } from 'src/app/shared/currency';
import { flowSlice } from './slice';
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
      },
      totalOut: {
        ...flow.totalOut,
        count:
          (flow?.totalOut?.count || 0) * (currency.currency?.near?.usd || 0),
      },
      transactionsIn: {
        ...flow.transactionsIn,
        count:
          (flow?.transactionsIn?.count || 0) *
          (currency.currency?.near?.usd || 0),
      },
      transactionsOut: {
        ...flow.transactionsOut,
        count:
          (flow?.transactionsOut?.count || 0) *
          (currency.currency?.near?.usd || 0),
      },
    };
  },
);

export const selectFlowDao = createSelector(
  (state: RootState) => getState(state).flowDao,
  (data) => data,
);

export const selectFlowHistory = createSelector(
  (state: RootState) => getState(state).flowHistory,
  (data) => data,
);

export const selectFlowLeaderboard = createSelector(
  (state: RootState) => getState(state).flowLeaderboard,
  (data) => data,
);

export const selectFlowTransactionsHistory = createSelector(
  (state: RootState) => getState(state).flowTransactionsHistory,
  (data) => data,
);

export const selectFlowTransactionsLeaderboard = createSelector(
  (state: RootState) => getState(state).flowTransactionsLeaderboard,
  (data) => data,
);

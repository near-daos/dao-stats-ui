import { RequestStatus } from 'src/store/types';
import { EntityState } from '@reduxjs/toolkit';
import { Flow, Leaderboard, Metrics, FlowMetricsEntity } from 'src/api';

export type FlowState = {
  flow: Flow | null;
  flowHistory: Metrics | null;
  flowLeaderboard: Leaderboard | null;
  flowTransactionsHistory: Metrics | null;
  flowTransactionsLeaderboard: Leaderboard | null;
  flowDao: EntityState<FlowDaoEntity>;
  flowDaoFunds: EntityState<FlowMetricsEntity>;
  flowDaoTransactions: EntityState<FlowMetricsEntity>;
  loading: RequestStatus;
  error?: string | null;
};

export type FlowDaoEntity = Flow & {
  id?: string;
};

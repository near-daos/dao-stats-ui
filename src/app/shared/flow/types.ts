import { RequestStatus } from 'src/store/types';
import { EntityState } from '@reduxjs/toolkit';
import { Flow, Leaderboard, Metrics, FlowMetricsEntity } from 'src/api';

export type flowState = {
  flow: Flow | null;
  flowDaos: Flow | null;
  flowHistory: Metrics | null;
  flowLeaderboard: Leaderboard | null;
  flowTransactionsHistory: Metrics | null;
  flowTransactionsLeaderboard: Leaderboard | null;
  flowDao: EntityState<FlowDaoEntity>;
  flowDaoIncomingFunds: EntityState<FlowMetricsEntity>;
  flowDaoOutgoingFunds: EntityState<FlowMetricsEntity>;
  flowDaoIncomingTransactions: EntityState<FlowMetricsEntity>;
  flowDaoOutgoingTransactions: EntityState<FlowMetricsEntity>;
  loading: RequestStatus;
  error: unknown;
};

export type FlowDaoEntity = Flow & {
  id?: string;
};

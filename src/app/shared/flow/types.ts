import { RequestStatus } from 'src/store/types';
import { Flow, Leaderboard, BarMetrics, Metrics } from 'src/api';

export type flowState = {
  flow: Flow | null;
  flowDao: Flow | null;
  flowHistory: BarMetrics | null;
  flowLeaderboard: Leaderboard | null;
  flowTransactionsHistory: Metrics | null;
  flowTransactionsLeaderboard: Leaderboard | null;
  loading: RequestStatus;
  error: unknown;
};

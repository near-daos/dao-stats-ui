import { RequestStatus } from 'src/store/types';
import { Flow, Leaderboard, Metrics } from 'src/api';

export type flowState = {
  flow: Flow | null;
  flowDao: Flow | null;
  flowHistory: Metrics | null;
  flowLeaderboard: Leaderboard | null;
  flowTransactionsHistory: Metrics | null;
  flowTransactionsLeaderboard: Leaderboard | null;
  loading: RequestStatus;
  error: unknown;
};

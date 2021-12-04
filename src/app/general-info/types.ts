import { RequestStatus } from '../../store/types';
import { Metrics, Leaderboard, General } from '../../api';

export type generalState = {
  general: General;
  dao: General;
  leaderboard: Leaderboard;
  history: Metrics;
  daoHistory: Metrics;
  loading: RequestStatus;
  error: unknown;
};

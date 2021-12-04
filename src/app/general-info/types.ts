import { RequestStatus } from '../../store/types';
import { Metrics, TotalMetrics, Leaderboard } from '../../api/types';

export type generalInfoState = {
  generalInfo: {
    dao: TotalMetrics | null;
    activity: TotalMetrics | null;
    groups: TotalMetrics | null;
  };
  dao: {
    dao: TotalMetrics | null;
    activity: TotalMetrics | null;
    groups: TotalMetrics | null;
  };
  leaderboard: Leaderboard;
  history: Metrics;
  daoHistory: Metrics;
  loading: RequestStatus;
  error: unknown;
};

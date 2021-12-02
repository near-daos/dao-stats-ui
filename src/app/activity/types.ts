import { RequestStatus } from '../../store/types';
import { Metrics, TotalMetrics } from '../../api/types';

export type activityState = {
  activity: {
    proposals: TotalMetrics | null;
    ratio: TotalMetrics | null;
    rate: TotalMetrics | null;
  };
  dao: {
    proposals: TotalMetrics | null;
    ratio: TotalMetrics | null;
    rate: TotalMetrics | null;
  };
  history: Metrics;
  daoHistory: Metrics;
  loading: RequestStatus;
  error: unknown;
};

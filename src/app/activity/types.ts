import { RequestStatus } from '../../store/types';
import { Metrics, Activity } from '../../api';

export type activityState = {
  activity: Activity | null;
  dao: Activity | null;
  history: Metrics;
  daoHistory: Metrics;
  loading: RequestStatus;
  error: unknown;
};

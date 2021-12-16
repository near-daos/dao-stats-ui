import { RequestStatus } from 'src/store/types';
import { Metrics, Leaderboard, General } from 'src/api';

export type generalState = {
  general: General | null;
  dao: General | null;
  generalDaos: Metrics | null;
  generalActive: Metrics | null;
  generalActiveLeaderboard: Leaderboard | null;
  generalGroups: Metrics | null;
  generalGroupsLeaderboard: Leaderboard | null;
  averageGroups: Metrics | null;
  loading: RequestStatus;
  error: unknown;
};

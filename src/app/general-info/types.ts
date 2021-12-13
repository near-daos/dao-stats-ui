import { RequestStatus } from '../../store/types';
import { Metrics, Leaderboard, General } from '../../api';

export type generalState = {
  general: General | null;
  dao: General | null;
  generalDaos: Metrics | null;
  generalActive: Metrics | null;
  generalActiveLeaderboard: Leaderboard | null;
  generalGroups: Metrics | null;
  generalGroupsLeaderboard: Leaderboard | null;
  loading: RequestStatus;
  error: unknown;
};

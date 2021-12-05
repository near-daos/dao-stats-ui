import { RequestStatus } from '../../store/types';
import { Leaderboard, Metrics, Users } from '../../api';

export type usersState = {
  users: Users | null;
  dao: Users | null;
  history: Metrics;
  daoHistory: Metrics;
  leaderboard: Leaderboard;
  loading: RequestStatus;
  error: unknown;
};

import { RequestStatus } from '../../store/types';
import { Leaderboard, Metrics, Users } from '../../api';

export type usersState = {
  users: Users;
  dao: Users;
  history: Metrics;
  daoHistory: Metrics;
  leaderboard: Leaderboard;
  loading: RequestStatus;
  error: unknown;
};

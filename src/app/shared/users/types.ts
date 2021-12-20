import { RequestStatus } from 'src/store/types';
import { Leaderboard, Metrics, Users } from 'src/api';

export type usersState = {
  users: Users | null;
  dao: Users | null;
  history: Metrics | null;
  daoHistory: Metrics | null;
  leaderboard: Leaderboard | null;
  usersInteractions: Metrics | null;
  usersInteractionsLeaderboard: Leaderboard | null;
  usersAveragePerDaoHistory: Metrics | null;
  usersInteractionsPerDaoHistory: Metrics | null;
  usersMembersOfDaoHistory: Metrics | null;
  usersMembersOfDaoLeaderboard: Leaderboard | null;
  loading: RequestStatus;
  error: unknown;
};

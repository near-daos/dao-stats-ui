import { Leaderboard, Metrics, Users } from 'src/api';

export type usersState = {
  users: Users | null;
  usersUsers: Metrics | null;
  usersLeaderboard: Leaderboard | null;
  usersMembers: Metrics | null;
  usersMembersLeaderboard: Leaderboard | null;
  usersAverageUsers: Metrics | null;
  usersInteractions: Metrics | null;
  usersInteractionsLeaderboard: Leaderboard | null;
  usersAverageInteractions: Metrics | null;
  usersDao: Users | null;
  usersDaoUsers: Metrics | null;
  usersDaoMembers: Metrics | null;
  usersDaoInteractions: Metrics | null;
  error: unknown;
};

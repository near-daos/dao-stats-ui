import { Leaderboard, Metrics, Users } from 'src/api';
import { EntityState } from '@reduxjs/toolkit';

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
  usersDao: EntityState<UsersDaoEntity>;
  usersDaoUsers: EntityState<MetricsEntity>;
  usersDaoMembers: EntityState<MetricsEntity>;
  usersDaoInteractions: EntityState<MetricsEntity>;
  error: unknown;
};

export type MetricsEntity = Metrics & {
  id: string;
};

export type UsersDaoEntity = Users & {
  id: string;
};

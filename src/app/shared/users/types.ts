import { EntityState } from '@reduxjs/toolkit';
import { Leaderboard, Metrics, Users, MetricsEntity } from 'src/api';

export type UsersState = {
  users: Users | null;
  usersActiveUsers: Metrics | null;
  usersActiveUsersLeaderboard: Leaderboard | null;
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
  usersDaoActiveUsers: EntityState<MetricsEntity>;
  usersDaoMembers: EntityState<MetricsEntity>;
  usersDaoInteractions: EntityState<MetricsEntity>;
  error?: string | null;
};

export type UsersDaoEntity = Users & {
  id: string;
};

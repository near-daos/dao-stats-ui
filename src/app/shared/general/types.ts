import { EntityState } from '@reduxjs/toolkit';
import { Metrics, Leaderboard, General } from 'src/api';

export type generalState = {
  general: General | null;
  generalDaos: Metrics | null;
  generalActive: Metrics | null;
  generalActiveLeaderboard: Leaderboard | null;
  generalGroups: Metrics | null;
  generalGroupsLeaderboard: Leaderboard | null;
  averageGroups: Metrics | null;
  generalDao: EntityState<GeneralDaoEntity>;
  generalDaoGroups: EntityState<MetricsEntity>;
  error: unknown;
};

export type MetricsEntity = Metrics & {
  id: string;
};

export type GeneralDaoEntity = General & {
  id: string;
};

import { EntityState } from '@reduxjs/toolkit';
import { MetricsEntity, Metrics, Leaderboard, General } from 'src/api';

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
  generalDaoActivity: EntityState<MetricsEntity>;
  error: unknown;
};

export type GeneralDaoEntity = General & {
  id: string;
};

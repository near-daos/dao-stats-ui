import { EntityState } from '@reduxjs/toolkit';
import { Metrics, Leaderboard, MetricsEntity, Tvl, TvlDao } from 'src/api';

export type TvlState = {
  tvl: Tvl | null;
  tvlTvl: Metrics | null;
  tvlLeaderboard: Leaderboard | null;
  tvlAvgTvl: Metrics | null;
  tvlBountiesAndGrantsVL: Metrics | null;
  tvlBountiesAndGrantsVlLeaderboard: Leaderboard | null;
  tvlDao: EntityState<TvlDaoEntity>;
  tvlDaoBountiesNumber: EntityState<MetricsEntity>;
  tvlDaoBountiesVl: EntityState<MetricsEntity>;
  error?: null | string;
};

export type TvlDaoEntity = TvlDao & {
  id?: string;
};

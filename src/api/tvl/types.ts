import { TotalMetrics, TvlTotalMetrics } from '../types';

export type Tvl = {
  tvl: TotalMetrics;
  avgTvl: TotalMetrics;
  bountiesAndGrantsVl: TotalMetrics;
  ftsVl: TotalMetrics;
};

export type TvlDao = {
  grants: TvlTotalMetrics;
  bounties: TvlTotalMetrics;
  tvl: TotalMetrics;
};

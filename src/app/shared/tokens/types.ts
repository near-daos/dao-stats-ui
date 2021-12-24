import { EntityState } from '@reduxjs/toolkit';
import { Metrics, Leaderboard, MetricsEntity, Tokens } from 'src/api';

export type tokensState = {
  tokens: Tokens | null;
  tokensNfts: Metrics | null;
  tokensNftsLeaderboard: Leaderboard | null;
  tokensFts: Metrics | null;
  tokensFtsLeaderboard: Leaderboard | null;
  tokensDao: EntityState<TokensDaoEntity>;
  tokensNftsDao: EntityState<MetricsEntity>;
  tokensFtsDao: EntityState<MetricsEntity>;
  error: unknown;
};

export type TokensDaoEntity = Tokens & {
  id: string;
};

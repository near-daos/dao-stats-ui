import { EntityState } from '@reduxjs/toolkit';
import { Metrics, Leaderboard, MetricsEntity, Tokens } from 'src/api';

export type TokensState = {
  tokens: Tokens | null;
  tokensNfts: Metrics | null;
  tokensNftsLeaderboard: Leaderboard | null;
  tokensFts: Metrics | null;
  tokensFtsLeaderboard: Leaderboard | null;
  tokensFtsVl: Metrics | null;
  tokensFtsVlLeaderboard: Leaderboard | null;
  tokensDao: EntityState<TokensDaoEntity>;
  tokensNftsDao: EntityState<MetricsEntity>;
  tokensFtsDao: EntityState<MetricsEntity>;
  tokensFtsVlDao: EntityState<MetricsEntity>;
  error?: null | string;
};

export type TokensDaoEntity = Tokens & {
  id?: string;
};

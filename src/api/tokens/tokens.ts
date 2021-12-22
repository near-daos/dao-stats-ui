import { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { HttpService } from '../http-service';
import { Tokens } from './types';
import {
  DaoHistoryParams,
  DaoParams,
  HistoryParams,
  Leaderboard,
  Metrics,
  Params,
  ProposalMetrics,
} from '../types';

export class TokensService extends HttpService {
  async getTokens(params: Params): Promise<AxiosResponse<Tokens>> {
    return this.get(`${params.contract}/tokens`);
  }

  async getTokensFts(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/tokens/fts?${query}`);
  }

  async getTokensFtsLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/tokens/fts/leaderboard`);
  }

  async getTokensNfts(
    params: HistoryParams,
  ): Promise<AxiosResponse<Leaderboard>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/tokens/nfts?${query}`);
  }

  async getTokensNftsLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/tokens/nfts/leaderboard`);
  }

  async getTokensDao(params: DaoParams): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/tokens/nfts/leaderboard`);
  }
}

export const tokensService = new TokensService();

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

  async getTokensFtsVl(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/tokens/fts-vl?${query}`);
  }

  async getTokensFtsVlLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/tokens/fts-vl/leaderboard`);
  }

  async getTokensNfts(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/tokens/nfts?${query}`);
  }

  async getTokensNftsLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/tokens/nfts/leaderboard`);
  }

  async getTokensDao(params: DaoParams): Promise<AxiosResponse<Tokens>> {
    return this.get(`${params.contract}/tokens/${params.dao}`);
  }

  async getTokensDaoFts(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/tokens/${params.dao}/fts?${query}`);
  }

  async getTokensDaoFtsVl(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/tokens/${params.dao}/fts-vl?${query}`);
  }

  async getTokensDaoNfts(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/tokens/${params.dao}/nfts?${query}`);
  }
}

export const tokensService = new TokensService();

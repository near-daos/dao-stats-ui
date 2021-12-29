import { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { HttpService } from '../http-service';
import { Tvl } from './types';
import {
  DaoHistoryParams,
  DaoParams,
  HistoryParams,
  Leaderboard,
  Metrics,
  Params,
  ProposalMetrics,
} from '../types';

export class TvlService extends HttpService {
  async getTvl(params: Params): Promise<AxiosResponse<Tvl>> {
    return this.get(`${params.contract}/tvl`);
  }

  async getTvlHistory(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/tvl/tvl?${query}`);
  }

  async getTvlLeaderboard(params: Params): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/tvl/tvl/leaderboard`);
  }

  async getTvlAvgTvl(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/tvl/avg-tvl?${query}`);
  }

  async getTvlBountiesAndGrantsVl(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/tvl/bounties-and-grants-vl?${query}`);
  }

  async getTvlBountiesAndGrantsVlLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(
      `${params.contract}/tvl/bounties-and-grants-vl/leaderboard`,
    );
  }

  async getTvlDao(params: DaoParams): Promise<AxiosResponse<Tvl>> {
    return this.get(`${params.contract}/tvl/${params.dao}`);
  }

  async getTvlDaoBountiesNumber(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/tvl/${params.dao}/bounties/number?${query}`,
    );
  }

  async getTvlDaoBountiesVl(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/tvl/${params.dao}/bounties/vl?${query}`,
    );
  }
}

export const tvlService = new TvlService();

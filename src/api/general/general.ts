import { AxiosResponse } from 'axios';
import queryString from 'query-string';
import { HttpService } from '../http-service';
import { General } from './types';
import {
  Metrics,
  Params,
  DaoParams,
  HistoryParams,
  Leaderboard,
} from '../types';

export class GeneralService extends HttpService {
  async getGeneral(params: Params): Promise<AxiosResponse<General>> {
    return this.get(`${params.contract}/general`);
  }

  async getGeneralActive(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/general/active?${query}`);
  }

  async getGeneralActiveLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/general/active/leaderboard`);
  }

  async getGeneralGroups(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/general/groups?${query}`);
  }

  async getGeneralGroupsLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/general/groups/leaderboard`);
  }

  async getGeneralAverageGroups(
    params: Params,
  ): Promise<AxiosResponse<Metrics>> {
    return this.get(`${params.contract}/general/average-groups`);
  }

  async getGeneralDao(params: DaoParams): Promise<AxiosResponse<General>> {
    return this.get(`${params.contract}/general/${params.dao}`);
  }

  async getGeneralDaos(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/general/daos?${query}`);
  }
}

export const generalService = new GeneralService();

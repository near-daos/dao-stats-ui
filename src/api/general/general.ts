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

  async getGeneralDao(params: DaoParams): Promise<AxiosResponse<General>> {
    return this.get(`${params.contract}/general/${params.dao}`);
  }

  async getGeneralDaos(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/general/daos?${query}`);
  }

  async getGeneralActivity(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/general/activity${query}`);
  }

  async getGeneralActivityLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/general/activity/leaderboard`);
  }

  async getGeneralGroups(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/general/groups${query}`);
  }

  async getGeneralGroupsLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/general/groups/leaderboard`);
  }
}

export const generalService = new GeneralService();

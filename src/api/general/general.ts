import { AxiosResponse } from 'axios';
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

  async getGeneralDaos(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
    return this.get(
      `${params.contract}/general/daos?from=${params.from}&to=${params.to}`,
    );
  }

  async getGeneralActivity(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    return this.get(
      `${params.contract}/general/activity?from=${params.from}&to=${params.to}`,
    );
  }

  async getGeneralActivityLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/general/activity/leaderboard`);
  }

  async getGeneralDao(params: DaoParams): Promise<AxiosResponse<General>> {
    return this.get(`${params.contract}/general/${params.dao}`);
  }
}

export const generalService = new GeneralService();

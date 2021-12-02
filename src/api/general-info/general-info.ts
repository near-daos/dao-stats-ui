import { AxiosResponse } from 'axios';
import { HttpService } from '../httpService';
import { GeneralInfo } from './types';
import {
  Metrics,
  Params,
  DaoParams,
  HistoryParams,
  Leaderboard,
} from '../types';

export class GeneralInfoService extends HttpService {
  async getGeneralInfo(params: Params): Promise<AxiosResponse<GeneralInfo>> {
    return this.get(`${params.contract}/general`);
  }

  async getGeneralDaos(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
    return this.get(
      `${params.contract}/general/daos?from=${params.from}&to=${params.to}`,
    );
  }

  async getGeneralInfoActivity(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    return this.get(
      `${params.contract}/general/activity?from=${params.from}&to=${params.to}`,
    );
  }

  async getGeneralInfoActivityLeaderboard(
    contract: string,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${contract}/general/activity/leaderboard`);
  }

  async getGeneralInfoDao(
    params: DaoParams,
  ): Promise<AxiosResponse<GeneralInfo>> {
    return this.get(`${params.contract}/general/${params.dao}`);
  }
}

export const generalInfoService = new GeneralInfoService();

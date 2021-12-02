import { AxiosResponse } from 'axios';
import { HttpService } from '../httpService';
import { Activity } from './types';
import {
  DaoHistoryParams,
  DaoParams,
  HistoryParams,
  Metrics,
  Params,
} from '../types';

export class ActivityService extends HttpService {
  async getActivity(params: Params): Promise<AxiosResponse<Activity>> {
    return this.get(`${params.contract}/activity`);
  }

  async getActivityHistory(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    return this.get(`${params.contract}/activity/history`);
  }

  async getActivityDao(params: DaoParams): Promise<AxiosResponse<Activity>> {
    return this.get(`${params.contract}/activity/${params.dao}`);
  }

  async getActivityDaoHistory(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    return this.get(
      `${params.contract}/activity/${params.dao}/history?from=${params.from}&to=${params.to}`,
    );
  }
}

export const activityService = new ActivityService();

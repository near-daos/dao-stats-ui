import { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { HttpService } from '../http-service';
import { Activity } from './types';
import {
  DaoHistoryParams,
  DaoParams,
  HistoryParams,
  Leaderboard,
  Metrics,
  Params,
  ProposalMetrics,
} from '../types';

export class ActivityService extends HttpService {
  async getActivity(params: Params): Promise<AxiosResponse<Activity>> {
    return this.get(`${params.contract}/activity`);
  }

  async getActivityProposals(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/activity/proposals?${query}`);
  }

  async getActivityProposalsLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/activity/proposals/leaderboard`);
  }

  async getActivityProposalsTypes(
    params: HistoryParams,
  ): Promise<AxiosResponse<ProposalMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/activity/proposals-types?${query}`);
  }

  async getActivityProposalsTypesLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/activity/proposals-types/leaderboard`);
  }

  async getActivityRate(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/activity/rate?${query}`);
  }

  async getActivityRateLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/activity/rate/leaderboard`);
  }

  async getActivityDao(params: DaoParams): Promise<AxiosResponse<Activity>> {
    return this.get(`${params.contract}/activity/${params.dao}`);
  }

  async getActivityDaoProposals(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/activity/${params.dao}/proposals?${query}`,
    );
  }

  async getActivityDaoProposalsTypes(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<ProposalMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/activity/${params.dao}/proposals-types?${query}`,
    );
  }

  async getActivityDaoRate(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/activity/${params.dao}/rate?${query}`);
  }
}

export const activityService = new ActivityService();

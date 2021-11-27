import { AxiosResponse } from 'axios';
import { HttpService } from '../httpService';
import { ActivityType, GroupsData } from './types';

import { ContractWithDaoAndTimestampParams } from '../types';

export class ActivityService extends HttpService {
  async getActivity(contract: string): Promise<AxiosResponse<ActivityType>> {
    return this.get(`${contract}/activity`);
  }

  async getNumberProposalsHistory(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/activity/proposals?timespan=${params.timestamp}`,
    );
  }

  async getNumberProposalsLeaderboard(
    contract: string,
  ): Promise<AxiosResponse<GroupsData>> {
    return this.get(`${contract}/activity/proposals/leaderboard`);
  }

  async getNumberProposalsDAO(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/activity/${params.dao}/proposals?timespan=${params.timestamp}`,
    );
  }

  async getProposalsTypeHistory(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/activity/ratio?timespan=${params.timestamp}`,
    );
  }

  async getProposalsTypeLeaderboard(
    contract: string,
  ): Promise<AxiosResponse<GroupsData>> {
    return this.get(`${contract}/activity/ratio/leaderboard`);
  }

  async getProposalsTypeDAO(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/activity/${params.dao}/ratio?timespan=${params.timestamp}`,
    );
  }

  async getVoteThroughRateHistory(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/activity/rate?timespan=${params.timestamp}`,
    );
  }

  async getVoteThroughRateLeaderboard(
    contract: string,
  ): Promise<AxiosResponse<GroupsData>> {
    return this.get(`${contract}/activity/rate/leaderboard`);
  }

  async getVoteThroughRateDAO(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/activity/${params.dao}/rate?timespan=${params.timestamp}`,
    );
  }
}

export const activityService = new ActivityService();

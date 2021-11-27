import { AxiosResponse } from 'axios';
import { HttpService } from '../httpService';
import { GeneralInfoType, ActivityData } from './types';
import {
  ContractWithDaoAndTimestampParams,
  History,
  GroupsData,
} from '../types';

export class GeneralInfoService extends HttpService {
  async getGeneralInfo(
    contract: string,
  ): Promise<AxiosResponse<GeneralInfoType>> {
    return this.get(`${contract}/general`);
  }

  async getNumberDAOs(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/general/daos?timespan=${params.timestamp}`,
    );
  }

  async getDAOActivityDAO(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<ActivityData>> {
    return this.get(`${params.contract}/general/${params.dao}/activity`);
  }

  async getDAOActivityHistory(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/general/activity?timespan=${params.timestamp}`,
    );
  }

  async getDAOActivityLeaderboard(
    contract: string,
  ): Promise<AxiosResponse<ActivityData>> {
    return this.get(`${contract}/general/activity/leaderboard`);
  }

  async getGroupsDAO(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<GroupsData>> {
    return this.get(`${params.contract}/general/${params.dao}/groups`);
  }

  async getGroupsHistory(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/general/groups?timespan=${params.timestamp}`,
    );
  }

  async getGroupsLeaderboard(
    contract: string,
  ): Promise<AxiosResponse<GroupsData>> {
    return this.get(`${contract}/general/groups/leaderboard`);
  }
}

export const generalInfoService = new GeneralInfoService();

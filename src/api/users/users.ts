import { AxiosResponse } from 'axios';
import { HttpService } from '../httpService';
import { UsersType } from './types';
import { GroupsData, ContractWithDaoAndTimestampParams } from '../types';

export class UsersService extends HttpService {
  async getUsers(contract: string): Promise<AxiosResponse<UsersType>> {
    return this.get(`${contract}/users`);
  }

  async getUsersHistory(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(`${params.contract}/users?timespan=${params.timestamp}`);
  }

  async getUsersLeaderboard(
    contract: string,
  ): Promise<AxiosResponse<GroupsData>> {
    return this.get(`${contract}/users/leaderboard`);
  }

  async getAverageCouncilSizeHistory(
    contract: string,
  ): Promise<AxiosResponse<History>> {
    return this.get(`${contract}/users/council`);
  }

  async getAverageCouncilSizeLeaderboard(
    contract: string,
  ): Promise<AxiosResponse<GroupsData>> {
    return this.get(`${contract}/users/council/leaderboard`);
  }

  async getNumberInteractionsHistory(
    contract: string,
  ): Promise<AxiosResponse<History>> {
    return this.get(`${contract}/users/interactions`);
  }

  async getNumberInteractionsLeaderboard(
    contract: string,
  ): Promise<AxiosResponse<GroupsData>> {
    return this.get(`${contract}/users/interactions/leaderboard`);
  }

  async getUsersDAO(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/users/${params.dao}?timespan=${params.timestamp}`,
    );
  }

  async getAverageCouncilSizeDAO(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/users/${params.dao}/council?timespan=${params.timestamp}`,
    );
  }

  async getNumberInteractionsDAO(
    params: ContractWithDaoAndTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/users/${params.dao}/interactions?timespan=${params.timestamp}`,
    );
  }
}

export const usersService = new UsersService();

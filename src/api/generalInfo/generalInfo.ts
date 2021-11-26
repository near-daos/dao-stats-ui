import { AxiosResponse } from 'axios';
import { HttpService } from '../httpService';
import {
  GeneralInfoType,
  ContractWithTimestampParams,
  History,
  Todo,
  ContractWithDaoParams,
  ActivityData,
  GroupsData,
} from './types';

export class TodosService extends HttpService {
  async getTodos(): Promise<AxiosResponse<Todo[]>> {
    return this.get('/todos');
  }

  async getTodo(id: string): Promise<AxiosResponse<Todo>> {
    return this.get(`/todos/${id}`);
  }

  async getGeneralInfo(
    contract: string,
  ): Promise<AxiosResponse<GeneralInfoType>> {
    return this.get(`${contract}/general`);
  }

  async getNumberDAOs(
    params: ContractWithTimestampParams,
  ): Promise<AxiosResponse<History>> {
    return this.get(
      `${params.contract}/general/daos?timespan=${params.timestamp}`,
    );
  }

  async getDAOActivityDAO(
    params: ContractWithDaoParams,
  ): Promise<AxiosResponse<ActivityData>> {
    return this.get(`${params.contract}/general/${params.dao}/activity`);
  }

  async getDAOActivityHistory(
    params: ContractWithTimestampParams,
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
    params: ContractWithDaoParams,
  ): Promise<AxiosResponse<GroupsData>> {
    return this.get(`${params.contract}/general/${params.dao}/groups`);
  }

  async getGroupsHistory(
    params: ContractWithTimestampParams,
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

export const todosService = new TodosService();

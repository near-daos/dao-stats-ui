import { AxiosResponse } from 'axios';
import { HttpService } from '../http-service';
import { Users } from './types';
import {
  Metrics,
  Params,
  DaoParams,
  HistoryParams,
  DaoHistoryParams,
  Leaderboard,
} from '../types';

export class UsersService extends HttpService {
  async getUsers(params: Params): Promise<AxiosResponse<Users>> {
    return this.get(`${params.contract}/users`);
  }

  async getUsersHistory(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    return this.get(
      `${params.contract}/users/history?from=${params.from}&to=${params.to}`,
    );
  }

  async getUsersLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/users/leaderboard`);
  }

  async getUsersDao(params: DaoParams): Promise<AxiosResponse<Users>> {
    return this.get(`${params.contract}/users/${params.dao}`);
  }

  async getUsersDaoHistory(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    return this.get(
      `${params.contract}/users/${params.dao}/history?from=${params.from}&to=${params.to}`,
    );
  }
}

export const usersService = new UsersService();

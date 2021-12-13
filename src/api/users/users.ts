import { AxiosResponse } from 'axios';
import queryString from 'query-string';
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
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/users/users?${query}`);
  }

  async getUsersLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/users/users/leaderboard`);
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

  async getUsersInteractionsHistory(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/users/interactions?${query}`);
  }

  async getUsersInteractionsLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/users/interactions/leaderboard`);
  }

  async getUsersAveragePerDaoHistory(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/users/average?${query}`);
  }

  async getUsersInteractionsPerDaoHistory(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/users/interactions-average?${query}`);
  }
}

export const usersService = new UsersService();

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
  IntervalHistoryParams,
  DaoIntervalHistoryParams,
} from '../types';

export class UsersService extends HttpService {
  async getUsers(params: Params): Promise<AxiosResponse<Users>> {
    return this.get(`${params.contract}/users`);
  }

  async getUsersActiveUsers(
    params: IntervalHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({
      from: params.from,
      to: params.to,
      interval: params.interval,
    });

    return this.get(`${params.contract}/users/active-users?${query}`);
  }

  async getUsersActiveUsersLeaderboard(
    params: IntervalHistoryParams,
  ): Promise<AxiosResponse<Leaderboard>> {
    const query = queryString.stringify({
      from: params.from,
      to: params.to,
      interval: params.interval,
    });

    return this.get(
      `${params.contract}/users/active-users/leaderboard?${query}`,
    );
  }

  async getUsersUsers(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/users/users?${query}`);
  }

  async getUsersLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/users/users/leaderboard`);
  }

  async getUsersMembers(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/users/members?${query}`);
  }

  async getUsersMembersLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/users/members/leaderboard`);
  }

  async getUsersAverageUsers(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/users/average-users?${query}`);
  }

  async getUsersInteractions(
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

  async getUsersAverageInteractions(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/users/average-interactions?${query}`);
  }

  async getUsersDao(params: DaoParams): Promise<AxiosResponse<Users>> {
    return this.get(`${params.contract}/users/${params.dao}`);
  }

  async getUsersDaoActiveUsers(
    params: DaoIntervalHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({
      from: params.from,
      to: params.to,
      interval: params.interval,
    });

    return this.get(
      `${params.contract}/users/${params.dao}/active-users?${query}`,
    );
  }

  async getUsersDaoUsers(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/users/${params.dao}/users?${query}`);
  }

  async getUsersDaoMembers(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/users/${params.dao}/members?${query}`);
  }

  async getUsersDaoInteractions(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/users/${params.dao}/interactions?${query}`,
    );
  }
}

export const usersService = new UsersService();

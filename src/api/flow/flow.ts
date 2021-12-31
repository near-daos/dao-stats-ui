import { AxiosResponse } from 'axios';
import queryString from 'query-string';
import { HttpService } from '../http-service';
import { Flow } from './types';
import {
  Params,
  DaoParams,
  HistoryParams,
  Leaderboard,
  Metrics,
  BarMetrics,
} from '../types';

export class FlowService extends HttpService {
  async getFlow(params: Params): Promise<AxiosResponse<Flow>> {
    return this.get(`${params.contract}/flow`);
  }

  async getFlowHistory(
    params: HistoryParams,
  ): Promise<AxiosResponse<BarMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/flow/funds?${query}`);
  }

  async getFlowLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/flow/funds/leaderboard`);
  }

  async getFlowTransactionsHistory(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/flow/transactions?${query}`);
  }

  async getFlowTransactionsLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/flow/transactions/leaderboard`);
  }

  async getFlowDao(params: DaoParams): Promise<AxiosResponse<Flow>> {
    return this.get(`${params.contract}/flow/${params.dao}`);
  }
}

export const flowService = new FlowService();

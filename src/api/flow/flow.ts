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
  FlowMetrics,
  DaoHistoryParams,
} from '../types';

export class FlowService extends HttpService {
  async getFlow(params: Params): Promise<AxiosResponse<Flow>> {
    return this.get(`${params.contract}/flow`);
  }

  async getFlowHistory(params: HistoryParams): Promise<AxiosResponse<Metrics>> {
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

  async getFlowDaoFunds(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<FlowMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/flow/${params.dao}/funds?${query}`);
  }

  async getFlowDaoTransactions(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<FlowMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/flow/${params.dao}/transactions?${query}`,
    );
  }
}

export const flowService = new FlowService();

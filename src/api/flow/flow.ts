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

  async getFlowDaos(params: HistoryParams): Promise<AxiosResponse<Flow>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/flow/?${query}`);
  }

  async getFlowDao(params: DaoParams): Promise<AxiosResponse<Flow>> {
    return this.get(`${params.contract}/flow/${params.dao}`);
  }

  async getflowDaoIncomingFunds(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<FlowMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/flow/${params.dao}?${query}`);
  }

  async getflowDaoOutgoingFunds(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<FlowMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/flow/${params.dao}/outgoing-funds?${query}`,
    );
  }

  async getflowDaoIncomingTransactions(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<FlowMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/flow/${params.dao}/incoming-transactions?${query}`,
    );
  }

  async getflowDaoOutgoingTransactions(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<FlowMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/flow/${params.dao}/outgoing-transactions?${query}`,
    );
  }
}

export const flowService = new FlowService();

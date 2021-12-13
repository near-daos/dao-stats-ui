import { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { HttpService } from '../http-service';
import { Governance } from './types';
import {
  DaoHistoryParams,
  DaoParams,
  HistoryParams,
  Leaderboard,
  Metrics,
  Params,
  ProposalMetrics,
} from '../types';

export class GovernanceService extends HttpService {
  async getGovernance(params: Params): Promise<AxiosResponse<Governance>> {
    return this.get(`${params.contract}/governance`);
  }

  async getGovernanceProposals(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/governance/proposals?${query}`);
  }

  async getGovernanceProposalsLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/governance/proposals/leaderboard`);
  }

  async getGovernanceProposalsTypes(
    params: HistoryParams,
  ): Promise<AxiosResponse<ProposalMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/governance/proposals-types?${query}`);
  }

  async getGovernanceProposalsTypesLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(
      `${params.contract}/governance/proposals-types/leaderboard`,
    );
  }

  async getGovernanceVoteRate(
    params: HistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(`${params.contract}/governance/vote-rate?${query}`);
  }

  async getGovernanceVoteRateLeaderboard(
    params: Params,
  ): Promise<AxiosResponse<Leaderboard>> {
    return this.get(`${params.contract}/governance/vote-rate/leaderboard`);
  }

  async getGovernanceDao(
    params: DaoParams,
  ): Promise<AxiosResponse<Governance>> {
    return this.get(`${params.contract}/governance/${params.dao}`);
  }

  async getGovernanceDaoProposals(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/governance/${params.dao}/proposals?${query}`,
    );
  }

  async getGovernanceDaoProposalsTypes(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<ProposalMetrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/governance/${params.dao}/proposals-types?${query}`,
    );
  }

  async getGovernanceDaoVoteRate(
    params: DaoHistoryParams,
  ): Promise<AxiosResponse<Metrics>> {
    const query = queryString.stringify({ from: params.from, to: params.to });

    return this.get(
      `${params.contract}/governance/${params.dao}/vote-rate?${query}`,
    );
  }
}

export const governanceService = new GovernanceService();

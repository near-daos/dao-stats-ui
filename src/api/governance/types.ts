import { Proposals, TotalMetrics } from '../types';

export type Governance = {
  proposals: TotalMetrics;
  proposalsByType: Proposals;
  voteRate: TotalMetrics;
};

import { Proposals, TotalMetrics } from '../types';

export type Activity = {
  proposals: TotalMetrics;
  proposalsByType: Proposals;
  voteRate: TotalMetrics;
};

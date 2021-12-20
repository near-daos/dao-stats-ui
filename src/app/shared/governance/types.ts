import { Metrics, Governance, Leaderboard, ProposalMetrics } from 'src/api';

export type governanceState = {
  governance: Governance | null;
  governanceProposals: Metrics | null;
  governanceProposalsLeaderboard: Leaderboard | null;
  governanceProposalsTypes: ProposalMetrics | null;
  governanceProposalsTypesLeaderboard: Leaderboard | null;
  governanceVoteRate: Metrics | null;
  governanceVoteRateLeaderboard: Leaderboard | null;
  governanceDao: Governance | null;
  governanceDaoProposals: Metrics | null;
  governanceDaoProposalsTypes: ProposalMetrics | null;
  governanceDaoVoteRate: Metrics | null;
  error: unknown;
};

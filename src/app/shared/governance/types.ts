import { EntityState } from '@reduxjs/toolkit';
import {
  Metrics,
  Governance,
  Leaderboard,
  ProposalMetrics,
  MetricsEntity,
} from 'src/api';

export type GovernanceState = {
  governance: Governance | null;
  governanceProposals: Metrics | null;
  governanceProposalsLeaderboard: Leaderboard | null;
  governanceProposalsTypes: ProposalMetrics | null;
  governanceProposalsTypesLeaderboard: Leaderboard | null;
  governanceVoteRate: Metrics | null;
  governanceVoteRateLeaderboard: Leaderboard | null;
  governanceDao: EntityState<GovernanceDaoEntity>;
  governanceDaoProposals: EntityState<MetricsEntity>;
  governanceDaoProposalsTypes: EntityState<ProposalMetricsEntity>;
  governanceDaoVoteRate: EntityState<MetricsEntity>;
  error?: null | string;
};

export type ProposalMetricsEntity = ProposalMetrics & {
  id: string;
};

export type GovernanceDaoEntity = Governance & {
  id: string;
};

import { RequestStatus } from '../../store/types';
import { Metrics, Activity, Leaderboard, ProposalMetrics } from '../../api';

export type activityState = {
  activity: Activity | null;
  activityProposals: Metrics | null;
  activityProposalsLeaderboard: Leaderboard | null;
  activityProposalsTypes: ProposalMetrics | null;
  activityProposalsTypesLeaderboard: Leaderboard | null;
  activityRate: Metrics | null;
  activityRateLeaderboard: Leaderboard | null;
  activityDao: Activity | null;
  activityDaoProposals: Metrics | null;
  activityDaoProposalsTypes: ProposalMetrics | null;
  activityDaoRate: Metrics | null;
  loading: RequestStatus;
  error: unknown;
};

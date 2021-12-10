export type History = {
  from?: string;
  to?: string;
};

export type Params = {
  contract: string;
};

export type HistoryParams = Params & History;

export type DaoParams = Params & {
  dao: string;
};

export type ProposalMetrics = {
  metrics: {
    payout: MetricItem[];
    councilMember: MetricItem[];
    policyChange: MetricItem[];
    expired: MetricItem[];
  };
};

export type Proposals = {
  payout: number;
  councilMember: number;
  policyChange: number;
  expired: number;
};

export type LeaderboardItem = {
  dao: string;
  proposalsByType?: Proposals;
  activity?: TotalMetrics;
  overview?: MetricItem[];
};

export type Leaderboard = {
  leaderboard?: LeaderboardItem[];
  metrics?: LeaderboardItem[];
};

export type DaoHistoryParams = DaoParams & History;

export type TotalMetrics = {
  count: number;
  growth: number;
};

export type MetricItem = {
  timestamp: number;
  count: number;
};

export type Metrics = {
  metrics: MetricItem[];
};

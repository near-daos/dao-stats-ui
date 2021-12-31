export type History = {
  from?: string;
  to?: string;
};

export type Params = {
  contract: string;
};

export type Input = {
  input: string;
};

export type InputParams = Params & Input;
export type HistoryParams = Params & History;

export type DaoParams = Params & {
  dao: string;
};

export type ProposalMetrics = {
  metrics: {
    financial: MetricItem[];
    governance: MetricItem[];
    bounties: MetricItem[];
    members: MetricItem[];
  };
};

export type Proposals = {
  bounties: number;
  financial: number;
  governance: number;
  members: number;
};

export type LeaderboardItem = {
  dao: string;
  proposalsByType?: Proposals;
  proposals?: TotalMetrics;
  voteRate?: TotalMetrics;
  activity?: TotalMetrics;
  overview?: MetricItem[];
};

export type Leaderboard = {
  leaderboard?: LeaderboardItem[];
  metrics?: LeaderboardItem[];
  incoming?: LeaderboardItem[];
  outgoing?: LeaderboardItem[];
};

export type DaoHistoryParams = DaoParams & History;

export type Metadata = {
  image?: string;
};

export type Dao = {
  createdAt: string;
  dao: string;
  contractId: string;
  description: string;
  metadata: Metadata;
};

export type TvlTotalMetrics = {
  number: TotalMetrics;
  vl: TotalMetrics;
};

export type TotalMetrics = {
  count: number;
  growth: number;
};

export type MetricItem = {
  timestamp: number;
  count: number;
  incoming: number;
  outgoing: number;
};

export type BarMetricItem = {
  timestamp: number;
  incoming: number;
  outgoing: number;
};

export type BarMetrics = {
  metrics: BarMetricItem[];
};

export type Metrics = {
  metrics: MetricItem[];
};

export type MetricsEntity = Metrics & {
  id: string;
};

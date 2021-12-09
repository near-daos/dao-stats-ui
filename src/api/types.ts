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

export type Proposals = {
  payout: 0;
  councilMember: 0;
  policyChange: 0;
  expired: 0;
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

export type LeaderboardItem = {
  dao: string;
  activity: TotalMetrics;
  overview: MetricItem[];
};

export type Leaderboard = {
  metrics: LeaderboardItem[];
};

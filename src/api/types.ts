export type History = {
  from: string;
  to?: string;
};

export type Params = {
  contract: string;
};

export type HistoryParams = Params & History;

export type DaoParams = Params & {
  dao: string;
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
  overview: string[];
};

export type Leaderboard = {
  metrics: LeaderboardItem[];
};

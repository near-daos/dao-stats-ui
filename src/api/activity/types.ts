type CountAndGrowth = {
  count: number;
  growth: number;
};

type Ratio = {
  total: number;
  proposals: CountAndGrowth[];
  rate: CountAndGrowth;
};

export type ActivityType = {
  proposals: CountAndGrowth;
  ratio: Ratio;
  rate: CountAndGrowth;
};

type HistoryItem = {
  start: string;
  end: string;
  count: number;
};

type GroupItem = {
  dao: CountAndGrowth;
  groups: CountAndGrowth;
  overview: HistoryItem[];
};

export type GroupsData = {
  data: GroupItem[];
};

export type ContractWithDaoAndTimestampParams = {
  contract: string;
  dao?: string;
  timestamp: '7d' | '1m' | '3m' | '6m' | '1y' | 'All';
};

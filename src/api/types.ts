export type CountAndGrowth = {
  count: number;
  growth: number;
};

type Timestamp = '7d' | '1m' | '3m' | '6m' | '1y' | 'All';

export type ContractWithDaoAndTimestampParams = {
  contract: string;
  dao?: string;
  timestamp: Timestamp;
};

export type HistoryItem = {
  start: string;
  end: string;
  count: number;
};

export type History = {
  data: HistoryItem[];
};

type GroupItem = {
  dao: CountAndGrowth;
  groups: CountAndGrowth;
  overview: History[];
};

export type GroupsData = {
  data: GroupItem[];
};

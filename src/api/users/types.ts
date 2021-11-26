type CountAndGrowth = {
  count: number;
  growth: number;
};

export type UsersType = {
  users: CountAndGrowth;
  councilSize: CountAndGrowth;
  interactions: CountAndGrowth;
};

type HistoryItem = {
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

export type ContractWithDaoAndTimestampParams = {
  contract: string;
  dao?: string;
  timestamp: '7d' | '1m' | '3m' | '6m' | '1y' | 'All';
};

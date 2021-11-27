type CountAndGrowth = {
  count: number;
  growth: number;
};

export type GeneralInfoType = {
  dao: CountAndGrowth;
  activity: CountAndGrowth;
  groups: CountAndGrowth;
};

export type ContractWithTimestampParams = {
  contract: string;
  timestamp: '7d' | '1m' | '3m' | '6m' | '1y' | 'All';
};

export type ContractWithDaoParams = {
  contract: string;
  dao: string;
};

type HistoryItem = {
  start: string;
  end: string;
  count: number;
};

export type History = {
  data: HistoryItem[];
};

type AcivityItem = {
  dao: CountAndGrowth;
  activity: CountAndGrowth;
  overview: History[];
};

export type ActivityData = {
  data: AcivityItem[];
};

type GroupItem = {
  dao: CountAndGrowth;
  groups: CountAndGrowth;
  overview: History[];
};

export type GroupsData = {
  data: GroupItem[];
};

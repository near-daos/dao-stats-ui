export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

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

export type HistoryWithCount = {
  data: [
    {
      start: string;
      end: string;
      count: number;
    },
  ];
};

export type ActivityData = {
  data: [
    {
      dao: CountAndGrowth;
      activity: CountAndGrowth;
      overview: HistoryWithCount[];
    },
  ];
};

export type GroupsData = {
  data: [
    {
      dao: CountAndGrowth;
      groups: CountAndGrowth;
      overview: HistoryWithCount[];
    },
  ];
};

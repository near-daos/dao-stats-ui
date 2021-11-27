import { CountAndGrowth, HistoryItem } from '../types';

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

type GroupItem = {
  dao: CountAndGrowth;
  groups: CountAndGrowth;
  overview: HistoryItem[];
};

export type GroupsData = {
  data: GroupItem[];
};

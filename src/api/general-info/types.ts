import { CountAndGrowth } from '../types';

export type GeneralInfoType = {
  dao: CountAndGrowth;
  activity: CountAndGrowth;
  groups: CountAndGrowth;
};

type AcivityItem = {
  dao: CountAndGrowth;
  activity: CountAndGrowth;
  overview: History[];
};

export type ActivityData = {
  data: AcivityItem[];
};

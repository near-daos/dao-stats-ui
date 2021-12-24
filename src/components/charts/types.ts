export type LineItem = {
  name: string;
  color?: string;
  dataKey: string;
};

export type ChartDataItem = {
  timestamp: number;
  [key: string]: number;
};
